'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import classNames from 'classnames'
import { ReactNode } from 'react'

const button = cva(
  'flex flex-row text-white rounded-md transition-all active:scale-90 font-normal disabled:opacity-50 hover:scale-110',
  {
    variants: {
      intent: {
        primary: [
          'bg-gradient-to-r',
          'from-blue',
          'to-blue-light',
          'active:from-blue-dark',
          'active:to-blue'
        ],
        secondary: [
          'bg-gradient-to-r',
          'from-red',
          'to-red-light',
          'active:from-red-dark',
          'active:to-red'
        ]
      },
      size: {
        small: ['text-sm', 'px-2', 'py-[2px]'],
        medium: ['px-4', 'py-2'],
        large: ['text-xl', 'py-2', 'px-6']
      }
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium'
    }
  }
)

type ButtonProps = {
  onClick?: () => void
  children: ReactNode
  isDisabled?: boolean
  icon?: ReactNode
  type?: 'button' | 'submit'
  className?: string
} & VariantProps<typeof button>

const Button = ({
  intent,
  size,
  type = 'button',
  onClick = () => null,
  children,
  icon,
  isDisabled = false,
  className
}: ButtonProps) => (
  <button
    disabled={isDisabled}
    type={type}
    className={classNames(button({ intent, size }), className)}
    onClick={onClick}
  >
    {children}
    {icon && <div className="translate-x-1">{icon}</div>}
  </button>
)

export default Button
