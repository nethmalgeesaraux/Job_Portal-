import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useUser } from '@clerk/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, jobsData } from '../assets/assets'
import { saveApplication } from '../utils/applicationStorage'

const formatSalary = (salary) => `$${salary.toLocaleString()}`

const formatPostedDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const Applyjob = () => {
  const { id } = useParams()
  const { user } = useUser()
  const selectedJob = jobsData.find((job) => job._id === id)
  const defaultFullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.username || ''
  const defaultEmail = user?.primaryEmailAddress?.emailAddress || ''
  const relatedJobs = jobsData
    .filter(
      (job) =>
        job._id !== selectedJob?._id &&
        (job.category === selectedJob?.category || job.location === selectedJob?.location)
    )
    .slice(0, 4)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
  })
  const [touchedFields, setTouchedFields] = useState({
    fullName: false,
    email: false,
  })
  const [resumeFile, setResumeFile] = useState(null)
  const [isApplied, setIsApplied] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'fullName' || name === 'email') {
      setTouchedFields((current) => ({
        ...current,
        [name]: true,
      }))
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] || null
    setResumeFile(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const applicantName = touchedFields.fullName ? formData.fullName : defaultFullName
    const applicantEmail = touchedFields.email ? formData.email : defaultEmail

    saveApplication({
      id: `${selectedJob._id}-${Date.now()}`,
      jobId: selectedJob._id,
      fullName: applicantName,
      email: applicantEmail,
      phone: formData.phone,
      coverLetter: formData.coverLetter,
      resumeName: resumeFile?.name || '',
      appliedAt: new Date().toISOString(),
      jobTitle: selectedJob.title,
      companyName: selectedJob.companyId.name,
      companyImage: selectedJob.companyId.image,
      companyEmail: selectedJob.companyId.email,
      location: selectedJob.location,
      level: selectedJob.level,
      category: selectedJob.category,
      salary: selectedJob.salary,
      status: 'In Review',
    })
    setIsApplied(true)
  }

  if (!selectedJob) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
              Job Not Found
            </p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              This opportunity is no longer available.
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              The job link may have changed or the listing may have been removed.
              Explore other openings and keep your next move going.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to jobs
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main>
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-slate-200 bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.28)]">
            <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100 transition hover:bg-white/15"
                >
                  <img src={assets.left_arrow_icon} alt="" className="h-3 w-3" />
                  Back to opportunities
                </Link>

                <div className="mt-6 flex items-center gap-4">
                  <div className="rounded-2xl bg-white p-4 shadow-lg">
                    <img
                      src={selectedJob.companyId.image}
                      alt={selectedJob.companyId.name}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                      {selectedJob.companyId.name}
                    </p>
                    <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-5xl">
                      {selectedJob.title}
                    </h1>
                  </div>
                </div>

                <p className="mt-6 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
                  This role is a strong fit for candidates who want meaningful ownership,
                  modern tools, and a team that values thoughtful execution.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                    {selectedJob.location}
                  </span>
                  <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">
                    {selectedJob.level}
                  </span>
                  <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100">
                    {selectedJob.category}
                  </span>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                  Quick Snapshot
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                    <img src={assets.money_icon} alt="" className="h-6 w-6 opacity-90" />
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/55">
                      Annual Salary
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatSalary(selectedJob.salary)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                    <img src={assets.person_icon} alt="" className="h-6 w-6 opacity-90" />
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/55">
                      Experience
                    </p>
                    <p className="mt-2 text-2xl font-semibold">{selectedJob.level}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                    <img src={assets.location_icon} alt="" className="h-6 w-6 opacity-90" />
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/55">
                      Work Location
                    </p>
                    <p className="mt-2 text-2xl font-semibold">{selectedJob.location}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                    <img src={assets.suitcase_icon} alt="" className="h-6 w-6 opacity-90" />
                    <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/55">
                      Posted On
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatPostedDate(selectedJob.date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                      Role Overview
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      Everything you need before you apply
                    </h2>
                  </div>
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                    {selectedJob.companyId.email}
                  </span>
                </div>

                <div
                  className="job-description mt-6 max-w-none text-sm leading-7 text-slate-600 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_li]:ml-5 [&_li]:list-decimal [&_li]:pl-1 [&_li]:marker:text-blue-600 [&_ol]:mt-4 [&_ol]:space-y-2 [&_p]:text-sm [&_p]:leading-7 [&_strong]:text-slate-900"
                  dangerouslySetInnerHTML={{ __html: selectedJob.description }}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
                    Team Style
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Collaborative product culture with room to own features end to end.
                  </p>
                </div>
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                    Growth
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Work on production-level projects and sharpen both technical and product thinking.
                  </p>
                </div>
                <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                    Hiring Flow
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Resume review, conversation with the team, then a practical role discussion.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-lg shadow-blue-100/40 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                  Apply Now
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Send your application for {selectedJob.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Add your details, upload your latest resume, and submit your application.
                </p>

                {isApplied ? (
                  <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-sm font-semibold text-emerald-800">
                      Application submitted successfully.
                    </p>
                    <p className="mt-2 text-sm leading-7 text-emerald-700">
                      Your profile has been sent for {selectedJob.title} at{' '}
                      {selectedJob.companyId.name}. We will keep you posted on the next step.
                    </p>
                  </div>
                ) : null}

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-sm font-medium text-slate-700" htmlFor="fullName">
                      Full name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={touchedFields.fullName ? formData.fullName : defaultFullName}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700" htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={touchedFields.email ? formData.email : defaultEmail}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700" htmlFor="phone">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 77 123 4567"
                      required
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700" htmlFor="coverLetter">
                      Why are you a good fit?
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows="5"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      placeholder="Share a short note about your experience, impact, and interest in this role."
                      required
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">Resume</p>
                    <label
                      htmlFor="resume"
                      className="mt-2 flex cursor-pointer items-center gap-4 rounded-3xl border border-dashed border-blue-200 bg-blue-50 px-4 py-4 transition hover:border-blue-400 hover:bg-white"
                    >
                      <img
                        src={resumeFile ? assets.resume_selected : assets.upload_area}
                        alt=""
                        className="h-12 w-12"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {resumeFile ? resumeFile.name : 'Upload your resume'}
                        </p>
                        <p className="mt-1 text-xs leading-6 text-slate-500">
                          PDF, DOC, or DOCX up to 5MB
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                        Choose file
                      </span>
                    </label>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Apply for this job
                  </button>
                </form>
              </div>

              <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                      Similar Roles
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      More opportunities you might like
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {relatedJobs.map((job) => (
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
                            <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                            <span className="text-sm font-medium text-blue-700">
                              {formatSalary(job.salary)}
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

                  {relatedJobs.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                      No related roles available right now. Check back later for more openings.
                    </div>
                  ) : null}
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

export default Applyjob
