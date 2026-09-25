"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimateInProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  className = "",
  ...props
}) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
