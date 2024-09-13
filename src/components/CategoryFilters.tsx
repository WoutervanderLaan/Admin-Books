'use client'

import { getTransactionCategories } from '@/lib/actions/postgres-actions'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import Select from './Select'

type TFilterSelect = {
  categories: string[]
  register: UseFormRegister<FieldValues>
  isDisabled?: boolean
}

const Filters = (props: Omit<TFilterSelect, 'categories'>) => {
  'use server '
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getTransactionCategories()
      const set = Array.from(new Set(data))
      setCategories(set)
    }
    fetchCategories()
  }, [])

  return <FiltersSelect categories={categories} {...props} />
}

const FiltersSelect = ({ categories, register, isDisabled }: TFilterSelect) => {
  const searchParams = useSearchParams()

  return (
    <Select
      name="filters"
      register={register}
      // multiple
      defaultValue={searchParams.get('filters') || ''}
      placeholder="Select filters"
      isDisabled={isDisabled}
    >
      {categories.map((category, i) => (
        <Select.Option value={category} key={i} />
      ))}
    </Select>
  )
}

export default Filters
