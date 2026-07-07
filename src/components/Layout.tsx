import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { personalInfo } from '../data/portfolio'
import { useEffect, useState } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const onProjectDetail = location.pathname.startsWith('/project/')

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinkClass = (isActive: boolean) =>
    `text-sm transition-colors ${isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-800'}`

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-lg font-medium tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors">
            {personalInfo.name}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) => navLinkClass(isActive || onProjectDetail)}
            >
              Projects
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => navLinkClass(isActive)}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => navLinkClass(isActive)}>
              Contact
            </NavLink>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white/95 backdrop-blur-md px-6 py-4 flex flex-col gap-5">
            <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) => navLinkClass(isActive || onProjectDetail)}
            >
              Projects
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => navLinkClass(isActive)}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => navLinkClass(isActive)}>
              Contact
            </NavLink>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <p className="text-sm text-neutral-500 mb-4">
                I'm dedicated to building meaningful systems through a multidisciplinary approach to computer science.
              </p>
              <Link to="/about" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors underline underline-offset-4">
                Discover my skills and passions
              </Link>
            </div>
            <div className="flex gap-6 text-sm">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Email
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <p className="text-xs text-neutral-400 mt-8">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
