import { PiggyBank } from "lucide-react"

export default function DashboardHeader() {
  return (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
          <PiggyBank className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Syfe Savings Planner</h1>
      </div>
      <p className="text-gray-600">Track your financial goals and build your future</p>
    </div>
  )
}