import classNames from 'classnames'
import React from 'react'
import { Control, useController } from 'react-hook-form'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  type: string
  rules?: Object
  placeholder: string
  control?: Control<{
    [key: string]: string
  }>
  isDisabled?: boolean
}

const Input = ({
  name,
  type,
  placeholder,
  rules,
  control,
  isDisabled,
  ...rest
}: InputProps) => {
  const {
    fieldState: { error },
    field,
    formState: { isSubmitting }
  } = useController({
    name,
    control,
    rules,
    defaultValue: ''
  })

  return (
    <label className="relative m-2">
      <input
        {...field}
        className={classNames(
          'border-b-2 px-4 py-2 border-blue-light my-4 active:border-blue focus:border-blue focus:outline-none transition-colors duration-200 ease-in-out w-80 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white',
          { 'border-red': error }
        )}
        type={type}
        placeholder={placeholder}
        disabled={isSubmitting || isDisabled}
        value={field.value}
        {...rest}
      />
      {error && (
        <p className="absolute bottom-0 right-0 text-xs text-red">
          {error.message}*
        </p>
      )}
    </label>
  )
}

export default Input
