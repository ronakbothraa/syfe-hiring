"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Goal } from "@/types/goal"

interface ContributionModalProps {
  isOpen: boolean
  onClose: () => void
  goal: Goal
  onAddContribution: (goalId: string, amount: number, date: string) => void
}

export default function ContributionModal({ isOpen, onClose, goal, onAddContribution }: ContributionModalProps) {
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const contributionAmount = Number.parseFloat(amount)

    if (contributionAmount > 0 && date) {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      onAddContribution(goal.id, contributionAmount, date)
      setAmount("")
      setDate(new Date().toISOString().split("T")[0])
      setIsSubmitting(false)
      onClose()
    }
  }

  const quickAmounts = goal.currency === "INR" ? [500, 1000, 2500, 5000] : [10, 25, 50, 100]
  const currencySymbol = goal.currency === "INR" ? "₹" : "$"

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md border dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Contribution</h3>
          <Button onClick={onClose} variant="ghost" size="sm" className="p-1">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Contributing to:</p>
          <p className="font-medium text-gray-900 dark:text-white">{goal.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currencySymbol}
            {goal.remaining.toLocaleString("en-IN")} remaining
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Contribution Amount ({goal.currency})
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount in ${goal.currency}`}
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              <Calendar className="w-4 h-4 inline mr-1" />
              Contribution Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Quick amounts:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="text-sm"
                >
                  {currencySymbol}
                  {quickAmount.toLocaleString("en-IN")}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!amount || !date || isSubmitting}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {isSubmitting ? (
                "Adding..."
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contribution
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
