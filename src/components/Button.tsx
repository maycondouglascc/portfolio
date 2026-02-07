import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ElementType } from 'react'

type ButtonVariant = 'link' | 'icon'

type ButtonProps<C extends ElementType> = {
  as?: C
  variant?: ButtonVariant
  className?: string
} & ComponentPropsWithoutRef<C>

const baseClass =
  'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 touch-manipulation disabled:pointer-events-none disabled:opacity-50'

const variantClasses: Record<ButtonVariant, string> = {
  link: 'text-body-15-medium font-medium text-link underline-offset-2 hover:text-link-hover hover:underline',
  icon: "relative rounded-2xl bg-[#f5f5f4] p-2 text-primary hover:bg-[#e7e5e4] before:absolute before:inset-[-6px] before:content-[''] sm:before:inset-0",
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
