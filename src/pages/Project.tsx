import { useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { projects } from '../lib/projects'
import ResearchMethods from '../components/ResearchMethods'
import KeyFindings from '../components/KeyFindings'
import DesignDecision from '../components/DesignDecision'

function normalizeAssetPath(path?: string): string {
  if (!path) return ''
  const normalized = path.replace(/\\/g, '/')
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

/** Split markdown body into sections delimited by ## headings */
function parseSections(body: string): { heading: string; text: string; image?: string; imageAlt?: string; images?: Array<{ url: string; alt: string }> }[] {
  const sections: { heading: string; text: string; image?: string; imageAlt?: string; images?: Array<{ url: string; alt: string }> }[] = []
  const parts = body.split(/^## /m).filter((s) => s.trim())

  for (const part of parts) {
    const lines = part.split(/\r?\n/)
    const heading = lines[0].trim()
    const rest = lines.slice(1).join('\n').trim()

    // Extract all images: ![alt](/path)
    const imgMatches = [...rest.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)]
    const images = imgMatches.map(match => ({
      url: normalizeAssetPath(match[2]),
      alt: match[1] || heading
    }))
    
    // For backward compatibility, set image to first image
    const image = images.length > 0 ? images[0].url : undefined
    const imageAlt = images.length > 0 ? images[0].alt : heading
    
    // Remove image lines from text
    const text = rest.replace(/!\[[^\]]*\]\([^)]+\)\s*/g, '').trim()

    sections.push({ heading, text, image, imageAlt, images })
  }

  return sections
}

