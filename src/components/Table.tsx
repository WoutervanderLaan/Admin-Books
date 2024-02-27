import { ReactNode } from 'react'
import classNames from 'classnames'

const Table = ({ children }: { children: ReactNode }) => (
  <table>{children}</table>
)

const TableHead = ({ children }: { children: ReactNode }) => (
  <thead>{children}</thead>
)

const TableBody = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => <tbody className={className}>{children}</tbody>

const TableHeadCell = ({ children }: { children: ReactNode }) => (
  <th className="p-2">{children}</th>
)

const TableRow = ({
  children,
  id,
  onClick,
  className
}: {
  children: ReactNode
  id?: string
  onClick?: () => void
  className?: string
}) => (
  <tr
    id={id}
    onClick={onClick}
    className={classNames(
      'cursor-pointer hover:shadow-lg active:bg-gray',
      className
    )}
  >
    {children}
  </tr>
)

const TableCell = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => (
  <td
    className={classNames(
      'border-2 p-2 overflow-x-scroll whitespace-nowrap max-w-[500px]',
      className
    )}
  >
    {children}
  </td>
)

Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.HeadCell = TableHeadCell
Table.Cell = TableCell

export default Table
