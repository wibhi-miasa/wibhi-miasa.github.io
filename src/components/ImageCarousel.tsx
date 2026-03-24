import useEmblaCarousel from 'embla-carousel-react'
import { useState, useEffect } from 'react'

interface ImageCarouselProps {
  images: Array<{ url: string; alt: string }>
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Carousel viewport with side arrows */}
      <div className="relative">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 border border-neutral-200 shadow-sm text-neutral-600 hover:bg-white transition-colors flex items-center justify-center"
        >
          ←
        </button>

        {/* Frame + viewport */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm p-4 overflow-hidden">
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {images.map((img) => (
                <div key={img.url} className="flex-[0_0_100%] flex items-center justify-center">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-auto max-w-full max-h-96 object-contain rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 border border-neutral-200 shadow-sm text-neutral-600 hover:bg-white transition-colors flex items-center justify-center"
        >
          →
        </button>
      </div>

      {/* Caption + counter */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-neutral-500">{images[activeIndex]?.alt}</p>
        <span className="text-xs text-neutral-400">{activeIndex + 1} / {images.length}</span>
      </div>
    </div>
  )
}
