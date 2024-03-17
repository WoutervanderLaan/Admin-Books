import Card from '@/components/Card'
import BarChart from '@/components/layouts/charts/BarChart'
import LineChart from '@/components/layouts/charts/LineCharts'
import PieChart from '@/components/layouts/charts/PieChart'
import { getTransactionsByMonth } from '@/lib/actions/postgres-actions'

const Dashboard = async () => {
  const data = await getTransactionsByMonth('march', 2023)

  return (
    <div className="container flex h-full flex-col gap-6 px-10 py-4">
      <div className="flex flex-row gap-6">
        <Card className="grow">
          <span className="text-gray-dark">Total expenses</span>
          <div className="flex flex-col py-10">
            <span className="text-4xl font-medium">
              <span className="align-top text-2xl">€</span>1244.78
            </span>
          </div>
        </Card>
        <Card className="grow">
          <span className="text-gray-dark">Total income</span>
          <div className="flex flex-col py-10">
            <span className="text-4xl font-medium">
              <span className="align-top text-2xl">€</span>
              {data
                .reduce((acc, cur) => {
                  if (cur.category?.includes('income'))
                    return acc + Number(cur.mutation)
                  return acc
                }, 0)
                .toFixed(2)}
            </span>
          </div>
        </Card>
        <Card className="grow">
          <span className="text-gray-dark">Total expenses</span>
          <div className="flex flex-col py-10">
            <span className="text-4xl font-medium">
              <span className="align-top text-2xl">€</span>1244.78
            </span>
          </div>
        </Card>
        <Card className="grow">
          <span className="text-gray-dark">Total income</span>
          <div className="flex flex-col py-10">
            <span className="text-4xl font-medium">
              <span className="align-top text-2xl">€</span>3404.34
            </span>
          </div>
        </Card>
        <Card className="grow">
          <span className="text-gray-dark">Total income</span>
          <div className="flex flex-col py-10">
            <span className="text-4xl font-medium">
              <span className="align-top text-2xl">€</span>3404.34
            </span>
          </div>
        </Card>
      </div>

      <div className="flex flex-row gap-6">
        <Card className="grow">
          <BarChart data={data} showTarget={true} />
        </Card>

        <Card className="grow">
          <PieChart data={data} />
        </Card>
      </div>

      <LineChart data={data} />
    </div>
  )
}

export default Dashboard
