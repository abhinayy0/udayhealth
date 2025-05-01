import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = "",
  align = "center",
  size = "md",
}) => {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const sizeStyles = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  return (
    <h2
      className={`${sizeStyles[size]} font-bold text-[#0056b3] mb-8 ${alignStyles[align]} ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
