import React from 'react'
import { SignInButton, UserButton, useUser } from '@clerk/react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ')

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={assets.logo}
            alt="TalentTrack"
            className="h-9 w-auto select-none"
            draggable="false"
          />
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {!isLoaded || !isSignedIn ? (
            <>
            <span className="text-sm font-medium text-slate-500 sm:text-[15px]">
              Recruiter Login
            </span>
            <SignInButton mode="modal">
              <button
                type="button"
                className="min-w-28 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 px-7 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(37,99,235,0.28)] transition hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
            </SignInButton>
            </>
          ) : null}

          {isLoaded && isSignedIn ? (
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <Link to="/applications" className="hover:text-blue-700">
                Applied Jobs
              </Link>
              <p className="text-slate-300">|</p>
              <p className="hidden sm:block">
                Hi, {fullName || user?.username || 'User'}
              </p>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'h-10 w-10'
                  }
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Navbar
