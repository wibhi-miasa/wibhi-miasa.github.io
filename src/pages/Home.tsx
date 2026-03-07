import { Link } from 'react-router-dom'
import { personalInfo, projects } from '../data/portfolio'
import ProjectCard from '../components/ProjectCard'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-sm text-neutral-500 mb-4 tracking-wide">
            I'm {personalInfo.name.split(' ')[0]},
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-neutral-100 max-w-3xl mb-6">
            computer science graduate and builder of intelligent systems.
          </h1>
          <p className="text-neutral-400 max-w-xl text-lg leading-relaxed mb-8">
            I'm passionate about understanding how different areas of CS intersect —
            from formal verification to machine learning — to create meaningful connections and solutions.
          </p>
          <div className="flex gap-4">
            <Link
              to="/about"
              className="text-sm px-5 py-2.5 border border-neutral-700 rounded-full text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all"
            >
              About me
            </Link>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-5 py-2.5 bg-white text-neutral-950 rounded-full hover:bg-neutral-200 transition-all font-medium"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="border-t border-neutral-800/50 pt-4 mb-8">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500">Selected Projects</h2>
        </div>

        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-neutral-900 rounded-2xl p-8 md:p-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-100 mb-4">
            Let's collaborate
          </h2>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">
            If you'd like to discuss research, machine learning, or software engineering — feel free to reach out.
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-block text-sm px-6 py-3 bg-white text-neutral-950 rounded-full hover:bg-neutral-200 transition-all font-medium"
          >
            Get in touch
          </a>
        </div>
      </section>
    </>
  )
}
