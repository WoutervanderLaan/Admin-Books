'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LoginIcon from '../icons/Login'
import LogoutIcon from '../icons/Logout'
import Button from './Button'
import Search from './forms/Search'

export const Header = () => {
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()

  return (
    <header>
      <div className="flex w-full flex-row items-center justify-between gap-20 rounded-b-xl bg-white px-5 py-6">
        <div className="flex cursor-pointer flex-row items-center gap-8">
          <Link href={'/'}>
            <h1 className="text-xl">BOOKS</h1>
          </Link>
        </div>

        <Search />

        <div className="flex flex-row items-center gap-4">
          {isAuthenticated && (
            <Button intent="secondary" onClick={logout} icon={<LogoutIcon />}>
              Log out
            </Button>
          )}

          {!isAuthenticated && (
            <Button onClick={() => router.push('/login')} icon={<LoginIcon />}>
              Log in
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
