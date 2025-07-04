"use client";

import { useEffect, useState } from "react";
import { Plus, Target, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressBar from "./progress-bar";
import { ExchangeRateService } from "@/services/exchange-rate";
import type { Goal } from "@/types/goal";
import ContributionModal from "./contribution-modal";

interface GoalCardProps {
  goal: Goal;
  exchangeRate: number | null;
  onAddContribution: (goalId: string, amount: number, date: string) => void
}

export default function GoalCard({ goal, exchangeRate, onAddContribution }: GoalCardProps) {
  const [isContributionOpen, setIsContributionOpen] = useState(false);

  useEffect(() => {
    async function loadExchangeRate() {
      await ExchangeRateService().then((rate) => {
        if (rate) {
          exchangeRate = rate;
        } else {
          console.error("Failed to load exchange rate");
        }
      });
    }

    loadExchangeRate();
  }, []);

  const formatCurrency = (amount: number, currency: "INR" | "USD") => {
    const symbol = currency === "INR" ? "₹" : "$";
    return `${symbol}${amount.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;
  };

  const getConvertedAmount = (amount: number, fromCurrency: "INR" | "USD") => {
    if (!exchangeRate) return "Loading...";

    const toCurrency = fromCurrency === "INR" ? "USD" : "INR";
    const convertedAmount =
      fromCurrency === "INR" ? amount / exchangeRate : amount * exchangeRate;

    return formatCurrency(convertedAmount, toCurrency);
  };

  const getCurrencyIcon = (currency: "INR" | "USD") => {
    return currency === "USD" ? (
      <DollarSign className="w-4 h-4" />
    ) : (
      <span className="text-sm font-bold">₹</span>
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {getCurrencyIcon(goal.currency)}
            <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
              {goal.progress}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(goal.target, goal.currency)}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              ≈ {getConvertedAmount(goal.target, goal.currency)}
            </div>
            <div className="text-sm text-gray-600">
              {formatCurrency(goal.saved, goal.currency)} saved
            </div>
          </div>

          <ProgressBar progress={goal.progress} />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <TrendingUp className="w-3 h-3" />
              <span>{formatCurrency(goal.saved, goal.currency)} saved</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>{goal.contributions.length} contributions</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium">
              {formatCurrency(goal.remaining, goal.currency)} remaining
            </span>
          </div>

          <Button
            onClick={() => setIsContributionOpen(true)}
            variant="outline"
            className="w-full transition-all duration-300 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Contribution
          </Button>
        </div>
      </div>

      <ContributionModal
        isOpen={isContributionOpen}
        onClose={() => setIsContributionOpen(false)}
        goal={goal}
        onAddContribution={onAddContribution}
      />
    </>
  );
}
