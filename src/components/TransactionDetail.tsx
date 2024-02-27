import { FormEvent, useState } from 'react'
import Button from './Button'
import Overlay from './Overlay'
import { Transaction } from '../lib/types/Transaction'

const TransactionDetail = ({ data }: { data: Transaction }) => {
  const [category, setCategory] = useState<string | null>(null)
  const [otherValue, setOtherValue] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!data?.id) {
      setError('ID error')
      setTimeout(() => setError(''), 2000)
      setCategory(null)
      setOtherValue(null)
      return
    }

    if (category && otherValue) {
      setError('Categorie error')
      setTimeout(() => setError(''), 2000)
      setCategory(null)
      setOtherValue(null)
      return
    }
  }

  return (
    <Overlay>
      <div className="flex flex-col gap-4 min-w-[480px] ">
        <div>
          <p>ID: {data.id}</p>
          <p>Mutation: {data.mutation}</p>
          <p>Date: {data.date}</p>
          <p>Description: {data.description}</p>
        </div>

        <form
          className="flex flex-col gap-4 border-2 border-black p-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            defaultValue={data.category || 0}
          >
            <option>Select Value:</option>

            {Array.from({ length: 20 }).map((category, i) => (
              <option key={i}>{'test'}</option>
            ))}
          </select>

          <label className="flex gap-2">
            Other:
            <input
              className="border-2"
              name="other"
              onChange={(e) => setOtherValue(e.target.value)}
            />
          </label>
          <Button className="w-fit self-end" type="submit">
            Submit
          </Button>
          {error && <span className="text-red">{error}</span>}
          {success && <span className="text-green">{success}</span>}
        </form>
      </div>
    </Overlay>
  )
}

export default TransactionDetail
