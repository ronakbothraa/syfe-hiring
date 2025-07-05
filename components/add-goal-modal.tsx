"use client";

import type React from "react";

import { useState } from "react";
import { X, Target, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Goal } from "@/types/goal";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (
    goal: Omit<
      Goal,
      "id" | "saved" | "progress" | "contributions" | "remaining" | "createdAt"
    >
  ) => void;
}

export default function AddGoalModal({
  isOpen,
  onClose,
  onAddGoal,
}: AddGoalModalProps) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetAmount = Number.parseFloat(target);

    if (title && targetAmount > 0) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      onAddGoal({
        title,
        target: targetAmount,
        currency,
      });

      setTitle("");
      setTarget("");
      setCurrency("INR");
      setIsSubmitting(false);
      onClose();
    }
  };

  const goalTemplates = {
    INR: [
      { name: "Emergency Fund", amount: 100000 },
      { name: "Vacation", amount: 50000 },
      { name: "New Car", amount: 500000 },
      { name: "Home Down Payment", amount: 1000000 },
    ],
    USD: [
      { name: "Emergency Fund", amount: 1200 },
      { name: "Vacation", amount: 600 },
      { name: "New Car", amount: 6000 },
      { name: "Home Down Payment", amount: 12000 },
    ],
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add New Goal
          </h3>
          <Button onClick={onClose} variant="ghost" size="sm" className="p-1">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Goal Name
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Trip to Japan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Currency
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Button
                type="button"
                variant={currency === "INR" ? "default" : "outline"}
                onClick={() => setCurrency("INR")}
                className="flex items-center gap-2"
              >
                <span className="font-bold">₹</span>
                INR
              </Button>
              <Button
                type="button"
                variant={currency === "USD" ? "default" : "outline"}
                onClick={() => setCurrency("USD")}
                className="flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                USD
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Target Amount ({currency})
            </label>
            <Input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={`Enter target amount in ${currency}`}
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Popular goals ({currency}):
            </p>
            <div className="grid grid-cols-2 gap-2">
              {goalTemplates[currency].map((template) => (
                <Button
                  key={template.name}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTitle(template.name);
                    setTarget(template.amount.toString());
                  }}
                  className="text-xs"
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title || !target || isSubmitting}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {isSubmitting ? (
                "Creating..."
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Create Goal
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
