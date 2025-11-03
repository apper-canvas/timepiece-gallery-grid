import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  loading = false,
  leftIcon,
  rightIcon,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white hover:shadow-lg hover:-translate-y-0.5",
    secondary: "border border-secondary text-secondary hover:bg-secondary hover:text-white",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/5"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm gap-2",
    md: "px-6 py-3 gap-2",
    lg: "px-8 py-4 text-lg gap-3"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <ApperIcon name="Loader2" className="animate-spin w-4 h-4" />
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <ApperIcon name={leftIcon} className="w-4 h-4" />}
          {children}
          {rightIcon && <ApperIcon name={rightIcon} className="w-4 h-4" />}
        </>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;