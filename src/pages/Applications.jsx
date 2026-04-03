import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, jobsApplied, jobsData } from '../assets/assets'
import {
  APPLICATIONS_UPDATED_EVENT,
  getStoredApplications,
} from '../utils/applicationStorage'

const formatCurrency = (salary) => `$${salary.toLocaleString()}`

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const statusClasses = {
  Accepted: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Rejected: 'border-rose-200 bg-rose-50 text-rose-700',
  Pending: 'border-amber-200 bg-amber-50 text-amber-700',
  'In Review': 'border-blue-200 bg-blue-50 text-blue-700',
}

const Applications = () => {
  const { user } = useUser()
  const [storedApplications, setStoredApplications] = useState([])

  useEffect(() => {
    const syncApplications = () => {
      setStoredApplications(getStoredApplications())
    }

    const handleApplicationsUpdated = (event) => {
      if (Array.isArray(event.detail)) {
        setStoredApplications(event.detail)
        return
      }

      syncApplications()
    }

    syncApplications()
    window.addEventListener('storage', syncApplications)
    window.addEventListener(APPLICATIONS_UPDATED_EVENT, handleApplicationsUpdated)

    return () => {
      window.removeEventListener('storage', syncApplications)
      window.removeEventListener(APPLICATIONS_UPDATED_EVENT, handleApplicationsUpdated)
    }
  }, [])

  const recentApplications = useMemo(() => {
    if (storedApplications.length > 0) {
      return storedApplications
    }

    return jobsApplied.map((application, index) => {
      const matchingJob = jobsData.find((job) => job.title === application.title)

      return {
        id: `sample-${index}`,
        jobId: matchingJob?._id || '',
        fullName:
          [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
          user?.username ||
          'Candidate',
        email: user?.primaryEmailAddress?.emailAddress || 'candidate@talenttrack.dev',
        phone: '+94 77 123 4567',
        coverLetter: 'Interested in contributing with strong product thinking and execution.',
        resumeName: 'resume.pdf',
        appliedAt: application.date,
        jobTitle: application.title,
        companyName: application.company,
        companyImage: application.logo,
        companyEmail: 'talent@company.demo',
        location: application.location,
        level: matchingJob?.level || 'Professional',
        category: matchingJob?.category || 'General',
        salary: matchingJob?.salary || 65000,
        status: application.status,
      }
    })
  }, [storedApplications, user])

  const summary = useMemo(() => {
    const total = recentApplications.length
    const shortlisted = recentApplications.filter((item) => item.status === 'Accepted').length
    const inReview = recentApplications.filter(
      (item) => item.status === 'Pending' || item.status === 'In Review'
    ).length
    const rejected = recentApplications.filter((item) => item.status === 'Rejected').length

    return { total, shortlisted, inReview, rejected }
  }, [recentApplications])

  const recommendedJobs = useMemo(() => {
    const appliedJobIds = new Set(recentApplications.map((item) => item.jobId).filter(Boolean))
    return jobsData.filter((job) => !appliedJobIds.has(job._id)).slice(0, 3)
  }, [recentApplications])

  const firstName = user?.firstName || user?.username || 'there'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main>
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.28)]">
            <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  Application Hub
                </p>
                <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
                  Keep track of every role you have applied for in one place.
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                  Hi {firstName}, this dashboard gives you a clean snapshot of your active
                  applications, progress, and the next opportunities worth exploring.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                    {summary.total} total applications
                  </span>
                  <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">
                    {summary.inReview} under review
                  </span>
                  <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100">
                    {summary.shortlisted} shortlisted
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">Applied</p>
                  <p className="mt-3 text-3xl font-semibold">{summary.total}</p>
                  <p className="mt-2 text-sm text-white/65">Roles currently tracked in your dashboard.</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">In Review</p>
                  <p className="mt-3 text-3xl font-semibold">{summary.inReview}</p>
                  <p className="mt-2 text-sm text-white/65">Applications waiting on recruiter feedback.</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">Shortlisted</p>
                  <p className="mt-3 text-3xl font-semibold">{summary.shortlisted}</p>
                  <p className="mt-2 text-sm text-white/65">Good momentum. These roles are moving forward.</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/55">Closed</p>
                  <p className="mt-3 text-3xl font-semibold">{summary.rejected}</p>
                  <p className="mt-2 text-sm text-white/65">Helpful signals to refine your next applications.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                      Recent Applications
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      Your current application pipeline
                    </h2>
                  </div>
                  <Link
                    to="/"
                    className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                  >
                    Explore jobs
                  </Link>
                </div>

                <div className="mt-6 space-y-4">
                  {recentApplications.map((application) => (
                    <article
                      key={application.id}
                      className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-5 transition hover:border-blue-200 hover:bg-white"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="rounded-2xl bg-white p-3 shadow-sm">
                            <img
                              src={application.companyImage || assets.company_icon}
                              alt={application.companyName}
                              className="h-10 w-10 object-contain"
                            />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-semibold text-slate-900">
                                {application.jobTitle}
                              </h3>
                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                                  statusClasses[application.status] || statusClasses.Pending
                                }`}
                              >
                                {application.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-slate-500">
                              {application.companyName} / {application.location}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                                {application.level}
                              </span>
                              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                                {application.category}
                              </span>
                              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                                {formatCurrency(application.salary)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="min-w-[180px] rounded-2xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Applied On
                          </p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {application.jobId ? formatDate(application.appliedAt) : application.appliedAt}
                          </p>
                          <p className="mt-3 text-xs leading-6 text-slate-500">
                            Resume: {application.resumeName}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-lg shadow-blue-100/40 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                  Candidate Snapshot
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Ready for the next response
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Applicant</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">
                      {[user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
                        user?.username ||
                        'TalentTrack Candidate'}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {user?.primaryEmailAddress?.emailAddress || 'candidate@talenttrack.dev'}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
                        Best Signal
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {summary.shortlisted > 0
                          ? 'You already have shortlisted roles, so keep your responses quick and polished.'
                          : 'Your profile is active. A few more targeted applications can improve visibility.'}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                        Next Step
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        Keep your resume updated and tailor your note when applying to similar roles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                  Recommended Roles
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Keep the momentum going
                </h2>

                <div className="mt-6 space-y-4">
                  {recommendedJobs.map((job) => (
                    <Link
                      key={job._id}
                      to={`/applyjob/${job._id}`}
                      className="block rounded-3xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-slate-100 p-3">
                          <img
                            src={job.companyId.image}
                            alt={job.companyId.name}
                            className="h-8 w-8 object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-base font-semibold text-slate-900">{job.title}</h3>
                            <span className="text-sm font-medium text-blue-700">
                              {formatCurrency(job.salary)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">
                            {job.companyId.name} / {job.location}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                              {job.level}
                            </span>
                            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                              {job.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Applications
