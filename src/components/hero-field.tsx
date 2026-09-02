import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/data/portfolio";

const TEAL = "#3ddbc6";
const AMBER = "#f5b544";
const DIM = "#5b7c86";

/** Lightweight wavy lattice of data points */
function Lattice() {
  const ref = useRef<THREE.Points>(null);
  const COLS = 36;
  const ROWS = 24;

  const { positions, base } = useMemo(() => {
    const arr = new Float32Array(COLS * ROWS * 3);
    let i = 0;
    for (let x = 0; x < COLS; x++) {
      for (let z = 0; z < ROWS; z++) {
        arr[i++] = (x - COLS / 2) * 0.75;
        arr[i++] = 0;
        arr[i++] = (z - ROWS / 2) * 0.75;
      }
    }
    return { positions: arr, base: arr.slice() };
  }, []);

  useFrame(({ clock, pointer }) => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    const t = clock.elapsedTime;
    const attr = geo.attributes["position"] as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const pos = attr.array as Float32Array;
    const mx = pointer.x * 10;
    const mz = -pointer.y * 7;
    for (let i = 0; i < pos.length; i += 3) {
      const x = base[i] ?? 0;
      const z = base[i + 2] ?? 0;
      const d = Math.hypot(x - mx, z - mz);
      pos[i + 1] =
        Math.sin(x * 0.35 + t * 0.6) * 0.45 +
        Math.cos(z * 0.3 - t * 0.45) * 0.45 +
        Math.exp(-d * 0.3) * 1.8 * Math.sin(t * 1.8 - d * 0.8);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} position={[0, -4.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={TEAL}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Floating skill nodes — hover to read the label */
function SkillNodes() {
  const group = useRef<THREE.Group>(null);
  const [hover, setHover] = useState<number | null>(null);

  const nodes = useMemo(
    () =>
      skills.slice(0, 12).map((s, i, a) => {
        const angle = (i / a.length) * Math.PI * 2;
        const radius = 6.2 + (i % 3) * 1.4;
        return {
          name: s.name,
          value: s.y,
          pos: [Math.cos(angle) * radius, ((i % 4) - 1.5) * 1.4, Math.sin(angle) * radius] as [
            number,
            number,
            number,
          ],
          size: 0.16 + (s.y / 100) * 0.16,
          url: s.officialUrl,
        };
      }),
    [],
  );

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <Float key={n.name} speed={1.2} floatIntensity={0.5} rotationIntensity={0.3}>
          <mesh
            position={n.pos}
            scale={hover === i ? 1.5 : 1}
            onClick={() => {
              if (n.url) window.open(n.url, "_blank", "noreferrer");
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHover(i);
            }}
            onPointerOut={() => setHover((h) => (h === i ? null : h))}
          >
            <icosahedronGeometry args={[n.size, 1]} />
            <meshStandardMaterial
              color={hover === i ? AMBER : TEAL}
              emissive={hover === i ? AMBER : DIM}
              emissiveIntensity={hover === i ? 1.4 : 0.35}
              roughness={0.25}
              metalness={0.6}
            />
            {hover === i && (
              <Html center distanceFactor={9} zIndexRange={[10, 0]}>
                <div className="whitespace-nowrap rounded-md border border-border bg-card/95 px-2 py-1 font-mono text-[11px] text-foreground shadow-lg cursor-pointer">
                  {n.name} · {n.value}% (Click for docs)
                </div>
              </Html>
            )}
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/** Camera drifts with the pointer */
function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, delta) => {
    target.set(pointer.x * 2.0, 1.6 + pointer.y * 0.8, 22 - Math.abs(pointer.x) * 0.6);
    const k = 1 - Math.exp(-2.5 * Math.min(delta, 0.05));
    camera.position.lerp(target, k);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroField() {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 1.6, 22], fov: 42 }}
      gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}
    >
      <fog attach="fog" args={["#06131a", 20, 50]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 9, 5]} intensity={1.1} />
      <Environment>
        <Lightformer intensity={2} position={[0, 6, 2]} scale={[12, 12, 1]} />
        <Lightformer
          intensity={1.2}
          color={TEAL}
          position={[-7, 1, -2]}
          rotation-y={Math.PI / 2}
          scale={[18, 2, 1]}
        />
      </Environment>
      <Lattice />
      <SkillNodes />
      <CameraRig />
    </Canvas>
  );
}
