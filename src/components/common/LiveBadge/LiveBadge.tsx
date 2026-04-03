interface LiveBadgeProps {
  className?: string
}

export default function LiveBadge({ className }: LiveBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-live-subtle px-2 py-0.5 text-xs font-semibold text-live${className ? ` ${className}` : ''}`}
    >
      <span className="size-1.5 rounded-full bg-live live-pulse" />
      EN VIVO
    </span>
  )
}
