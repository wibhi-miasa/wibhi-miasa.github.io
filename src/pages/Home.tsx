import { Link } from 'react-router-dom'
import { personalInfo } from '../data/portfolio'
import { projects } from '../lib/projects'
import ProjectCard from '../components/ProjectCard'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-sm text-neutral-400 mb-4 tracking-wide">
            I'm {personalInfo.name.split(' ')[1]},
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-neutral-900 max-w-3xl mb-6">
            Designing intuitive digital experiences that turn complex technology into meaningful human solutions.
          </h1>
          <p className="text-neutral-500 max-w-xl text-lg leading-relaxed mb-8">
            I’m a UX designer with a background in computer science, focused on transforming ideas into meaningful products. Through research, user journey mapping, and iterative design, I build experiences that solve real problems.
          </p>
          <div className="flex gap-4">
            <Link
              to="/about"
              className="text-sm px-5 py-2.5 border border-neutral-300 rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-all"
            >
              About me
            </Link>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-5 py-2.5 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-all font-medium"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="border-t border-neutral-200 pt-4 mb-8">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400">Projects</h2>
        </div>

        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 md:p-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">
            Let's collaborate
          </h2>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">
            If you'd like to discuss research, machine learning, or software engineering — feel free to reach out.
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-block text-sm px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-all font-medium"
          >
            Get in touch
          </a>
        </div>
      </section>
    </>
  )
}
