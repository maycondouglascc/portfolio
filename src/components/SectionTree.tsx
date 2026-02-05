import { useEffect, useMemo, useRef, useState } from 'react'

export type SectionTreeItem = {
  id: string
  label: string
  href?: string
  children?: SectionTreeItem[]
}

type SectionTreeProps = {
  items: SectionTreeItem[]
  ariaLabel?: string
  className?: string
}

const flattenItems = (items: SectionTreeItem[]) => {
  const flattened: SectionTreeItem[] = []

  const walk = (list: SectionTreeItem[]) => {
    list.forEach((item) => {
      flattened.push(item)
      if (item.children) {
        walk(item.children)
      }
    })
  }

  walk(items)
  return flattened
}

const SectionTree = ({ items, ariaLabel = 'Section navigation', className }: SectionTreeProps) => {
  const flattenedItems = useMemo(() => flattenItems(items), [items])
  const [activeId, setActiveId] = useState<string | null>(
    flattenedItems[0]?.id ?? null,
  )
  const activeIdRef = useRef(activeId)

  useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

  useEffect(() => {
    setActiveId(flattenedItems[0]?.id ?? null)
  }, [flattenedItems])

  useEffect(() => {
    if (!flattenedItems.length) return

    const visibleIds = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (!id) return

          if (entry.isIntersecting) {
            visibleIds.add(id)
          } else {
            visibleIds.delete(id)
          }
        })

        if (!visibleIds.size) return

        const nextActive = flattenedItems.find((item) => visibleIds.has(item.id))
        if (nextActive && nextActive.id !== activeIdRef.current) {
          setActiveId(nextActive.id)
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] },
    )

    const elements = flattenedItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [flattenedItems])

  const renderItems = (list: SectionTreeItem[], depth = 0) => (
    <ul className={depth === 0 ? 'space-y-2' : 'mt-2 space-y-1 pl-4 border-l border-border'}>
      {list.map((item) => {
        const isActive = item.id === activeId
        const href = item.href ?? `#${item.id}`

        return (
          <li key={item.id} className="min-w-0">
            <a
              href={href}
              aria-current={isActive ? 'true' : undefined}
              className={[
                'group flex items-center gap-2 rounded-md px-2 py-2 text-[13px] font-medium',
                'transition-[color,transform,background-color] duration-200 ease-out',
                'motion-reduce:transition-none touch-manipulation',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
                isActive
                  ? 'text-primary bg-border/60'
                  : 'text-secondary hover:text-primary hover:bg-border/40',
              ].join(' ')}
            >
              <span
                className={[
                  'h-2 w-2 rounded-full transition-transform duration-200 ease-out',
                  'motion-reduce:transition-none',
                  isActive
                    ? 'bg-primary scale-110'
                    : 'bg-border group-hover:bg-primary/60 group-hover:scale-105',
                ].join(' ')}
              />
              <span className="min-w-0 truncate transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5">
                {item.label}
              </span>
            </a>
            {item.children ? renderItems(item.children, depth + 1) : null}
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav className={['w-full', className].filter(Boolean).join(' ')} aria-label={ariaLabel}>
      {renderItems(items)}
    </nav>
  )
}

export default SectionTree
