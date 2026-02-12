import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ElementType } from 'react'

type ButtonVariant = 'link' | 'icon'

type ButtonProps<C extends ElementType> = {
  as?: C
  variant?: ButtonVariant
  className?: string
} & ComponentPropsWithoutRef<C>

const baseClass =
  'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 focus-visible:outline-offset-2 dark:focus-visible:outline-zinc-100 touch-manipulation disabled:pointer-events-none disabled:opacity-50'

const variantClasses: Record<ButtonVariant, string> = {
  link: 'text-body-15-medium font-medium text-zinc-900 underline-offset-2 hover:text-zinc-700 hover:underline dark:text-zinc-100 dark:hover:text-zinc-200',
  icon: "relative rounded-2xl bg-zinc-200 p-2 text-zinc-900 hover:bg-zinc-300 before:absolute before:inset-[-6px] before:content-[''] sm:before:inset-0 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
}

const combineClasses = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ')

function Button<C extends ElementType = 'button'>({
  as,
  variant = 'link',
  className,
  ...rest
}: ButtonProps<C>) {
  const Component = as ?? 'button'
  const props = { ...rest } as ComponentPropsWithoutRef<C>

  if (Component === 'button') {
    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>
    if (buttonProps.type == null) {
      buttonProps.type = 'button'
    }
  }

  return (
    <Component
      {...props}
      className={combineClasses(baseClass, variantClasses[variant], className)}
    />
  )
}

export default Button
