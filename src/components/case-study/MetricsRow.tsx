import HighlightCard, { type HighlightCardProps } from './HighlightCard'

type MetricsRowProps = {
  items: HighlightCardProps[]
  disclaimer?: string
  layout?: 'horizontal' | 'vertical'
}

function MetricsRow({
  items,
  disclaimer,
  layout = 'vertical',
}: MetricsRowProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={[
          'flex gap-2',
          layout === 'horizontal'
            ? 'flex-col sm:flex-row'
            : 'flex-col',
        ].join(' ')}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className={layout === 'horizontal' ? 'flex-1 min-w-0' : ''}
          >
            <HighlightCard {...item} />
          </div>
        ))}
      </div>
      {disclaimer && (
        <p className="text-caption-12-regular font-medium text-zinc-600 dark:text-zinc-400">
          {disclaimer}
        </p>
      )}
    </div>
  )
}

export default MetricsRow
