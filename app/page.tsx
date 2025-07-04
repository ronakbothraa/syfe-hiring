"use client";

import DashboardBanner from "@/components/DashboardBanner";
import DashboardHeader from "@/components/DashboardHeader";
import GoalsSection from "@/components/GoalsSection";
import { Goal } from "@/types/goal";
import { useState } from "react";



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
]


export default function Home() {

  const [exchangeRate, setExchangeRate] = useState<number | null>(85);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <DashboardHeader />

        <DashboardBanner
          totalTarget={500000000}
          totalSaved={167000}
          overallProgress={Math.floor(500000000/167000)}
          exchangeRate={exchangeRate}
          isLoadingRate={true}
          onRefreshRate={() => setExchangeRate(85)}
        />

        <GoalsSection 
          goals={initialGoals}
          exchangeRate={exchangeRate}
          onAddGoal={(goal) => {
            const newGoal: Goal = {
              ...goal,
              id: Math.random().toString(36).substring(2, 15),
              saved: 0,
              progress: 0,
              contributions: [],
              remaining: goal.target,
              createdAt: new Date().toISOString(),
            };
            initialGoals.push(newGoal);
          }}
        />
      </div>
    </div>
  );
}
