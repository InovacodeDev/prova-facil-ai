import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "filled" | "outlined";
}

export function Button({ variant = "filled", className = "", ...props }: ButtonProps) {
    const baseClasses = "px-6 py-3 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-primary";
    const variantClasses =
        variant === "filled"
            ? "bg-primary text-on-primary hover:bg-primary/90"
            : "border border-outline text-on-surface hover:bg-surface";
    return <button className={`${baseClasses} ${variantClasses} ${className}`} {...props} />;
}
