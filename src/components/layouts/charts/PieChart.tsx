'use client'

import budgets from '@/../public/budgets.json'
import { Transaction } from '@/lib/types/Transaction'
import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts'

const PieChart = ({ data }: { data: Transaction[] }) => {
  const chartData = budgets.map((budget) => {
    const amount = data.reduce((acc, cur) => {
      if (cur.category?.includes(budget.id)) {
        return acc + Number(cur.mutation)
      }
      return acc
    }, 0)

    return {
      color: budget.color,
      name: budget.id,
      value: Math.abs(Number(amount.toFixed(2)))
    }
  })

  return (
    <ResponsiveContainer width={500} height={300}>
      <RechartsPieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#46A4E9"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip />
        <Legend color="#000" />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

export default PieChart
