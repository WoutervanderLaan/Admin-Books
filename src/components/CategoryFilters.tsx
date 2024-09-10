'use client'

import { getTransactionCategories } from '@/lib/actions/postgres-actions'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Control, FieldValues } from 'react-hook-form'
import Button from './Button'
import Filter from './Filter'
import Overlay from './Overlay'

const CategoryFilters = ({
  control,
  setFilters,
  filters,
  isDisabled = false
}: {
  control: Control<FieldValues, any, FieldValues>
  filters: string[]
  setFilters: Dispatch<SetStateAction<string[]>>
  isDisabled?: boolean
}) => {
  const [areFiltersOpen, setAreFiltersOpen] = useState(false)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getTransactionCategories()
      const set = Array.from(new Set(data))
      setCategories(set)
    }
    fetchCategories()
  }, [])

  return (
    <>
      <Button
        isDisabled={isDisabled}
        className="h-fit self-center"
        onClick={() => setAreFiltersOpen(true)}
      >
        Filters
      </Button>
      {areFiltersOpen && (
        <Overlay onClose={() => setAreFiltersOpen(false)}>
          <div className="flex flex-col gap-2 overflow-y-auto pr-10">
            {categories.map((category, i) => (
              <Filter
                key={i}
                control={control}
                name={category}
                filters={filters}
                setFilters={setFilters}
              />
            ))}
          </div>
        </Overlay>
      )}
    </>
  )
}

export default CategoryFilters
