export type Transaction = {
  id?: string
  accountNumber: string | number
  date: string | number
  mutation: number | string
  totalAmountBefore: number | string
  totalAmountAfter: number | string
  description: string
  category: string
  note?: string
}
