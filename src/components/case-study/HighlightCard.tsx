import StatusIcon, { type StatusIconVariant } from './StatusIcon'

export type HighlightCardProps = {
  variant: StatusIconVariant
  title: string
  description: string
}

function HighlightCard({ variant, title, description }: HighlightCardProps) {
  return (
    <div className="flex flex-col gap-2 items-start rounded bg-stone-50 border p-4 min-w-[110px] h-full">
      <StatusIcon variant={variant} />
      <div className="flex flex-col gap-1 w-full">
        <p className="text-body-15-medium font-semibold text-primary tabular-nums">
          {title}
        </p>
        <p className="text-body-15-regular font-regular text-secondary">
          {description}
        </p>
      </div>
    </div>
  )
}

export default HighlightCard
