export interface Goal {
  id: string
  title: string
  target: number
  saved: number
  progress: number
  contributions: Contribution[]
  remaining: number
  currency: "INR" | "USD"
  createdAt: string
}

export interface Contribution {
  id: string
  amount: number
  date: string
  timestamp: string
}