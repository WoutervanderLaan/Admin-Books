'use client'

import { useAuth } from '@/context/AuthContext'
import { months } from '@/helpers/date-helpers'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import Filters from '../CategoryFilters'
import SearchField from '../Searchfield'
import Select from '../Select'

const Search = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const newSearchparams = new URLSearchParams(searchParams)
  const [isLoading, setIsLoading] = useState(false)

  // const [filters, setFilters] = useState<string[]>([])

  const formRef = useRef<HTMLFormElement>(null)

  const {
    formState: { isSubmitting },
    watch,
    register,
    handleSubmit
  } = useForm()

  const queryDefaults = useMemo(
    () => ({
      query: searchParams.get('query'),
      month: searchParams.get('month'),
      filters: searchParams.get('filters')
    }),
    [searchParams.toString()]
  )

  const month = watch('month', queryDefaults.month)
  const searchValue = watch('searchBar', queryDefaults.query)
  const filters = watch('filters', queryDefaults.filters)

  const [debouncedSearchValue] = useDebounce(searchValue, 500)

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

  const fetchTransactions = async (fields: FieldValues) => {
    setIsLoading(true)
    console.log(fields)
    setTimeout(() => setIsLoading(true), 400)

    // try {
    //   const data = await getTransactionsBySearch({
    //     search: debouncedSearchValue,
    //     dateFilters: month
    //       ? {
    //           month: newSearchparams.get('month') as keyof typeof month,
    //           year: 2023
    //         }
    //       : undefined,
    //     categoryFilters: filters
    //     // account: '571617085'
    //   })
    //   console.log(data.length)
    // } catch (err) {
    //   console.log(err)
    // } finally {
    //   setIsLoading(false)
    // }
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

  return (
    <form
      className="flex grow flex-row gap-4"
      ref={formRef}
      onSubmit={handleSubmit(fetchTransactions)}
    >
      <SearchField
        name="searchBar"
        register={register}
        defaultValue={searchParams.get('query') || ''}
        placeholder="Search for transactions"
        isDisabled={isSubmitting || isLoading || !isAuthenticated}
      />

      <Filters
        isDisabled={isSubmitting || isLoading || !isAuthenticated}
        register={register}
      />

      <Select
        name="month"
        register={register}
        defaultValue={searchParams.get('month') || ''}
        placeholder="Select month"
        isDisabled={isSubmitting || isLoading || !isAuthenticated}
      >
        {Object.keys(months)
          .filter((e) => !Number(e + 1))
          .map((month, i) => (
            <Select.Option value={month} key={i} />
          ))}
      </Select>
    </form>
  )
}

export default Search
