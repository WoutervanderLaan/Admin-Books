import { ReactNode } from 'react'

const Layout = ({
  children,
  chart,
  table
}: {
  children: ReactNode
  chart: ReactNode
  table: ReactNode
}) => {
  return (
    <div className="flex flex-col overflow-auto">
      {children}
      {chart}
      {table}
    </div>
  )
}

export default Layout
