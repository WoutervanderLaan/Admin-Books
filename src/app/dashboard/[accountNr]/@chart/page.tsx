import budgets from '@/../public/budgets.json'
import Chart from '@/components/Chart'
import { getTransactionsByAccount } from '@/lib/actions/postgres-actions'

const ChartPage = async ({ params }: { params: { accountNr: string } }) => {
  const data = await getTransactionsByAccount(params.accountNr)

  const chartData = budgets.map((budget) => {
    const amount = data.reduce((acc, cur) => {
      if (cur.category?.includes(budget.id)) {
        return acc + Number(cur.mutation)
      }
      return acc
    }, 0)

    return { targetAmount: budget.value, name: budget.id, amount }
  })

  return <div>chart page</div>
}

export default ChartPage
