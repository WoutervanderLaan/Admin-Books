import { Control, FieldValues, useController } from 'react-hook-form'

type SearchFieldProps = {
  control: Control<FieldValues, any, FieldValues>
  name: string
  placeholder: string
  isDisabled?: boolean
}

const SearchField = ({
  name,
  control,
  placeholder,
  isDisabled = false
}: SearchFieldProps) => {
  const { field } = useController({ control, name, defaultValue: '' })

  return (
    <input
      disabled={isDisabled}
      placeholder={placeholder}
      {...field}
      className="min-w-[400px] grow rounded-md border-2 border-black p-2 outline-none transition-colors duration-200 ease-in-out focus:border-blue-light disabled:opacity-50"
    />
  )
}

export default SearchField
