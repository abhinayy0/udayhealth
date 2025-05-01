import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hover" | "border";
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
}) => {
  const baseStyles = "bg-white rounded-lg overflow-hidden";

  const variantStyles = {
    default: "shadow-sm",
    hover:
      "shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
    border: "border border-gray-200",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
