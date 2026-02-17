"use client";

import { motion, Variants } from "framer-motion";

interface HandWrittenTextInlineProps {
  text: string;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
}

function HandWrittenTextInline({
  text,
  className = "",
  strokeColor = "currentColor",
  strokeWidth = 4,
  duration = 2.5,
}: HandWrittenTextInlineProps) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { 
          duration, 
          ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number]
        },
        opacity: { duration: 0.5 },
      },
    },
  };

  // Path curvo natural para sublinhar o texto (ajustado para "24 horas")
  const underlinePath = `M 5 35 
    Q 25 30, 45 35
    T 85 35
    Q 105 30, 125 35
    T 165 35
    Q 185 40, 200 35`;

  return (
    <span className={`relative inline-block ${className}`} style={{ paddingBottom: "8px" }}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.span>
      <motion.svg
        className="absolute bottom-0 left-0"
        width="100%"
        height="12"
        viewBox="0 0 200 50"
        preserveAspectRatio="none"
        initial="hidden"
        animate="visible"
        style={{ pointerEvents: "none", overflow: "visible" }}
      >
        <motion.path
          d={underlinePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
        />
      </motion.svg>
    </span>
  );
}

export { HandWrittenTextInline };

