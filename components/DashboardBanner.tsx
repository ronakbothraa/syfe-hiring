"use client"

import { RefreshCw, TrendingUp, Target, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import MetricCard from "@/components/metric-card"

interface DashboardBannerProps {
  totalTarget: number
  totalSaved: number
  overallProgress: number
  exchangeRate: number | null
  isLoadingRate: boolean
  onRefreshRate: () => void
}

export default function DashboardBanner({
  totalTarget,
  totalSaved,
  overallProgress,
  exchangeRate,
  isLoadingRate,
  onRefreshRate,
}: DashboardBannerProps) {

  const formatCurrency = (amount: number, currency = "INR") => {
    const symbol = currency === "INR" ? "₹" : "$"
    return `${symbol}${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 dark:from-indigo-800 dark:via-purple-800 dark:to-blue-900 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Financial Overview</h2>
        </div>
        <Button
          onClick={onRefreshRate}
          variant="secondary"
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border-0 dark:bg-white/10 dark:hover:bg-white/20"
          disabled={isLoadingRate}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingRate ? "animate-spin" : ""}`} />
          Refresh Rates
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricCard
          icon={<Target className="w-6 h-6" />}
          title="Total Target"
          value={formatCurrency(totalTarget)}
          subtitle="Across all goals"
          trend="up"
        />

        <MetricCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Total Saved"
          value={formatCurrency(totalSaved)}
          subtitle="Current progress"
          trend="up"
        />

        <MetricCard
          icon={<BarChart3 className="w-6 h-6" />}
          title="Overall Progress"
          value={`${overallProgress}%`}
          subtitle="Goal completion"
          trend="up"
        />
      </div>

      <div className="flex items-center justify-between text-sm opacity-80">
        <span>Exchange Rate: 1 USD = ₹{exchangeRate?.toFixed(2) || "Loading..."}</span>
        <span>Last updated: {"Loading..."}</span>
      </div>
    </div>
  )
}
