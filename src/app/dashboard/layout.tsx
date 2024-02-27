import Link from 'next/link'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row h-full">
      <nav className="border-r-2 w-[200px] p-4 flex flex-col">
        <Link href="/dashboard/571617085">Private</Link>
        <Link href="/dashboard/102914974">Savings</Link>
        <Link href="/dashboard/628664974">Business</Link>
        <Link href="/dashboard/all">All</Link>
      </nav>
      {children}
    </div>
  )
}

export default Layout
