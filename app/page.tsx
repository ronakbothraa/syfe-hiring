import DashboardBanner from "@/components/DashboardBanner";
import DashboardHeader from "@/components/DashboardHeader";
import GoalsSection from "@/components/GoalsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <DashboardHeader />

        <DashboardBanner exchangeRate={55} />

        <GoalsSection />
      </div>
    </div>
  );
}
