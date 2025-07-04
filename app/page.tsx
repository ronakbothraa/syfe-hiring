"use client";

import DashboardBanner from "@/components/DashboardBanner";
import DashboardHeader from "@/components/DashboardHeader";
import GoalsSection from "@/components/GoalsSection";
import { useState } from "react";

export default function Home() {

  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

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

        <GoalsSection />
      </div>
    </div>
  );
}
