'use client'

import Card from '@/components/Card'
import { convertAccountNr } from '@/helpers/accountNr'
import { Transaction } from '@/lib/types/Transaction'
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const LineChart = ({ data }: { data: Transaction[] }) => {
  const chartData = data.reduce(
    (
      acc: { transactions: Transaction[]; account_number: number }[],
      cur: Transaction
    ) => {
      const existingAccount = acc.find(
        (item) => item.account_number === cur.account_number
      )

      if (existingAccount) {
        existingAccount.transactions.push(cur)
      } else {
        acc.push({ transactions: [cur], account_number: cur.account_number! })
      }

      return acc
    },
    []
  )

  return (
    <>
      {chartData.map((account, i) => (
        <Card key={i} className="flex w-full grow flex-col gap-8">
          <span className="text-gray">
            {convertAccountNr(account.account_number.toString())}
          </span>
          <ResponsiveContainer width={'100%'} height={400}>
            <RechartsLineChart
              width={500}
              height={300}
              data={account.transactions.map((t) => ({
                name: t.date,
                balance: Number(t.total_amount_before)
              }))}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis />
              <YAxis />
              <Tooltip />
              <Line
                type="linear"
                dataKey="balance"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </Card>
      ))}
    </>
  )
}

export default LineChart
