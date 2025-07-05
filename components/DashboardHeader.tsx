import { PiggyBank } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-center flex-1 space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center">
            <PiggyBank className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Syfe Savings Planner</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Track your financial goals and build your future</p>
      </div>
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
    </div>
  )
}
