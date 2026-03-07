import { useParams, Link, Navigate } from 'react-router-dom'
import { projects } from '../data/portfolio'

export default function Project() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <Link
          to="/"
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors inline-flex items-center gap-1 mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Back to projects
        </Link>

        <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-3">
          {project.category}
        </span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-100 mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-neutral-700 text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm px-5 py-2.5 bg-white text-neutral-950 rounded-full hover:bg-neutral-200 transition-all font-medium"
          >
            View repository
          </a>
        )}
      </section>

      {/* Hero image */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="aspect-video rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center overflow-hidden">
          <div className="text-center p-8">
            <div className="text-6xl mb-4 opacity-20">
              {project.category === 'Research' ? '🔬' : '📊'}
            </div>
            <p className="text-sm text-neutral-600">{project.title}</p>
            <p className="text-xs text-neutral-700 mt-2">Add your project image at {project.image}</p>
          </div>
        </div>
      </section>

      {/* Details */}
      {project.details && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          {project.details.map((detail, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 ${detail.image ? 'md:grid-cols-2' : ''} gap-8 py-12 border-t border-neutral-800/50`}
            >
              <div className="flex items-center">
                <p className="text-neutral-300 text-lg leading-relaxed">{detail.text}</p>
              </div>
              {detail.image && (
                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-6">
                    <p className="text-xs text-neutral-600">{detail.imageAlt}</p>
                    <p className="text-xs text-neutral-700 mt-1">Add image at {detail.image}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* More Projects */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-800/50">
        <h2 className="font-serif text-3xl text-neutral-100 mb-8">More projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects
            .filter((p) => p.slug !== project.slug)
            .map((p) => (
              <Link
                key={p.slug}
                to={`/project/${p.slug}`}
                className="group bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800/80 transition-colors"
              >
                <span className="text-xs uppercase tracking-widest text-neutral-500">{p.category}</span>
                <h3 className="text-lg text-neutral-200 mt-2 group-hover:text-white transition-colors">
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
