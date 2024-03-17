'use client'

import { months } from '@/helpers/date-helpers'
import { getTransactionsBySearch } from '@/lib/actions/postgres-actions'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import CategoryFilters from '../CategoryFilters'
import SearchField from '../Searchfield'

const Search = () => {
  const params = useParams()
  const [filters, setFilters] = useState<string[]>([])
  const [month, setMonth] = useState<keyof typeof months | null>(null)

  const { control, watch } = useForm()

  const searchValue = watch('searchBar')
  const [debouncedSearchValue] = useDebounce(searchValue, 500)

  const fetchTransactions = async (search: string) => {
    const data = await getTransactionsBySearch({
      search,
      dateFilters: month ? { month: month, year: 2023 } : undefined,
      categoryFilters: filters,
      account: params.accountNr as string
    })
    console.log(data)
    return data
  }

  useEffect(() => {
    if (debouncedSearchValue) fetchTransactions(debouncedSearchValue)
  }, [debouncedSearchValue, filters.length, month])

  return (
    <div className="flex flex-row grow gap-4">
      <SearchField
        control={control}
        name="searchBar"
        placeholder="Search for transactions"
      />
      <CategoryFilters
        control={control}
        filters={filters}
        setFilters={setFilters}
      />

      <select
        className="border-2 rounded-md p-2"
        onChange={(e) => setMonth(e.target.value as keyof typeof months)}
      >
        <option />
        {Object.keys(months)
          .filter((e) => !Number(e + 1))
          .map((month, i) => (
            <option key={i} value={month}>
              {month}
            </option>
          ))}
      </select>

      <select className="border-2 rounded-md p-2">
        <option>2023</option>
      </select>
    </div>
  )
}

export default Search
