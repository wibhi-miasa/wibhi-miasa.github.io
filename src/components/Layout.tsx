import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { personalInfo } from '../data/portfolio'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-lg font-medium tracking-tight hover:text-neutral-300 transition-colors">
            {personalInfo.name}
          </Link>
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'}`
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'}`
              }
            >
              About
            </NavLink>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <p className="text-sm text-neutral-400 mb-4">
                I'm dedicated to building meaningful systems through a multidisciplinary approach to computer science.
              </p>
              <Link to="/about" className="text-sm text-neutral-300 hover:text-white transition-colors underline underline-offset-4">
                Discover my skills and passions
              </Link>
            </div>
            <div className="flex gap-6 text-sm">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Email
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <p className="text-xs text-neutral-600 mt-8">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
