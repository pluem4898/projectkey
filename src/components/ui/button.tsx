import * as React from "react"
import { cn } from "@/lib/utils"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "danger"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 hover:from-emerald-400 hover:to-cyan-400 hover:scale-105 glow focus:ring-emerald-500": variant === "default",
            "border-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 focus:ring-emerald-500": variant === "outline",
            "text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/50 focus:ring-zinc-500": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-500 hover:scale-105 glow focus:ring-red-500": variant === "danger",
          },
          {
            "px-6 py-3 text-base": size === "default",
            "px-4 py-2 text-sm": size === "sm",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
