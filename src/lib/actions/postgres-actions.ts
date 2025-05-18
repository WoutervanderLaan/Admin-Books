'use server'

import { transactions } from '@prisma/client'
import prisma from '../prisma'
import { months, TMonths } from '../types/Months'

const convertTransactionType = (transactions: transactions[]) =>
  transactions.map((t) => ({
    ...t,
    account_number: Number(t.account_number),
    mutation: Number(t.mutation),
    total_amount_after: Number(t.total_amount_after),
    total_amount_before: Number(t.total_amount_before)
  }))

export const getTransactions = async () => {
  const transactions = await prisma.transactions.findMany()
  return convertTransactionType(transactions)
}

export const getTransactionsByMonth = async (month: TMonths, year: number) => {
  const index = months.indexOf(month)

  const startDate = new Date(year, Number(index), 1)
  const endDate = new Date(year, Number(index + 1), 1)

  const transactions = await prisma.transactions.findMany({
    where: {
      date: {
        gte: startDate,
        lt: endDate
      }
    }
  })
  return convertTransactionType(transactions)
}

export const getTransactionsByCategory = async (categories: Array<string>) => {
  const transactions = await prisma.transactions.findMany({
    where: {
      category: {
        in: categories
      }
    }
  })
  return convertTransactionType(transactions)
}

export const getTransactionsByAccount = async (account: string) => {
  const transactions = await prisma.transactions.findMany({
    where: {
      account_number: Number(account)
    },
    orderBy: {
      date: 'asc'
    }
  })
  return convertTransactionType(transactions)
}

export const getTransactionCategories = async (account?: string) => {
  const categories = await prisma.transactions.findMany(
    account
      ? {
          where: {
            account_number: Number(account)
          },
          distinct: ['category']
        }
      : undefined
  )

  return Array.from(new Set(categories)).map((row) => row.category) as string[]
}

export const getTransactionsBySearch = async ({
  search,
  dateFilters
}: {
  search: string
  dateFilters?: { month: TMonths; year: number }
}) => {
  const isNumber = !isNaN(Number(search.replace(',', '.')))

  const dateFilter = dateFilters
    ? {
        date: {
          gte: new Date(dateFilters.year, months.indexOf(dateFilters.month), 1),
          lt: new Date(
            dateFilters.year,
            months.indexOf(dateFilters.month) + 1,
            1
          )
        }
      }
    : {}

  if (isNumber)
    return prisma.transactions.findMany({
      where: {
        AND: [
          {
            mutation: {
              equals: search.replace(',', '.')
            }
          },
          dateFilter
        ]
      }
    })

  const transactions = await prisma.transactions.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              description: {
                contains: search
              }
            },
            {
              category: {
                contains: search
              }
            }
          ]
        },
        dateFilter
      ]
    }
  })
  return convertTransactionType(transactions)
}
