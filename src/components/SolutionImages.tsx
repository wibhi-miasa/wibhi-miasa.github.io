interface SolutionImagesProps {
  images: Array<{ url: string; alt: string }>
}

export default function SolutionImages({ images }: SolutionImagesProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((img) => (
        <div key={img.url} className="flex flex-col items-center gap-2">
          <img
            src={img.url}
            alt={img.alt}
            className="w-full h-auto rounded-xl object-contain"
          />
          <p className="text-xs text-neutral-500 text-center">{img.alt}</p>
        </div>
      ))}
    </div>
  )
}
