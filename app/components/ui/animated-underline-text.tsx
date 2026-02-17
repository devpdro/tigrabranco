"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./animated-underline-text.module.scss";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

const AnimatedText = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      strokeColor = "#02a657",
      strokeWidth = 4,
      className,
      ...props
    },
    ref
  ) => {
    const pathVariants: Variants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: underlineDuration,
          ease: "easeInOut",
        },
      },
    };

    return (
      <span
        ref={ref}
        className={cn(styles.wrapper, className)}
        {...props}
      >
        <span className={styles.container}>
          <motion.span
            className={cn(styles.text, textClassName)}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            {text}
          </motion.span>

          <motion.svg
            width="100%"
            height="20"
            viewBox="0 0 240 20"
            preserveAspectRatio="none"
            className={cn(styles.underline, underlineClassName)}
            style={{ display: "block" }}
          >
            <motion.path
              d={underlinePath}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill="none"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                d: underlineHoverPath,
                transition: { duration: 0.8 },
              }}
            />
          </motion.svg>
        </span>
      </span>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };

