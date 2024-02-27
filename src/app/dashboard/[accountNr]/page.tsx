import {
  getTransactionCategories,
  getTransactions,
  getTransactionsByAccount
} from '@/lib/actions/postgres-actions'
import { notFound } from 'next/navigation'

const AccountPage = async ({ params }: { params: { accountNr: string } }) => {
  const data =
    params.accountNr === 'all'
      ? await getTransactions()
      : await getTransactionsByAccount(params.accountNr)

  const categories = await getTransactionCategories(params.accountNr)

  if (!data.length) notFound()

  return <div className="p-4 border-2">Account: {params.accountNr}</div>
}

export default AccountPage
