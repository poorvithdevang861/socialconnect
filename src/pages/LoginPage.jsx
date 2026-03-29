import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  setAuthenticated,
  setOnboardingComplete,
} from '../utils/onboarding'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    setAuthenticated(true)
    setOnboardingComplete(false)
    navigate('/interests', { replace: true })
  }

  const handleGuest = () => {
    setAuthenticated(true)
    setOnboardingComplete(false)
    navigate('/interests', { replace: true })
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-background-light p-4 md:p-8">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 grid w-full max-w-[1100px] grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="hidden flex-col gap-6 pr-12 lg:flex">
          <div className="flex items-center gap-3 text-primary">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white">
              <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-background-dark">CauseConnect</h1>
          </div>
          <h2 className="text-5xl font-black leading-[1.1] text-background-dark">
            Volunteer local.
            <br />
            <span className="text-primary">Impact global.</span>
          </h2>
          <p className="max-w-md text-lg text-background-dark/70">
            Discover verified opportunities, join meaningful events, and grow your community impact
            with people who care.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col">
          <div className="overflow-hidden cc-card cc-card-pad-lg shadow-2xl">
            <div className="mb-8 flex items-center gap-2 text-primary lg:hidden">
              <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
              <span className="text-xl font-bold text-background-dark">CauseConnect</span>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-background-dark">Welcome back</h3>
              <p className="text-background-dark/60">Log in to continue your volunteering journey</p>
            </div>

            <button
              className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-black/10 bg-transparent font-medium text-background-dark transition-all hover:bg-black/5"
              onClick={handleGuest}
              type="button"
            >
              <span className="material-symbols-outlined text-primary">travel_explore</span>
              Continue as Guest
            </button>

            <div className="relative my-8">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-background-dark/40">or continue with email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-background-dark/70">Email Address</label>
                <input
                  className="h-12 w-full rounded-lg border-none bg-background-light px-4 text-[15px] leading-tight text-background-dark placeholder:text-background-dark/35 focus:ring-2 focus:ring-primary"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  type="email"
                  value={email}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-background-dark/70">Password</label>
                <input
                  className="h-12 w-full rounded-lg border-none bg-background-light px-4 text-[15px] leading-tight text-background-dark placeholder:text-background-dark/35 focus:ring-2 focus:ring-primary"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  type="password"
                  value={password}
                />
              </div>
              <button
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                type="submit"
              >
                Log In
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </form>

            <div className="mt-8 text-center text-sm">
              <p className="text-background-dark/60">
                Don&apos;t have an account?{' '}
                <Link className="font-bold text-primary hover:underline" to="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
