type CaseImageProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  rounded?: boolean;
  priority?: boolean;
  className?: string;
};

function CaseImage({
  src,
  alt,
  aspectRatio,
  rounded = true,
  priority = false,
  className,
}: CaseImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className={[
        "block w-full h-auto",
        aspectRatio ? "object-cover" : "",
        rounded ? "rounded-2xl" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={aspectRatio ? { aspectRatio } : undefined}
    />
  );
}

export default CaseImage;
