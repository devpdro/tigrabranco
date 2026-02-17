import { ReactNode, CSSProperties } from "react";
import Link from "next/link";

import S from "./button.module.scss";

export type ButtonProps = {
  typeStyle?: "btn1" | "btn2" | "btn3" | "primary" | "secondary"; // Added new types, kept old for compatibility (will map)
  variant?: "primary" | "secondary" | "white" | "outlineWhite"; // Preferred new prop
  size?: "sm" | "md" | "lg";
  label: string;
  width?:
    | string
    | { base?: string; sm?: string; md?: string; lg?: string; xs?: string };
  fontSize?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  icon?: ReactNode;
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
};

const Button = ({
  typeStyle,
  variant,
  label,
  width,
  fontSize,
  onClick,
  icon,
  size = "md",
  id,
  type = "button",
  href,
  target,
  rel,
  className,
}: ButtonProps) => {
  // Determine style class
  // Priority: variant prop > typeStyle prop (mapped) > default primary
  let styleClass = S.primary; // Default

  const effectiveVariant =
    variant || (typeStyle === "btn2" ? "secondary" : "primary");

  if (effectiveVariant === "primary") styleClass = S.primary;
  else if (effectiveVariant === "secondary") styleClass = S.secondary;
  else if (effectiveVariant === "white") styleClass = S.white;
  else if (effectiveVariant === "outlineWhite") styleClass = S.outlineWhite;

  // Compatibility for explicit typeStyle usage if needed, but above logic covers btn1->primary, btn2->secondary

  const sizeClasses = {
    sm: S["btn--sm"],
    md: S["btn--md"],
    lg: S["btn--lg"],
  };

  const getResponsiveWidthVars = (
    width:
      | string
      | { base?: string; sm?: string; md?: string; lg?: string; xs?: string }
      | undefined,
  ): React.CSSProperties => {
    if (!width) return {};
    if (typeof width === "string")
      return { "--btn-width": width } as React.CSSProperties;

    // Cascading logic: if a larger breakpoint is missing, it inherits from the smaller one
    // This ensures that sm="auto" applies to md and lg if they are not explicitly set
    const sm = width.sm;
    const md = width.md || sm;
    const lg = width.lg || md;

    return {
      "--btn-width": width.base || "auto",
      "--btn-width-xs": width.xs,
      "--btn-width-sm": sm,
      "--btn-width-md": md,
      "--btn-width-lg": lg,
    } as React.CSSProperties;
  };

  const combinedClass = `${S.btn} ${styleClass} ${sizeClasses[size]} ${className || ""}`;
  const customStyles = {
    ...getResponsiveWidthVars(width),
    ...(fontSize && { fontSize }),
  };

  // Render as Link if href is provided
  if (href) {
    // If external link or target is blank, use a tag or Link with target
    return (
      <Link
        href={href}
        className={combinedClass}
        style={customStyles}
        target={target}
        rel={rel}
        onClick={onClick}
        id={id}
      >
        {label}
        {icon && <span className={S.icon}>{icon}</span>}
      </Link>
    );
  }

  return (
    <button
      id={id}
      className={combinedClass}
      style={customStyles}
      onClick={onClick}
      type={type}
    >
      {label}
      {icon && <span className={S.icon}>{icon}</span>}
    </button>
  );
};

export default Button;

// Exemplo de uso responsivo:
// <Button width={{ base: '100%', md: '350px', lg: '410px' }} typeStyle="btn1" label="Agendar agora" />
