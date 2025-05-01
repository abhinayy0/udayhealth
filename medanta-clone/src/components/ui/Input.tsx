import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "outline";
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "w-full px-4 py-2 rounded-md focus:outline-none transition-all duration-200";

  const variantStyles = {
    default:
      "border border-gray-300 focus:border-[#0056b3] focus:ring-2 focus:ring-[#0056b3]/20",
    outline: "border-2 border-[#0056b3] bg-transparent",
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
