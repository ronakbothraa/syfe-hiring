"use client";

import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      size="sm"
      className="w-9 h-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      ) : (
        <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      )}
    </Button>
  );
}
