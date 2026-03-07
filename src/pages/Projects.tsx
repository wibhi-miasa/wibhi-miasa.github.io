import { Link } from 'react-router-dom'
import { projects } from '../data/portfolio'

export default function Projects() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-neutral-100 mb-4">Projects</h1>
        <p className="text-neutral-400 text-lg max-w-2xl mb-12">
          A selection of research and engineering work spanning formal methods, machine learning, and software development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className="group bg-neutral-900 rounded-lg overflow-hidden hover:bg-neutral-800/80 transition-colors"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/10] bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-4xl mb-2 opacity-20">
                    {project.category === 'Research' ? '🔬' : '📊'}
                  </div>
                  <p className="text-xs text-neutral-600">{project.title}</p>
                </div>
              </div>

              {/* Text */}
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-neutral-500">
                  {project.category}
                </span>
                <h3 className="text-lg text-neutral-200 mt-2 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">{project.subtitle}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-neutral-700 text-neutral-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
