import React, { useContext } from 'react'
import { AppContext } from '../contexts/Appcontext'
import { JobCategories, JobLocations, jobsData } from '../assets/assets'

const JobList = () => {
  const { searchFilter, isSearched } = useContext(AppContext)

  const getCategoryCount = (category) =>
    jobsData.filter((job) => job.category === category).length

  const getLocationCount = (location) =>
    jobsData.filter((job) => job.location === location).length

  return (
    <section className="px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-lg lg:sticky lg:top-6 lg:max-w-[280px]">
          <div className="border-b border-slate-200 pb-5">
            <h3 className="text-base font-semibold text-slate-900">Current Search</h3>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md border border-cyan-400 bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700">
                {isSearched && searchFilter.title ? searchFilter.title : 'Full stack'}
              </span>
              <span className="rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700">
                {isSearched && searchFilter.location ? searchFilter.location : 'Bangalore'}
              </span>
            </div>
          </div>

          <div className="pt-5">
            <h4 className="text-sm font-semibold text-slate-900">
              Search by Categories
            </h4>

            <div className="mt-4 space-y-3">
              {JobCategories.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
                >
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
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
              {JobLocations.map((location) => (
                <label
                  key={location}
                  className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
                >
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  <span>
                    {location} ({getLocationCount(location)})
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-h-[420px] flex-1 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
          Job cards area
        </div>
      </div>
    </section>
  )
}

export default JobList
