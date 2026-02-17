"use client";

import { useEffect, useRef } from "react";
import type React from "react";
import { useInView } from "framer-motion";
import { annotate } from "rough-notation";
import { type RoughAnnotation } from "rough-notation/lib/model";

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  });

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView;

  useEffect(() => {
    if (!shouldShow) return;

    const element = elementRef.current;
    if (!element) return;

    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    };

    const annotation = annotate(element, annotationConfig);

    annotationRef.current = annotation;
    annotationRef.current.show();

    // Track if annotation has been shown to prevent reanimation
    let hasAnimated = false;
    
    // Mark as animated after show completes
    const animationTimeout = setTimeout(() => {
      hasAnimated = true;
    }, animationDuration + 100);

    // Only update on resize, not on scroll to prevent reanimation and misalignment
    const resizeObserver = new ResizeObserver(() => {
      if (hasAnimated && annotationRef.current) {
        // Only update position on resize, not on scroll
        // Use refresh if available, otherwise recreate without animation
        try {
          // Try to use refresh method if available
          if (typeof (annotationRef.current as any).refresh === 'function') {
            (annotationRef.current as any).refresh();
          } else {
            // Fallback: recreate without animation
            annotationRef.current.hide();
            requestAnimationFrame(() => {
              if (element && annotationRef.current) {
                const newAnnotation = annotate(element, {
                  ...annotationConfig,
                  animationDuration: 0,
                });
                newAnnotation.show();
                annotationRef.current = newAnnotation;
              }
            });
          }
        } catch {
          // If refresh fails, just leave it as is
        }
      }
    });

    resizeObserver.observe(element);

    // Only listen to resize, NOT scroll, to prevent reanimation and misalignment
    window.addEventListener("resize", () => {
      if (hasAnimated && annotationRef.current) {
        try {
          if (typeof (annotationRef.current as any).refresh === 'function') {
            (annotationRef.current as any).refresh();
          }
        } catch {
          // Ignore errors
        }
      }
    });

    return () => {
      clearTimeout(animationTimeout);
      if (element) {
        try {
          annotate(element, { type: action }).remove();
        } catch {
          // Ignore cleanup errors
        }
        resizeObserver.disconnect();
        window.removeEventListener("resize", () => {});
      }
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    isView,
  ]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}

