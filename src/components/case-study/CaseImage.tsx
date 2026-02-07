type CaseImageProps = {
  src: string
  alt: string
  aspectRatio?: string
  rounded?: boolean
  priority?: boolean
  className?: string
}

function CaseImage({
  src,
  alt,
  aspectRatio = '632 / 442',
  rounded = true,
  priority = false,
  className,
}: CaseImageProps) {
  return (
    <div
      className={[
        'relative w-full overflow-hidden',
        rounded ? 'rounded-lg' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        width={632}
        height={442}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  )
}

export default CaseImage
