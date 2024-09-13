import { ReactNode } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type TSelect = {
  name: string
  register: UseFormRegister<FieldValues>
  children: ReactNode
  isDisabled?: boolean
  defaultValue?: string
  placeholder?: string
  // multiple?: boolean
}

const Select = ({
  name,
  register,
  children,
  isDisabled = false,
  defaultValue = '',
  placeholder
  // multiple
}: TSelect) => {
  return (
    <select
      // multiple={multiple}
      aria-placeholder={placeholder}
      className={
        'appearance-none rounded-md border-2 p-2 outline-none transition-colors duration-200 ease-in-out focus:border-blue-light disabled:opacity-50'
      }
      {...register(name)}
      disabled={isDisabled}
      defaultValue={defaultValue}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  )
}

const Option = ({ value }: { value: string }) => (
  <option value={value}>{value}</option>
)

Select.Option = Option

export default Select
