'use client'

import { useAuth } from '@/context/AuthContext'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
// import Select from '../Select'
import { getTransactionsBySearch } from '@/lib/actions/postgres-actions'
import { months, searchSchema, TMonths, TSearchForm } from '@/lib/schema/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'

const Search = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const newSearchparams = new URLSearchParams(searchParams)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // const [filters, setFilters] = useState<string[]>([])

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
  // const filters = watch('filters', queryDefaults.filters)

  const [debouncedSearchValue] = useDebounce(searchValue, 500)

  const handleSearch = (value: string | undefined) => {
    if (value) newSearchparams.set('query', value)
    if (!value) newSearchparams.delete('query')

    router.replace(`${pathname}?${newSearchparams.toString()}`)
  }

  const handleMonthSelect = (month?: TMonths) => {
    if (month) newSearchparams.set('month', month.toString())
    if (!month) newSearchparams.delete('month')

    router.replace(`${pathname}?${newSearchparams.toString()}`)
  }

  // const handleFilters = (filters: Array<string>) => {
  //   if (filters.length) newSearchparams.set('filters', filters.join('%'))
  //   if (!filters.length) newSearchparams.delete('filters')

  //   router.replace(`${pathname}?${newSearchparams.toString()}`)
  // }

  const fetchTransactions = async ({ search, month }: TSearchForm) => {
    console.log(search, month)

    try {
      const data = await getTransactionsBySearch({
        search: search || '',
        dateFilters: month
          ? {
              month,
              year: 2023
            }
          : undefined,
        categoryFilters: []
        // account: '571617085'
      })
      console.log(data.length)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleSearch(debouncedSearchValue)
  }, [debouncedSearchValue])

  useEffect(() => {
    handleMonthSelect(month)
  }, [month])

  // useEffect(() => {
  //   handleFilters(filters)
  // }, [filters.length])

  useEffect(() => {
    if (month || debouncedSearchValue)
      fetchTransactions({ search: debouncedSearchValue, month })
  }, [month, debouncedSearchValue])

  return (
    <form
      className="flex w-full flex-row justify-between gap-4"
      ref={formRef}
      onSubmit={handleSubmit(fetchTransactions)}
    >
      <Input
        name="search"
        control={control}
        defaultValue={searchParams.get('query') || undefined}
        placeholder="Search for transactions"
        disabled={isSubmitting || isLoading || !isAuthenticated}
      />

      {/* <Filters
        isDisabled={isSubmitting || isLoading || !isAuthenticated}
        register={register}
      /> */}

      <Select
        name="month"
        onValueChange={(v: TMonths) => setValue('month', v)}
        defaultValue={searchParams.get('month') || undefined}
        disabled={isSubmitting || isLoading || !isAuthenticated}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Months</SelectLabel>

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