export default function Project() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  const [activeSlide, setActiveSlide] = useState(0)
  const [snapPoints, setSnapPoints] = useState<number[]>([])
  const [hasInteracted, setHasInteracted] = useState(false)
  const [autoAdvanceCount, setAutoAdvanceCount] = useState(0)

  if (!project) {
    return <Navigate to="/" replace />
  }

  const sections = project.body ? parseSections(project.body) : []

  // Precompute flip direction for each section so alternation stays correct
  // even when a section (e.g. Research Methods) is forced to a specific side.
  let twoColCounter = 0
  const sectionFlips = sections.map((section) => {
    const heading = section.heading.trim().toLowerCase()
    if (heading === 'overview' && !section.image) return false   // single col
    if (heading === 'research methods') { twoColCounter = 1; return false } // forced left
    return twoColCounter++ % 2 !== 0
  })
  const normalizedMainImage = normalizeAssetPath(project.image)
  const hasCustomMainImage = !!normalizedMainImage && !normalizedMainImage.startsWith('/images/project-')
  const heroImages = useMemo(() => {
    if (project.heroImages && project.heroImages.length > 0) {
      return project.heroImages.map((img) => normalizeAssetPath(img)).filter(Boolean)
    }
    return hasCustomMainImage ? [normalizedMainImage] : []
  }, [project.heroImages, normalizedMainImage, hasCustomMainImage])

  useEffect(() => {
    setActiveSlide(0)
  }, [slug])

  const hasCarousel = heroImages.length > 0
  const canSlide = heroImages.length > 1
  const carouselImages = useMemo(
    () => (canSlide ? [...heroImages, ...heroImages] : heroImages),
    [heroImages, canSlide],
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    containScroll: false,
    dragFree: false,
    skipSnaps: false,
  })

  const goPrev = () => {
    if (!emblaApi) return
    setHasInteracted(true)
    emblaApi.scrollPrev()
  }

  const goNext = () => {
    if (!emblaApi) return
    setHasInteracted(true)
    emblaApi.scrollNext()
  }

  const goTo = (index: number) => {
    if (!emblaApi) return
    setHasInteracted(true)
    emblaApi.scrollTo(index)
  }

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      const snap = emblaApi.selectedScrollSnap()
      setActiveSlide(snap % heroImages.length)
    }

    const onInit = () => {
      setSnapPoints(heroImages.map((_, index) => index))
      onSelect()
    }

    const onPointerDown = () => {
      setHasInteracted(true)
    }

    onInit()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onInit)
    emblaApi.on('pointerDown', onPointerDown)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onInit)
      emblaApi.off('pointerDown', onPointerDown)
    }
  }, [emblaApi, heroImages])

  useEffect(() => {
    setHasInteracted(false)
    setAutoAdvanceCount(0)
    setActiveSlide(0)
  }, [slug])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.scrollTo(0, true)
  }, [emblaApi, slug])

  useEffect(() => {
    if (!emblaApi || !canSlide || hasInteracted || autoAdvanceCount >= 2) return

    const timer = setTimeout(() => {
      emblaApi.scrollNext()
      setAutoAdvanceCount((count) => count + 1)
    }, 2800)

    return () => clearTimeout(timer)
  }, [emblaApi, canSlide, hasInteracted, autoAdvanceCount, activeSlide])

  return (
    <>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <Link
          to="/projects"
          className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors inline-flex items-center gap-1 mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Back to projects
        </Link>

        <span className="text-xs uppercase tracking-widest text-neutral-400 block mb-3">
          {project.category}
        </span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-neutral-500 max-w-2xl leading-relaxed text-justify mb-6">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-neutral-300 text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.ctaUrl && (
          <a
            href={project.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm px-5 py-2.5 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-all font-medium"
          >
            {project.ctaLabel || 'View project'}
          </a>
        )}

        {(project.timeline || project.team || project.role || project.tools) && (
          <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-start gap-x-8 md:gap-x-2 gap-y-2 max-w-4xl">
            {project.timeline && (
              <div className="min-w-[110px]">
                <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-0.5 leading-none">Timeline</p>
                <p className="text-xs font-semibold text-neutral-900 leading-tight">{project.timeline}</p>
              </div>
            )}
            {project.team && (
              <div className="min-w-[110px]">
                <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-0.5 leading-none">Team</p>
                <p className="text-xs font-semibold text-neutral-900 leading-tight">{project.team}</p>
              </div>
            )}
            {project.role && (
              <div className="min-w-[200px]">
                <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-0.5 leading-none">Role</p>
                <p className="text-xs font-semibold text-neutral-900 leading-tight">{project.role}</p>
              </div>
            )}
            {project.tools && (
              <div className="min-w-[150px]">
                <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-0.5 leading-none">Tools</p>
                <p className="text-xs font-semibold text-neutral-900 leading-tight">{project.tools}</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Hero image */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="relative h-[380px] sm:h-[500px] md:h-[580px] overflow-hidden">
          {hasCarousel ? (
            <>
              <div className="h-full overflow-hidden" ref={emblaRef}>
                <div className="flex h-full items-end">
                  {carouselImages.map((img, index) => {
                    const realIndex = index % heroImages.length
                    const isActive = realIndex === activeSlide

                    return (
                    <div
                      key={`${img}-${index}`}
                      className="h-full shrink-0 basis-[84%] sm:basis-[64%] md:basis-[38%] px-2 sm:px-3 md:px-4 flex items-end justify-center"
                    >
                      <img
                        src={img}
                        alt={`${project.title} screen ${realIndex + 1}`}
                        className={`max-w-[260px] sm:max-w-[290px] rounded-[18px] sm:rounded-[22px] object-contain bg-transparent transition-all duration-300 ${
                          isActive
                            ? 'w-full h-[96%] sm:h-[98%] md:h-full opacity-100'
                            : 'w-[86%] h-[80%] sm:h-[84%] md:h-[86%] opacity-70'
                        }`}
                      />
                    </div>
                    )
                  })}
                </div>
              </div>

              {canSlide && (
                <div
                  className={`absolute top-3 right-3 text-[11px] px-2.5 py-1 rounded-full bg-white/80 border border-neutral-200 text-neutral-500 transition-opacity duration-500 ${
                    hasInteracted ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  Drag to explore
                </div>
              )}

              {canSlide && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-neutral-200 text-neutral-700 hover:bg-white"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-neutral-200 text-neutral-700 hover:bg-white"
                  >
                    →
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {snapPoints.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => goTo(index)}
                        aria-label={`Go to image ${index + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${index === activeSlide ? 'bg-neutral-700' : 'bg-neutral-300 hover:bg-neutral-400'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center p-8 h-full flex flex-col items-center justify-center">
              <div className="text-6xl mb-4 opacity-20">
                {project.category === 'Research' ? '🔬' : '📊'}
              </div>
              <p className="text-sm text-neutral-400">{project.title}</p>
              <p className="text-xs text-neutral-400 mt-2">Add heroImages in frontmatter for carousel</p>
            </div>
          )}
        </div>
      </section>

      {/* Content Sections */}
      {sections.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          {sections.map((section, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 gap-8 py-12 border-t border-neutral-200 ${
                !section.image && section.heading.trim().toLowerCase() === 'overview' ? 'md:grid-cols-1' : 'md:grid-cols-2'
              } ${
                sectionFlips[i] ? 'md:[direction:rtl]' : ''
              }`}
            >
              {/* Text side */}
              <div className={`flex flex-col justify-center ${sectionFlips[i] ? 'md:[direction:ltr]' : ''}`}>
                <h3 className="font-serif text-2xl text-neutral-900 mb-4">{section.heading}</h3>
                <div className="prose prose-neutral max-w-none prose-p:text-neutral-500 prose-p:leading-relaxed">
                  <ReactMarkdown>{section.text}</ReactMarkdown>
                </div>
              </div>

              {/* Image side */}
              {!(section.heading.trim().toLowerCase() === 'overview' && !section.image) && (
                <div className={`flex items-center h-full ${sectionFlips[i] ? 'md:[direction:ltr]' : ''}`}>
                  {section.heading.trim().toLowerCase() === 'research methods' ? (
                    <div className="w-full"><ResearchMethods /></div>
                  ) : section.heading.trim().toLowerCase() === 'key findings' ? (
                    <div className="w-full"><KeyFindings /></div>
                  ) : section.heading.trim().toLowerCase() === 'design decision' ? (
                    <div className="w-full"><DesignDecision /></div>
                  ) : (
                    <div
                      className={`rounded-lg flex items-center justify-center overflow-hidden p-3 sm:p-4 md:p-6 ${
                        section.image
                          ? 'bg-transparent'
                          : 'bg-gradient-to-br from-neutral-100 to-neutral-200'
                      }`}
                    >
                      {section.image ? (
                        <img
                          src={section.image}
                          alt={section.imageAlt}
                          className="w-full h-auto max-h-[70vh] object-contain"
                        />
                      ) : (
                        <div className="text-center p-6 min-h-[220px] md:min-h-[280px] flex flex-col items-center justify-center">
                          <p className="text-xs text-neutral-400">{section.heading}</p>
                          <p className="text-xs text-neutral-300 mt-1">Add an image: ![alt](/images/your-image.jpg)</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* More Projects */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-200">
        <h2 className="font-serif text-3xl text-neutral-900 mb-8">More projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects
            .filter((p) => p.slug !== project.slug)
            .map((p) => (
              <Link
                key={p.slug}
                to={`/project/${p.slug}`}
                className="group bg-neutral-50 border border-neutral-200 rounded-lg p-6 hover:bg-neutral-100 transition-colors"
              >
                <span className="text-xs uppercase tracking-widest text-neutral-400">{p.category}</span>
                <h3 className="text-lg text-neutral-800 mt-2 group-hover:text-neutral-900 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">{p.subtitle}</p>
              </Link>
            ))}
        </div>
      </section>
    </>
  )
}
