export type StatusIconVariant = 'positive' | 'negative' | 'neutral'

type StatusIconProps = {
  variant: StatusIconVariant
  className?: string
}

const bgMap: Record<StatusIconVariant, string> = {
  positive: 'bg-[#7ccf00]',
  negative: 'bg-[#fb2c36]',
  neutral: 'bg-[#e7e5e4]',
}

function StatusIcon({ variant, className }: StatusIconProps) {
  const bg = bgMap[variant]

  return (
    <span
      className={[
        'inline-flex shrink-0 items-center justify-center rounded-xl size-6',
        bg,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      {variant === 'positive' ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M11.5 5.5L6.8125 10.5L4.5 8.0625"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M8 5V8.5"
            stroke={variant === 'negative' ? 'white' : '#0c0a09'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="8"
            cy="11"
            r="0.75"
            fill={variant === 'negative' ? 'white' : '#0c0a09'}
          />
        </svg>
      )}
    </span>
  )
}

export default StatusIcon
