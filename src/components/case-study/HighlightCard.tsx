import StatusIcon, { type StatusIconVariant } from './StatusIcon'

export type HighlightCardProps = {
  variant: StatusIconVariant
  title: string
  description: string
}

function HighlightCard({ variant, title, description }: HighlightCardProps) {
  return (
    <div className="flex flex-col gap-2 items-start rounded bg-[#fafaf9] border border-[#e7e5e4] p-4 min-w-[110px]">
      <StatusIcon variant={variant} />
      <div className="flex flex-col gap-1 w-full">
        <p className="text-body-15-medium font-semibold text-[#0c0a09]">
          {title}
        </p>
        <p className="text-body-15-regular font-medium text-[#44403b]">
          {description}
        </p>
      </div>
    </div>
  )
}

export default HighlightCard
