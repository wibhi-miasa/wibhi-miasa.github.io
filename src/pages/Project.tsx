import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { projects } from '../lib/projects'

/** Split markdown body into sections delimited by ## headings */
function parseSections(body: string): { heading: string; text: string; image?: string; imageAlt?: string }[] {
  const sections: { heading: string; text: string; image?: string; imageAlt?: string }[] = []
  const parts = body.split(/^## /m).filter((s) => s.trim())

  for (const part of parts) {
    const lines = part.split(/\r?\n/)
    const heading = lines[0].trim()
    const rest = lines.slice(1).join('\n').trim()

    // Extract image if present: ![alt](/path)
    const imgMatch = rest.match(/!\[([^\]]*)\]\(([^)]+)\)/)
    const image = imgMatch?.[2]
    const imageAlt = imgMatch?.[1] || heading
    // Remove image line from text
    const text = rest.replace(/!\[[^\]]*\]\([^)]+\)\s*/g, '').trim()

    sections.push({ heading, text, image, imageAlt })
  }

  return sections
}

export default function Project() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  const sections = project.body ? parseSections(project.body) : []

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
        <p className="text-lg text-neutral-500 max-w-2xl leading-relaxed mb-6">
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

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm px-5 py-2.5 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-all font-medium"
          >
            View repository
          </a>
        )}
      </section>

      {/* Hero image */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="aspect-video rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center overflow-hidden">
          {project.image && !project.image.includes('/images/project-') ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-8">
              <div className="text-6xl mb-4 opacity-20">
                {project.category === 'Research' ? '🔬' : '📊'}
              </div>
              <p className="text-sm text-neutral-400">{project.title}</p>
              <p className="text-xs text-neutral-400 mt-2">Add your project image at {project.image}</p>
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
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-t border-neutral-200 ${
                i % 2 !== 0 ? 'md:[direction:rtl]' : ''
              }`}
            >
              {/* Text side */}
              <div className={`flex flex-col justify-center ${i % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                <h3 className="font-serif text-2xl text-neutral-900 mb-4">{section.heading}</h3>
                <div className="prose prose-neutral max-w-none prose-p:text-neutral-500 prose-p:leading-relaxed">
                  <ReactMarkdown>{section.text}</ReactMarkdown>
                </div>
              </div>

              {/* Image side */}
              <div className={`${i % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center overflow-hidden">
                  {section.image ? (
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <p className="text-xs text-neutral-400">{section.heading}</p>
                      <p className="text-xs text-neutral-300 mt-1">Add an image: ![alt](/images/your-image.jpg)</p>
                    </div>
                  )}
                </div>
              </div>
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
