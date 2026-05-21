"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** direção da entrada */
  from?: "bottom" | "left" | "right";
};

const offset = {
  bottom: { y: 28, x: 0 },
  left: { y: 0, x: -28 },
  right: { y: 0, x: 28 },
};

export function Reveal({ children, delay = 0, className, from = "bottom" }: Props) {
  const o = offset[from];
  return (
    <motion.div
      initial={{ opacity: 0, ...o }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
