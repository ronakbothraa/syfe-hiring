"use client"

interface ProgressBarProps {
  progress: number
  height?: string
  showLabel?: boolean
}

export default function ProgressBar({ progress, height = "h-2", showLabel = false }: ProgressBarProps) {
  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-red-500"
    if (progress < 50) return "bg-yellow-500"
    if (progress < 75) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-1">
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} ${getProgressColor(progress)} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showLabel && <div className="text-xs text-gray-600 text-right">{progress}% complete</div>}
    </div>
  )
}
