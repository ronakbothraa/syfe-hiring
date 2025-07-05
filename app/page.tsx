"use client";

import DashboardBanner from "@/components/DashboardBanner";
import DashboardHeader from "@/components/DashboardHeader";
import GoalsSection from "@/components/GoalsSection";
import { ExchangeRateService } from "@/services/exchange-rate";
import { Contribution, Goal } from "@/types/goal";
import { useEffect, useState } from "react";

const initialGoals: Goal[] = [
  {
    id: "1",
    title: "Trip to Japan",
    target: 15000,
    saved: 300,
    progress: 2,
    contributions: [
      {
        id: "c1",
        amount: 300,
        date: "2024-01-15",
        timestamp: new Date().toISOString(),
      },
    ],
    remaining: 14700,
    currency: "INR",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Emergency Fund",
    target: 6000,
    saved: 3660,
    progress: 61,
    contributions: [
      {
        id: "c2",
        amount: 3660,
        date: "2024-01-10",
        timestamp: new Date().toISOString(),
      },
    ],
    remaining: 2340,
    currency: "USD",
    createdAt: "2024-01-01",
  },
];

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [exchangeRate, setExchangeRate] = useState<number | null>(85);
  const [isLoadingRate, setIsLoadingRate] = useState(false);

  useEffect(() => {
    const something = async () => {
      setExchangeRate(await ExchangeRateService());
    };
    something();
  }, []);

  const loadExchangeRate = async () => {
    setIsLoadingRate(true);
    try {
      setExchangeRate(await ExchangeRateService());
    } catch (error) {
      console.error("Failed to load exchange rate:", error);
    } finally {
      setIsLoadingRate(false);
    }
  };

  const handleAddContribution = (
    goalId: string,
    amount: number,
    date: string
  ) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === goalId) {
          const newContribution: Contribution = {
            id: Date.now().toString(),
            amount,
            date,
            timestamp: new Date().toISOString(),
          };

          const newSaved = goal.saved + amount;
          const newProgress = Math.min((newSaved / goal.target) * 100, 100);
          const newRemaining = Math.max(goal.target - newSaved, 0);

          return {
            ...goal,
            saved: newSaved,
            progress: Math.round(newProgress),
            remaining: newRemaining,
            contributions: [...goal.contributions, newContribution],
          };
        }
        return goal;
      })
    );
  };

  const handleAddGoal = (
    newGoal: Omit<
      Goal,
      "id" | "saved" | "progress" | "contributions" | "remaining" | "createdAt"
    >
  ) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
      saved: 0,
      progress: 0,
      contributions: [],
      remaining: newGoal.target,
      createdAt: new Date().toISOString(),
    };
    setGoals((prevGoals) => [...prevGoals, goal]);
  };

  const calculateTotals = () => {
    if (!exchangeRate)
      return { totalTarget: 0, totalSaved: 0, overallProgress: 0 };

    let totalTargetINR = 0;
    let totalSavedINR = 0;

    goals.forEach((goal) => {
      totalTargetINR += goal.currency === "INR" ? goal.target : goal.target * exchangeRate;
      totalSavedINR += goal.currency === "INR" ? goal.saved : goal.saved * exchangeRate;
    });

    const overallProgress =
      totalTargetINR > 0 ? (totalSavedINR / totalTargetINR) * 100 : 0;

    return {
      totalTarget: totalTargetINR,
      totalSaved: totalSavedINR,
      overallProgress: Math.round(overallProgress),
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <DashboardHeader />

        <DashboardBanner
          totalTarget={totals.totalTarget}
          totalSaved={totals.totalSaved}
          overallProgress={totals.overallProgress}
          exchangeRate={exchangeRate}
          isLoadingRate={isLoadingRate}
          onRefreshRate={loadExchangeRate}
        />

        <GoalsSection
          goals={goals}
          exchangeRate={exchangeRate}
          onAddContribution={handleAddContribution}
          onAddGoal={handleAddGoal}
        />
      </div>
    </div>
  );
}
