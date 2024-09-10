'use client'

import { useAuth } from '@/context/AuthContext'
import { months } from '@/helpers/date-helpers'
import { getTransactionsBySearch } from '@/lib/actions/postgres-actions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import CategoryFilters from '../CategoryFilters'
import SearchField from '../Searchfield'

const Search = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [filters, setFilters] = useState<string[]>([])
  const [month, setMonth] = useState<keyof typeof months | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  const { control, watch } = useForm()

  const searchValue = watch('searchBar')
  const [debouncedSearchValue] = useDebounce(searchValue, 500)

  const newSearchparams = new URLSearchParams(searchParams)

  const handleSearch = (value: string | undefined) => {
    if (value) newSearchparams.set('query', value)
    if (!value) newSearchparams.delete('query')

    router.replace(`${pathname}?${newSearchparams.toString()}`)
  }

  const handleMonthSelect = (month: keyof typeof months | null) => {
    if (month) newSearchparams.set('month', month)
    if (!month) newSearchparams.delete('month')

    router.replace(`${pathname}?${newSearchparams.toString()}`)
  }

  const handleFilters = (filters: Array<string>) => {
    if (filters.length) newSearchparams.set('filters', filters.join('%'))
    if (!filters.length) newSearchparams.delete('filters')

    router.replace(`${pathname}?${newSearchparams.toString()}`)
  }

  const fetchTransactions = async () => {
    setIsLoading(true)
    const data = await getTransactionsBySearch({
      search: debouncedSearchValue,
      dateFilters: !!newSearchparams.get('month')
        ? {
            month: newSearchparams.get('month') as keyof typeof month,
            year: 2023
          }
        : undefined,
      categoryFilters: filters
      // account: '571617085'
    })
    console.log(data.length)
    setIsLoading(false)
  }

  useEffect(() => {
    if (!!newSearchparams.toString()) fetchTransactions()
  }, [newSearchparams.toString()])

  useEffect(() => {
    handleSearch(debouncedSearchValue)
  }, [debouncedSearchValue])

  useEffect(() => {
    handleMonthSelect(month)
  }, [month])

  useEffect(() => {
    handleFilters(filters)
  }, [filters.length])

  return (
    <div className="flex grow flex-row gap-4">
      <SearchField
        isDisabled={!isAuthenticated}
        control={control}
        name="searchBar"
        placeholder="Search for transactions"
      />
      <CategoryFilters
        isDisabled={isLoading || !isAuthenticated}
        control={control}
        filters={filters}
        setFilters={setFilters}
      />

      <select
        disabled={isLoading || !isAuthenticated}
        className="rounded-md border-2 p-2 disabled:opacity-50"
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

      <select
        disabled={isLoading || !isAuthenticated}
        className="rounded-md border-2 p-2 disabled:opacity-50"
      >
        <option>2023</option>
      </select>
    </div>
  )
}

export default Search
