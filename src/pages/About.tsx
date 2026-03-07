import { Link } from 'react-router-dom'
import { personalInfo, skills, experience, projects } from '../data/portfolio'

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-neutral-100 mb-6">
              About me
            </h1>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              {personalInfo.bio}
            </p>
            <p className="text-neutral-400 leading-relaxed whitespace-pre-line">
              {personalInfo.aboutExtended}
            </p>
          </div>

          {/* Portrait placeholder */}
          <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center overflow-hidden">
            <div className="text-center p-8">
              <div className="w-24 h-24 rounded-full bg-neutral-700 mx-auto mb-4 flex items-center justify-center text-3xl">
                👤
              </div>
              <p className="text-xs text-neutral-600">{personalInfo.name}</p>
              <p className="text-xs text-neutral-700 mt-1">{personalInfo.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right now section — matches Figma "Right now I am..." */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-800/50">
        <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-8">Right now I am...</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-neutral-500 mb-1">Listening to:</p>
            <p className="text-sm text-neutral-200">Research podcasts on AI safety</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">Exploring:</p>
            <p className="text-sm text-neutral-200">React & TypeScript full-stack</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">Reading:</p>
            <p className="text-sm text-neutral-200">Papers on LLM reasoning</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">Building:</p>
            <p className="text-sm text-neutral-200">This portfolio website</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-800/50">
        <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-medium text-neutral-200 mb-4">Programming</h3>
            <ul className="space-y-2">
              {skills.programming.map((skill) => (
                <li key={skill} className="text-sm text-neutral-400">{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-200 mb-4">Machine Learning</h3>
            <ul className="space-y-2">
              {skills.ml.map((skill) => (
                <li key={skill} className="text-sm text-neutral-400">{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-200 mb-4">Tools & Workflow</h3>
            <ul className="space-y-2">
              {skills.tools.map((skill) => (
                <li key={skill} className="text-sm text-neutral-400">{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-800/50">
        <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-8">Experience & Education</h2>
        <div className="space-y-8">
          {experience.map((item) => (
            <div key={item.title} className="group">
              <h3 className="text-lg text-neutral-200 mb-1">{item.title}</h3>
              <p className="text-sm text-neutral-500 mb-2">{item.org}</p>
              <p className="text-sm text-neutral-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* More projects */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-800/50">
        <h2 className="font-serif text-3xl text-neutral-100 mb-4">More projects</h2>
        <p className="text-neutral-400 mb-8">
          From formal methods to clinical ML, see the breadth of my work.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className="group bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800/80 transition-colors"
            >
              <span className="text-xs uppercase tracking-widest text-neutral-500">{project.category}</span>
              <h3 className="text-lg text-neutral-200 mt-2 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-neutral-500 mt-1">{project.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
