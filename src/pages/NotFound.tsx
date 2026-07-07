import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { personalInfo } from '../data/portfolio'

export default function NotFound() {
  useEffect(() => {
    document.title = `Not Found — ${personalInfo.name}`
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-20 min-h-[60vh] flex flex-col justify-center">
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4">404</p>
      <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-4">Page not found</h1>
      <p className="text-neutral-500 text-lg mb-8">
        This page doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="self-start text-sm px-5 py-2.5 border border-neutral-300 rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-all"
      >
        Back to home
      </Link>
    </section>
  )
}
