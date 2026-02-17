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

    const updateAnnotation = () => {
      if (annotationRef.current) {
        annotationRef.current.hide();
        // Use requestAnimationFrame to ensure DOM is updated
        requestAnimationFrame(() => {
          if (annotationRef.current) {
            annotationRef.current.show();
          }
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateAnnotation();
    });

    // Add scroll listener to recalculate on scroll
    const handleScroll = () => {
      updateAnnotation();
    };

    resizeObserver.observe(element);
    resizeObserver.observe(document.body);
    
    // Throttle scroll events for better performance
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", updateAnnotation);

    return () => {
      if (element) {
        annotate(element, { type: action }).remove();
        resizeObserver.disconnect();
        window.removeEventListener("scroll", throttledScroll);
        window.removeEventListener("resize", updateAnnotation);
        clearTimeout(scrollTimeout);
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
  ]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}

