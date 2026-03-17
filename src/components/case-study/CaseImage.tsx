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
  const useNaturalRatio = aspectRatio == null;

  return (
    <div
      className={[
        "w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800/50",
        useNaturalRatio ? "" : "relative",
        rounded ? "rounded-2xl" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={useNaturalRatio ? undefined : { aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={
          useNaturalRatio
            ? "block w-full h-auto"
            : "absolute inset-0 size-full object-cover"
        }
      />
    </div>
  );
}

export default CaseImage;
