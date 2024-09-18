import { cn } from '@/lib/utils'
import { InputHTMLAttributes } from 'react'
import { Control, FieldValues, useController } from 'react-hook-form'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  control: Control<any, any, FieldValues>
  rules?: object
}

const Input = ({
  className,
  type = 'text',
  name,
  control,
  rules,
  placeholder,
  defaultValue = '',
  disabled,
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
    defaultValue,
    disabled
  })

  return (
    <label className="relative flex grow">
      <input
        className={cn(
          'border-input bg-background ring-offset-background placeholder:text-muted-foreground flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70',
          className
        )}
        type={type}
        placeholder={placeholder}
        {...rest}
        {...field}
        disabled={field.disabled || isSubmitting}
      />
      {error && (
        <p className="absolute -bottom-6 right-0 text-xs text-red">
          {error.message}*
        </p>
      )}
    </label>
  )
}
Input.displayName = 'Input'

export { Input }
