import { personalInfo } from '../data/portfolio'

export default function Contact() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-20">
      <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-4">Contact</h1>
      <p className="text-lg text-neutral-500 max-w-xl leading-relaxed mb-12">
        Feel free to reach out — I'm always happy to connect.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={`mailto:${personalInfo.email}`}
          className="flex items-center gap-3 px-6 py-4 border border-neutral-300 rounded-lg hover:border-neutral-500 hover:bg-neutral-50 transition-all group"
        >
          <svg className="w-5 h-5 text-neutral-400 group-hover:text-neutral-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-0.5">Email</p>
            <p className="text-sm font-medium text-neutral-800">{personalInfo.email}</p>
          </div>
        </a>

        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-4 border border-neutral-300 rounded-lg hover:border-neutral-500 hover:bg-neutral-50 transition-all group"
        >
          <svg className="w-5 h-5 text-neutral-400 group-hover:text-neutral-700 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-0.5">LinkedIn</p>
            <p className="text-sm font-medium text-neutral-800">linkedin.com/in/wibhimiasa</p>
          </div>
        </a>
      </div>
    </section>
  )
}
