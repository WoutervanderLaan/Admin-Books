import { FieldValues, UseFormRegister } from 'react-hook-form'

type TSearchField = {
  name: string
  placeholder: string
  isDisabled?: boolean
  register: UseFormRegister<FieldValues>
  defaultValue?: string
}

const SearchField = ({
  name,
  placeholder,
  isDisabled = false,
  defaultValue,
  register
}: TSearchField) => {
  return (
    <input
      disabled={isDisabled}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...register(name)}
      className="min-w-[400px] grow rounded-md border-2 border-black p-2 outline-none transition-colors duration-200 ease-in-out focus:border-blue-light disabled:opacity-50"
    />
  )
}

export default SearchField
