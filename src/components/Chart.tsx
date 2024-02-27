'use client'

import classNames from 'classnames'
import { useMemo, useRef, useState } from 'react'
import Overlay from './Overlay'
import { truncateString } from '@/helpers/string-helpers'

type ChartProps = {
  data: Chart[]
}

type Chart = {
  amount: number
  targetAmount: number
  name: string
}

const Chart = ({ data }: ChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [openModal, setOpenModal] = useState(false)

  const highestAmount = useMemo(() => {
    let highestAmount = 0
    data.forEach((value) => {
      if (value.amount > highestAmount) {
        highestAmount = value.amount
      }
      if (value.targetAmount > highestAmount) {
        highestAmount = value.targetAmount
      }
    })
    return highestAmount
  }, [data])

  const calculateHeightPercentage = (amount: number) => {
    const percentage = (amount * 100) / highestAmount
    return `${percentage}%`
  }

  const divider = useMemo(() => {
    if (highestAmount < 1000) {
      return 100
    } else if (highestAmount < 2000) {
      return 200
    } else if (highestAmount < 4000) {
      return 250
    } else if (highestAmount < 5000) {
      return 500
    } else {
      return 100
    }
  }, [highestAmount])

  const determineVariant = (value: Chart) => {
    if (Number(Math.abs(value.amount)) >= Number(value.targetAmount))
      return 'maxxed'
    if (value.amount > 0 && value.name !== 'income') return 'minned'
    return 'default'
  }

  return (
    <>
      <div
        className="relative border-b-[1px] border-gray flex flex-row justify-center h-[400px] w-fit gap-4 px-4 pt-2 mb-10"
        ref={containerRef}
        onClick={() => setOpenModal(true)}
      >
        {Array.from({ length: Math.round(highestAmount / divider) }).map(
          (_, i) => (
            <Divider
              key={i}
              yValue={calculateHeightPercentage(i * divider)}
              yNumber={i * divider}
            />
          )
        )}
        {data.map((value, i) => {
          return (
            <div
              key={i}
              className="relative h-full w-fit flex flex-col justify-end"
            >
              <div className="relative w-20 h-full flex flex-row justify-between items-end translate-x-3">
                <Bar
                  height={calculateHeightPercentage(value.targetAmount)}
                  variant="background"
                />

                <Bar
                  height={calculateHeightPercentage(Math.abs(value.amount))}
                  variant={determineVariant(value)}
                />
              </div>
              <span className="absolute -bottom-6 text-xs text-center w-full">
                {truncateString(value.name)}
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col">
        <span className="mx-2">
          Estimated spendings total: €
          {data
            .filter((budget) => budget.name !== 'income')
            .reduce((acc, cur) => {
              return acc + cur.targetAmount
            }, 0)}
        </span>
        <span className="mx-2">
          Spend amount total: €
          {Math.abs(
            data
              .filter((budget) => budget.name !== 'income')
              .reduce((acc, cur) => {
                return acc + cur.amount
              }, 0)
          )}
        </span>
      </div>

      {openModal && (
        <Overlay onClose={() => setOpenModal(false)}>
          <div />
        </Overlay>
      )}
    </>
  )
}

export default Chart

type BarStyleVariants = 'background' | 'default' | 'maxxed' | 'minned'

const variantStyles: Record<BarStyleVariants, string> = {
  background: 'bg-gradient-to-t from-gray-light to-gray',
  default: 'bg-gradient-to-t from-blue-light to-blue z-10 -translate-x-3',
  maxxed: 'bg-gradient-to-t from-red-light to-red z-10 -translate-x-3',
  minned: 'bg-gradient-to-t from-green-light to-green z-10 -translate-x-3'
}

const Bar = ({
  variant = 'default',
  height
}: {
  variant?: 'background' | 'default' | 'maxxed' | 'minned'
  height: string
}) => {
  return (
    <div
      className={classNames('relative w-10', variantStyles[variant])}
      style={{
        height
      }}
    />
  )
}

const Divider = ({ yValue, yNumber }: { yValue: string; yNumber: number }) => (
  <>
    <div
      className="absolute h-[1px] bg-gray w-full"
      style={{
        bottom: yValue
      }}
    />
    <span
      className="absolute -left-12 text-xs translate-y-[50%] w-8 text-end text-gray-dark"
      style={{
        bottom: yValue
      }}
    >
      {yNumber}
    </span>
  </>
)
