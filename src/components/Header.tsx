'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LoginIcon from '../icons/Login'
import LogoutIcon from '../icons/Logout'
import Search from './forms/Search'

export const Header = () => {
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()

  return (
    <header>
      <div className="flex w-full flex-row items-center justify-between gap-20 rounded-b-xl bg-white px-5 py-6">
        <div className="flex cursor-pointer flex-row items-center gap-8">
          <Link
            href={'/'}
            className="ring-offset-background rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <h1 className="text-xl">BOOKS</h1>
          </Link>
        </div>

        <Search />

        <div className="flex flex-row items-center gap-4">
          {isAuthenticated && (
            <Button variant="destructive" onClick={logout}>
              Log out
              <LogoutIcon />
            </Button>
          )}

          {!isAuthenticated && (
            <Button onClick={() => router.push('/login')}>
              Log in
              <LoginIcon />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
