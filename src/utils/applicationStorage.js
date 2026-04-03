const APPLICATIONS_STORAGE_KEY = 'job-portal-applications'
export const APPLICATIONS_UPDATED_EVENT = 'applications:updated'

const isBrowser = typeof window !== 'undefined'

export const getStoredApplications = () => {
  if (!isBrowser) return []

  try {
    const storedValue = window.localStorage.getItem(APPLICATIONS_STORAGE_KEY)
    if (!storedValue) return []

    const parsedValue = JSON.parse(storedValue)
    return Array.isArray(parsedValue) ? parsedValue : []
  } catch {
    return []
  }
}

export const saveApplication = (application) => {
  if (!isBrowser) return []

  const currentApplications = getStoredApplications()
  const nextApplications = [application, ...currentApplications.filter((item) => item.id !== application.id)]

  window.localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(nextApplications))
  window.dispatchEvent(new CustomEvent(APPLICATIONS_UPDATED_EVENT, { detail: nextApplications }))
  return nextApplications
}
