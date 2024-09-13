export type Transaction = {
  id: string
  account_number: number | null
  category: string | null
  date: Date | null
  description: string | null
  mutation: number | null
  note: string | null
  total_amount_after: number | null
  total_amount_before: number | null
}
