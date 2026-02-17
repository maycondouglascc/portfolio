import CaseImage from './CaseImage'

type ImageGridProps = {
  images: { src: string; alt: string }[]
}

function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full">
      {images.map((image) => (
        <CaseImage key={image.src} src={image.src} alt={image.alt} />
      ))}
    </div>
  )
}

export default ImageGrid
