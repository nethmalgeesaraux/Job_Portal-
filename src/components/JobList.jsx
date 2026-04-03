import React, { useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../contexts/Appcontext'
import { jobsData } from '../assets/assets'
import { useClerk, useUser } from '@clerk/react'

const JobList = () => {
  const { searchFilter, isSearched } = useContext(AppContext)
  const { isSignedIn } = useUser()
  const { openSignIn } = useClerk()
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])

  const availableCategories = useMemo(
    () => [...new Set(jobsData.map((job) => job.category))].sort(),
    []
  )

  const availableLocations = useMemo(
    () => [...new Set(jobsData.map((job) => job.location))].sort(),
    []
  )

  const getCategoryCount = (category) =>
    jobsData.filter((job) => job.category === category).length

  const getLocationCount = (location) =>
    jobsData.filter((job) => job.location === location).length

  const normalizeText = (value = '') => value.toLowerCase().trim()

  const stripHtml = (value = '') =>
    value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

  const getExcerpt = (value = '') => {
    const text = stripHtml(value)
    return text.length > 120 ? `${text.slice(0, 120)}...` : text
  }

  const toggleFilter = (value, selectedValues, setSelectedValues) => {
    setSelectedValues((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedLocations([])
  }

  const filteredJobs = jobsData.filter((job) => {
    const matchesTitle =
      !searchFilter.title ||
      normalizeText(job.title).includes(normalizeText(searchFilter.title))

    const matchesLocation =
      !searchFilter.location ||
      normalizeText(job.location).includes(normalizeText(searchFilter.location))

    const matchesSelectedCategory =
      selectedCategories.length === 0 || selectedCategories.includes(job.category)

    const matchesSelectedLocation =
      selectedLocations.length === 0 || selectedLocations.includes(job.location)

    return matchesTitle && matchesLocation && matchesSelectedCategory && matchesSelectedLocation
  })

  const visibleJobs = filteredJobs.slice(0, 6)
  const hasActiveSearch = isSearched && (searchFilter.title || searchFilter.location)
  const hasActiveFilters = selectedCategories.length > 0 || selectedLocations.length > 0

  return (
    <section className="px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-lg lg:sticky lg:top-6 lg:max-w-[280px]">
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-slate-900">Current Search</h3>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 transition hover:text-blue-900"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {hasActiveSearch ? (
                <>
                  {searchFilter.title ? (
                    <span className="rounded-md border border-cyan-400 bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700">
                      {searchFilter.title}
                    </span>
                  ) : null}
                  {searchFilter.location ? (
                    <span className="rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700">
                      {searchFilter.location}
                    </span>
                  ) : null}
                </>
              ) : (
                <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
                  No keyword search yet
                </span>
              )}

              {selectedCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
                  className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                >
                  {category}
                </button>
              ))}

              {selectedLocations.map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() => toggleFilter(location, selectedLocations, setSelectedLocations)}
                  className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-5">
            <h4 className="text-sm font-semibold text-slate-900">
              Search by Categories
            </h4>

            <div className="mt-4 space-y-3">
              {availableCategories.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() =>
                      toggleFilter(category, selectedCategories, setSelectedCategories)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    {category} ({getCategoryCount(category)})
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <h4 className="text-sm font-semibold text-slate-900">Search by Location</h4>

            <div className="mt-4 space-y-3">
              {availableLocations.map((location) => (
                <label
                  key={location}
                  className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
                >
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location)}
                    onChange={() =>
                      toggleFilter(location, selectedLocations, setSelectedLocations)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    {location} ({getLocationCount(location)})
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Latest jobs
            </h2>
            <p className="text-sm text-slate-500">
              Transform words into shining impact with your next career move.
            </p>
            <p className="text-sm font-medium text-blue-700">
              {filteredJobs.length} roles match your search
            </p>
          </div>

          {visibleJobs.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleJobs.map((job) => (
                <article
                  key={job._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={job.companyId.image}
                    alt={job.companyId.name}
                    className="h-10 w-10 rounded-xl object-contain"
                  />

                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {job.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-md border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                      {job.location}
                    </span>
                    <span className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                      {job.level}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {getExcerpt(job.description)}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <Link
                      to={`/applyjob/${job._id}`}
                      onClick={(e) => {
                        if (!isSignedIn) {
                          e.preventDefault()
                          openSignIn({ fallbackRedirectUrl: `/applyjob/${job._id}` })
                        }
                      }}
                      className="inline-flex min-w-[112px] items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Apply now
                    </Link>
                    <Link
                      to={`/applyjob/${job._id}`}
                      onClick={(e) => {
                        if (!isSignedIn) {
                          e.preventDefault()
                          openSignIn({ fallbackRedirectUrl: `/applyjob/${job._id}` })
                        }
                      }}
                      className="inline-flex min-w-[112px] items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                    >
                      Learn more
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              No jobs found for the current search.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default JobList
