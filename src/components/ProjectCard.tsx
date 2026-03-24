import { Link } from 'react-router-dom'
import type { ProjectItem } from '../lib/projects'

interface ProjectCardProps {
  project: ProjectItem
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0

  return (
    <Link
      to={`/project/${project.slug}`}
      className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-12 border-b border-neutral-200 last:border-0"
    >
      {/* Text */}
      <div className={`flex flex-col justify-center ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <span className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
          {project.category}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 group-hover:text-neutral-600 transition-colors mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-500 mb-4">{project.subtitle}</p>
        <span className="text-sm text-neutral-400 group-hover:text-neutral-700 transition-colors inline-flex items-center gap-1">
          See more
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </span>
      </div>

      {/* Image */}
      <div className={`overflow-hidden rounded-lg bg-neutral-100 aspect-[4/3] ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <div className="text-center p-6">
              <div className="text-4xl mb-2 opacity-30">
                {project.category === 'Research' ? '🔬' : '📊'}
              </div>
              <p className="text-xs text-neutral-400">{project.title}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
