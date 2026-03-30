import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  const trustedCompanies = [
    { name: 'Microsoft', logo: assets.microsoft_logo },
    { name: 'Walmart', logo: assets.walmart_logo },
    { name: 'Accenture', logo: assets.accenture_logo },
    { name: 'Samsung', logo: assets.samsung_logo },
    { name: 'Amazon', logo: assets.amazon_logo },
    { name: 'Adobe', logo: assets.adobe_logo },
  ]

  return (
    <>
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/20 bg-gradient-to-r from-fuchsia-800 via-purple-900 to-slate-950 px-6 py-12 text-center text-white shadow-[0_20px_60px_rgba(76,29,149,0.35)] sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200/90">
            Find Your Next Role
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            Discover Your Dream Job Today
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/75 sm:text-base">
            Explore thousands of job opportunities across various industries and locations. Whether you're a seasoned professional or just starting your career, we have the perfect job waiting for you.
          </p>

          <div className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl sm:flex-row sm:items-center sm:gap-0">
            <div className="flex flex-1 items-center rounded-xl border border-slate-200 px-3 sm:border-0 sm:border-r">
              <img
                src={assets.search_icon}
                alt="Search icon"
                className="h-4 w-4 opacity-60"
              />
              <input
                type="text"
                placeholder="Search for jobs"
                className="w-full bg-transparent p-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-1 items-center rounded-xl border border-slate-200 px-3 sm:border-0 sm:border-r">
              <img
                src={assets.location_icon}
                alt="Location icon"
                className="h-4 w-4 opacity-60"
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-transparent p-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="button"
              className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-lg">
          <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-white/80">
            
          </div>

          <div className="logo-marquee overflow-hidden">
            <div className="logo-track flex w-max items-center gap-4">
              {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex h-16 min-w-[160px] items-center justify-center rounded-2xl border border-white/10 bg-white px-5 shadow-lg shadow-black/10"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-6 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
