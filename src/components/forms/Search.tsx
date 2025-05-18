'use client'

import { useAuth } from '@/context/AuthContext'
import { getTransactionsBySearch } from '@/lib/actions/postgres-actions'
import { TSearchForm, searchSchema } from '@/lib/schema/zod'
import { TMonths, months } from '@/lib/types/Months'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import { Input } from '../ui/Input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/Select'

const Search = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const { isAuthenticated } = useAuth()

  const {
    formState: { isSubmitting },
    setValue,
    watch,
    control,
    handleSubmit
  } = useForm<TSearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: searchParams.get('query') || undefined,
      month: (searchParams.get('month') as TMonths) || undefined
    }
  })

  const month = watch('month')
  const searchValue = watch('search')
  const [debouncedSearchValue] = useDebounce(searchValue, 500)

  const handleMonthSelect = (month?: TMonths) => {
    setValue('month', month)
    const newSearchparams = new URLSearchParams(searchParams)

    if (month) newSearchparams.set('month', month.toString())
    if (!month) newSearchparams.delete('month')

    router.replace(`${pathname}?${newSearchparams.toString()}`)
  }

  const fetchTransactions = async ({ search, month }: TSearchForm) => {
    try {
      const data = await getTransactionsBySearch({
        search: search || '',
        dateFilters: month
          ? {
              month,
              year: 2023
            }
          : undefined
      })

      console.log(data.length) // TODO: process data
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const newSearchparams = new URLSearchParams(searchParams)

    if (debouncedSearchValue) newSearchparams.set('query', debouncedSearchValue)
    if (!debouncedSearchValue) newSearchparams.delete('query')

    router.replace(`${pathname}?${newSearchparams.toString()}`)
  }, [debouncedSearchValue])

  useEffect(() => {
    if (month || debouncedSearchValue)
      fetchTransactions({ search: debouncedSearchValue, month })
  }, [month, debouncedSearchValue])

  return (
    <form
      className="flex w-full flex-row justify-between gap-4"
      onSubmit={handleSubmit(fetchTransactions)}
    >
      <Input
        name="search"
        control={control}
        defaultValue={searchParams.get('query') || undefined}
        placeholder="Search for transactions"
        disabled={isSubmitting || !isAuthenticated}
      />

      <Select
        name="month"
        onValueChange={(month: TMonths) => handleMonthSelect(month)}
        defaultValue={searchParams.get('month') || undefined}
        disabled={isSubmitting || !isAuthenticated}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {months.map((month, i) => (
              <SelectItem value={month} key={i}>
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </form>
  )
}

export default Search
