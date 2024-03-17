'use client'

import budgets from '@/../public/budgets.json'
import { transactions } from '@prisma/client'
import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const BarChart = ({
  data,
  showTarget = true
}: {
  data: transactions[]
  showTarget?: boolean
}) => {
  const chartData = budgets.map((budget) => {
    const amount = data.reduce((acc, cur) => {
      if (cur.category?.includes(budget.id)) {
        return acc + Number(cur.mutation)
      }
      return acc
    }, 0)

    return {
      targetAmount: budget.value,
      name: budget.id,
      amount: Math.abs(amount)
    }
  })

  return (
    <ResponsiveContainer width={500} height={300}>
      <RechartsBarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray={'3 3'} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        {showTarget && (
          <Bar
            className="fill-red-500"
            dataKey="targetAmount"
            fill="#E0E0E0"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        )}
        <Bar
          dataKey="amount"
          fill="#46A4E9"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export default BarChart
