import React from 'react'
import { Link } from 'react-router-dom'
import { assets, JobCategories } from '../assets/assets'

const Footer = () => {
  const footerLinks = [
    { label: 'Browse jobs', to: '/' },
    { label: 'Applied jobs', to: '/applications' },
  ]

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com', icon: assets.facebook_icon },
    { label: 'Instagram', href: 'https://instagram.com', icon: assets.instagram_icon },
    { label: 'Twitter', href: 'https://twitter.com', icon: assets.twitter_icon },
  ]

  return (
    <footer className="pt-10">
      <div className="w-full">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 text-slate-900 shadow-[0_24px_80px_rgba(59,130,246,0.16)]">
          <div className="border-b border-blue-100 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 px-6 py-8 text-slate-950 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-900/70">
                Career Momentum
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Find opportunities that move your career forward.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-900/80 sm:text-base">
                Discover curated roles, explore trusted companies, and keep your next
                application organized in one place.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-950"
              >
                Explore roles
              </Link>
              <Link
                to="/applications"
                className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/85 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                Track applications
              </Link>
            </div>
          </div>

          <div className="grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_1fr]">
            <div>
              <Link to="/" className="inline-flex items-center">
                <img
                  src={assets.logo}
                  alt="TalentTrack"
                  className="h-10 w-auto rounded-lg bg-white px-3 py-2"
                />
              </Link>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
                TalentTrack helps ambitious professionals discover better roles, connect
                with trusted employers, and stay focused on what matters most in the job
                hunt.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white text-slate-700 shadow-sm transition hover:border-cyan-400 hover:bg-cyan-50"
                    aria-label={social.label}
                  >
                    <img src={social.icon} alt="" className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                Quick Links
              </h3>
              <div className="mt-5 space-y-3">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="block text-sm text-slate-600 transition hover:text-blue-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                Popular Searches
              </h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {JobCategories.slice(0, 6).map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-xs font-medium text-slate-700"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-blue-100 bg-white/80 p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Need support?</p>
                <a
                  href="mailto:support@talenttrack.com"
                  className="mt-2 inline-flex items-center gap-2 text-sm text-blue-700 transition hover:text-cyan-600"
                >
                  <img src={assets.email_icon} alt="" className="h-4 w-4" />
                  support@talenttrack.com
                </a>
                <p className="mt-3 text-xs leading-6 text-slate-500">
                  We are here to help with applications, account access, and hiring
                  questions.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-100 px-6 py-4 text-center text-xs text-slate-500 sm:px-8 sm:text-sm">
            Copyright {new Date().getFullYear()} TalentTrack. Built to help candidates
            find better work, faster.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
