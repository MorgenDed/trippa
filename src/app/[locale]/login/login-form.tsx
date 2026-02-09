'use client'

import React, { useActionState } from 'react'
import { cn } from '@/lib/utils'
import { login, signup } from './actions'
import { Loader2, Facebook } from 'lucide-react'

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  )
}

const IconGoogle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
    />
  </svg>
)

export function LoginForm({ locale }: { locale: string }) {
  const [loginState, loginAction, isLoginPending] = useActionState(async (_prev: any, formData: FormData) => {
    return await login(formData)
  }, null)

  const [signupState, signupAction, isSignupPending] = useActionState(async (_prev: any, formData: FormData) => {
    return await signup(formData)
  }, null)

  const [isLoginMode, setIsLoginMode] = React.useState(true)

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {isLoginMode ? 'Access Your Tripper Account' : 'Join the Tripper Community'}
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {isLoginMode ? 'Login to manage your bookings' : 'Sign up to start exploring'}
      </p>

      <form action={isLoginMode ? loginAction : signupAction} className="my-8">
        <input type="hidden" name="locale" value={locale} />
        
        <div className="flex flex-col space-y-4">
          <LabelInputContainer>
            <label htmlFor="email" className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              required
              className="flex h-10 w-full rounded-md border border-input bg-gray-50 dark:bg-zinc-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-neutral-800 dark:text-neutral-200 shadow-sm"
            />
          </LabelInputContainer>
          
          <LabelInputContainer>
            <label htmlFor="password" className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
              minLength={6}
              className="flex h-10 w-full rounded-md border border-input bg-gray-50 dark:bg-zinc-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-neutral-800 dark:text-neutral-200 shadow-sm"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] relative group/btn disabled:opacity-70"
            type="submit"
            disabled={isLoginPending || isSignupPending}
          >
            <span className="flex items-center justify-center gap-2">
              {(isLoginPending || isSignupPending) && <Loader2 className="animate-spin h-4 w-4" />}
              {isLoginMode ? 'Login' : 'Sign up'} &rarr;
            </span>
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-row space-x-4">
            <button
              className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
              onClick={() => {
                // TODO: Implement Google login
                window.location.reload()
              }}
            >
              <IconGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
            <button
              className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
              onClick={() => {
                // TODO: Implement Facebook login
                window.location.reload()
              }}
            >
              <Facebook className="h-4 w-4 text-[#1877F2]" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Facebook
              </span>
              <BottomGradient />
            </button>
          </div>

          {(loginState?.error || signupState?.error) && (
            <div className="text-red-500 text-sm text-center mt-2">
              {loginState?.error || signupState?.error}
            </div>
          )}

          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-8">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-cyan-600 hover:underline focus:outline-none"
            >
              {isLoginMode ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}
