"use client"

import type { ReactNode } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MetricCardProps {
  icon: ReactNode
  title: string
  value: string
  subtitle: string
  trend?: "up" | "down"
}

export default function MetricCard({ icon, title, value, subtitle, trend = "up" }: MetricCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-white/80 group-hover:text-white transition-colors">{icon}</div>
        <span className="text-white/80 text-sm font-medium">{title}</span>
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="flex items-center gap-1 text-white/70 text-sm">
          {trend === "up" ? (
            <TrendingUp className="w-3 h-3 text-green-300" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-300" />
          )}
          <span>{subtitle}</span>
        </div>
      </div>
    </div>
  )
}
