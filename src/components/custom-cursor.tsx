import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const stateRef = useRef({ hovered: false, clicked: false, hidden: false, isText: false });

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop/mouse)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const updateClasses = () => {
      const { hovered, clicked, hidden, isText } = stateRef.current;
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.opacity = hidden ? "0" : "1";
        if (isText) {
          dot.style.width = "2px";
          dot.style.height = "16px";
          dot.style.borderRadius = "1px";
        } else {
          dot.style.width = hovered ? "6px" : "8px";
          dot.style.height = hovered ? "6px" : "8px";
          dot.style.borderRadius = "9999px";
        }
      }

      if (ring) {
        ring.style.opacity = hidden ? "0" : "1";
        if (isText) {
          ring.style.width = "0px";
          ring.style.height = "0px";
          ring.style.border = "none";
        } else if (clicked) {
          ring.style.width = "26px";
          ring.style.height = "26px";
          ring.style.backgroundColor = "rgba(61, 219, 199, 0.25)";
          ring.style.border = "1.5px solid rgba(61, 219, 199, 0.8)";
        } else if (hovered) {
          ring.style.width = "46px";
          ring.style.height = "46px";
          ring.style.backgroundColor = "rgba(61, 219, 199, 0.12)";
          ring.style.border = "1.5px solid rgba(61, 219, 199, 0.75)";
        } else {
          ring.style.width = "30px";
          ring.style.height = "30px";
          ring.style.backgroundColor = "rgba(61, 219, 199, 0.04)";
          ring.style.border = "1.2px solid rgba(61, 219, 199, 0.35)";
        }
      }
    };

    let checkHoverTimer = 0;
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element throttled
      const now = performance.now();
      if (now - checkHoverTimer > 40) {
        checkHoverTimer = now;
        const target = e.target as HTMLElement | null;
        if (target) {
          const isInteractive = Boolean(
            target.closest(
              'a, button, input, select, textarea, [role="button"], [tabindex="0"], label, summary, .cursor-pointer, [data-interactive="true"]',
            ),
          );
          const isTextInput = Boolean(
            target.closest(
              'input[type="text"], input[type="email"], input[type="search"], textarea, [contenteditable="true"]',
            ),
          );

          if (
            stateRef.current.hovered !== isInteractive ||
            stateRef.current.isText !== isTextInput
          ) {
            stateRef.current.hovered = isInteractive;
            stateRef.current.isText = isTextInput;
            updateClasses();
          }
        }
      }
    };

    const onMouseDown = () => {
      stateRef.current.clicked = true;
      updateClasses();
    };
    const onMouseUp = () => {
      stateRef.current.clicked = false;
      updateClasses();
    };
    const onMouseEnter = () => {
      stateRef.current.hidden = false;
      updateClasses();
    };
    const onMouseLeave = () => {
      stateRef.current.hidden = true;
      updateClasses();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    // Ultra-smooth lerp loop for the trailing ring
    let animationFrameId: number;
    const render = () => {
      const ease = 0.2;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-150 will-change-transform"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#3ddbc7",
          boxShadow: "0 0 10px rgba(61, 219, 199, 0.8)",
        }}
      />

      {/* Trailing Fluid Glow Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color,border-color,opacity] duration-150 ease-out will-change-transform"
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "rgba(61, 219, 199, 0.04)",
          border: "1.2px solid rgba(61, 219, 199, 0.35)",
          boxShadow: "0 0 8px rgba(61, 219, 199, 0.15)",
        }}
      />
    </>
  );
}
