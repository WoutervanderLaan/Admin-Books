import classNames from 'classnames'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Control, FieldValues, useController } from 'react-hook-form'

type FilterProps = {
  name: string
  control: Control<FieldValues, any, FieldValues>
  filters: string[]
  setFilters: Dispatch<SetStateAction<string[]>>
}

const Filter = ({ name, control, filters, setFilters }: FilterProps) => {
  const { field } = useController({ control, name })

  useEffect(() => {
    setFilters((prev) => {
      return field.value
        ? [...prev, name]
        : prev.filter((filter) => filter !== name)
    })
  }, [field.value])

  return (
    <label
      className={classNames(
        'flex min-w-[240px] flex-row gap-2 border-b-[1px] transition duration-200',
        { 'border-blue': field.value, 'border-gray': !field.value }
      )}
    >
      <input
        className="w-4 accent-blue-dark"
        type="checkbox"
        {...field}
        defaultChecked={filters.includes(name)}
      />
      <span className="">{`${name.slice(0, 1).toUpperCase()}${name.slice(
        1
      )}`}</span>
    </label>
  )
}

export default Filter
