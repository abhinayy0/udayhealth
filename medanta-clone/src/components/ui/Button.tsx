import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-medium rounded-md transition-all duration-300 flex items-center justify-center";

  const sizeStyles = {
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6",
  };

  const variantStyles = {
    primary:
      "bg-[#0056b3] hover:bg-[#004494] text-white shadow-md hover:shadow-lg",
    secondary:
      "bg-[#f8f9fa] hover:bg-[#e9ecef] text-[#0056b3] border border-[#0056b3]",
    outline:
      "bg-transparent border-2 border-[#0056b3] text-[#0056b3] hover:bg-[#0056b3] hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
