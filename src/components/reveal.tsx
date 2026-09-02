import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  type = "pop",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  type?: "pop" | "slide" | "fade";
}) {
  const initial =
    type === "pop"
      ? { opacity: 0, y: 14, scale: 0.985 }
      : type === "slide"
        ? { opacity: 0, y: 18, scale: 1 }
        : { opacity: 0, scale: 0.99 };

  const animate = { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: false, amount: 0.08 }}
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
      transition={{
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1], // Ultra-fast 120Hz/144Hz responsive easeOutCubic
        delay: Math.min(delay, 0.12),
      }}
    >
      {children}
    </motion.div>
  );
}
