"use client";

import { RefreshCw, TrendingUp, BarChart3, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardBannerProps {
  exchangeRate: number | null;
}

export default function DashboardBanner({
  exchangeRate,
}: DashboardBannerProps) {


  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Financial Overview</h2>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border-0"
        >
          <RefreshCw />
          Refresh Rates
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-white/80 group-hover:text-white transition-colors">
              {<X />}
            </div>
            <span className="text-white/80 text-sm font-medium">{"Title"}</span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold text-white">{"5000"}</div>
            <div className="flex items-center gap-1 text-white/70 text-sm">
              <TrendingUp className="w-3 h-3 text-green-300" />
              <span>{"Something"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm opacity-80">
        <span>
          Exchange Rate: 1 USD = ₹{exchangeRate?.toFixed(2) || "Loading..."}
        </span>
        <span>Last updated: {"Right now"}</span>
      </div>
    </div>
  );
}
