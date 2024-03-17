import { VariantProps, cva } from 'class-variance-authority'
import classNames from 'classnames'
import { ReactNode } from 'react'

const card = cva('bg-white h-fit w-fit', {
  variants: {
    size: {
      small: 'p-2 rounded-md',
      medium: 'py-4 px-6 rounded-lg',
      large: 'p-10 rounded-xl'
    }
  },
  defaultVariants: {
    size: 'medium'
  }
})

type CardProps = {
  children: ReactNode
  className?: string
} & VariantProps<typeof card>

const Card = ({ children, size, className }: CardProps) => {
  return <div className={classNames(card({ size }), className)}>{children}</div>
}

export default Card
