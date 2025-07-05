"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoalCard from "./goal-card";
import AddGoalModal from "./add-goal-modal";
import type { Goal } from "@/types/goal";
import { useState } from "react";

interface GoalsSectionProps {
  goals: Goal[];
  exchangeRate: number | null;
  onAddContribution: (goalId: string, amount: number, date: string) => void
  onAddGoal: (
    goal: Omit<
      Goal,
      "id" | "saved" | "progress" | "contributions" | "remaining" | "createdAt"
    >
  ) => void;
}

export default function GoalsSection({
  goals,
  exchangeRate,
  onAddGoal,
  onAddContribution,
}: GoalsSectionProps) {
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  return (
    <div className="space-y-6 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Your Goals</h2>
        <Button
          onClick={() => setIsAddGoalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} exchangeRate={exchangeRate} onAddContribution={onAddContribution}/>
        ))}
      </div>

      <AddGoalModal
        isOpen={isAddGoalOpen}
        onClose={() => setIsAddGoalOpen(false)}
        onAddGoal={onAddGoal}
      />
    </div>
  );
}
