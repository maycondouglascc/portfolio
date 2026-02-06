import CaseImage from './CaseImage'

type ImageStackProps = {
  images: { src: string; alt: string }[]
}

function ImageStack({ images }: ImageStackProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {images.map((image) => (
        <CaseImage key={image.src} src={image.src} alt={image.alt} />
      ))}
    </div>
  )
}

export default ImageStack
