import { Check, Info, X } from 'react-feather'

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

const labelMap: Record<StatusIconVariant, string> = {
  positive: 'Positive',
  negative: 'Negative',
  neutral: 'Neutral',
}

function StatusIcon({ variant, className }: StatusIconProps) {
  const bg = bgMap[variant]
  const iconClassName =
    variant === 'neutral' ? 'text-primary' : 'text-white'

  return (
    <span
      className={[
        'inline-flex shrink-0 items-center justify-center rounded-xl size-6',
        bg,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="img"
      aria-label={labelMap[variant]}
    >
      {variant === 'positive' && (
        <Check
          size={16}
          strokeWidth={1.5}
          className={iconClassName}
          aria-hidden="true"
        />
      )}
      {variant === 'negative' && (
        <X
          size={16}
          strokeWidth={1.5}
          className={iconClassName}
          aria-hidden="true"
        />
      )}
      {variant === 'neutral' && (
        <Info
          size={16}
          strokeWidth={1.5}
          className={iconClassName}
          aria-hidden="true"
        />
      )}
    </span>
  )
}

export default StatusIcon
