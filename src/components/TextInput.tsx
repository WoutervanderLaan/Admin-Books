import classNames from 'classnames'
import React from 'react'
import { Control, useController } from 'react-hook-form'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  type: string
  rules?: Object
  placeholder: string
  control?: Control
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
          'my-4 w-80 border-b-2 border-blue-light px-4 py-2 transition-colors duration-200 ease-in-out focus:border-blue focus:outline-none active:border-blue disabled:cursor-not-allowed disabled:bg-white disabled:opacity-50',
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
