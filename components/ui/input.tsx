"use client"

import type { InputHTMLAttributes } from "react"
import { forwardRef } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = "", error = false, ...props }, ref) => {
  const baseStyles =
    "w-full px-3 py-2 border rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"

  const errorStyles = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"

  const classes = `${baseStyles} ${errorStyles} ${className}`

  return <input ref={ref} className={classes} {...props} />
})

Input.displayName = "Input"

export { Input }
