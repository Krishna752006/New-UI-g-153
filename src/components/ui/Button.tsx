import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
    secondary: "text-purple-700 bg-purple-100 hover:bg-purple-200 focus:ring-purple-500",
    outline: "text-purple-600 bg-transparent border border-purple-600 hover:bg-purple-50 focus:ring-purple-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}