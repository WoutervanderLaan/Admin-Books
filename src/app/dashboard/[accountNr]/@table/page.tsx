import Table from '@/components/Table'
import { getTransactionsByAccount } from '@/lib/actions/postgres-actions'
import classNames from 'classnames'

const TablePage = async ({ params }: { params: { accountNr: string } }) => {
  const data = await getTransactionsByAccount(params.accountNr)

  return <div>table page</div>
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>AccountNr</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Mutation</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Saldo before</Table.HeadCell>
          <Table.HeadCell>Saldo After</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.map((transaction, i) => (
          <Table.Row
            key={i}
            className={classNames({
              'bg-green': Number(transaction.mutation) > 0
            })}
          >
            <Table.Cell>{Number(transaction.account_number)}</Table.Cell>

            <Table.Cell
              className={classNames({
                'bg-red-light': !transaction.category
              })}
            >
              {transaction.category || 'unknown'}
            </Table.Cell>
            <Table.Cell>{Number(transaction.mutation)}</Table.Cell>
            <Table.Cell>
              {new Date(String(transaction.date)).getDate()}
            </Table.Cell>
            <Table.Cell>{Number(transaction.total_amount_before)}</Table.Cell>
            <Table.Cell>{Number(transaction.total_amount_after)}</Table.Cell>
            <Table.Cell>{transaction.description}</Table.Cell>
          </Table.Row>
        ))}
        <Table.Row>
          <Table.Cell>Total:</Table.Cell>
          <Table.Cell>
            {data
              .reduce((acc, cur) => {
                return acc + Number(cur.mutation)
              }, 0)
              .toFixed(2)}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default TablePage
