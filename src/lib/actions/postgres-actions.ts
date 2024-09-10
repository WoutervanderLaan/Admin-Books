'use server'

import { months } from '@/helpers/date-helpers'
import prisma from '../prisma'

export const getTransactions = async () => prisma.transactions.findMany()

export const getTransactionsByMonth = async (
  month: keyof typeof months,
  year: number
) => {
  const index = months[month]

  const startDate = new Date(year, index, 1)
  const endDate = new Date(year, index + 1, 1)

  return prisma.transactions.findMany({
    where: {
      date: {
        gte: startDate,
        lt: endDate
      }
    }
  })
}

export const getTransactionsByCategory = async (
  categories: Array<keyof typeof Categories>
) => {
  return prisma.transactions.findMany({
    where: {
      category: {
        in: categories
      }
    }
  })
}

export const getTransactionsByAccount = async (account: string) => {
  return prisma.transactions.findMany({
    where: {
      account_number: Number(account)
    },
    orderBy: {
      date: 'asc'
    }
  })
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
  dateFilters,
  categoryFilters = [],
  account
}: {
  search: string
  dateFilters?: { month: keyof typeof months; year: number }
  categoryFilters?: string[]
  account?: string
}) => {
  const isNumber = !isNaN(Number(search.replace(',', '.')))

  const queryFilters = categoryFilters?.map((filter) => ({
    category: { equals: filter }
  }))

  const accountFilter = !isNaN(Number(account))
    ? {
        account_number: {
          equals: Number(account)
        }
      }
    : {}

  const dateFilter = dateFilters
    ? {
        date: {
          gte: new Date(dateFilters.year, months[dateFilters.month], 1),
          lt: new Date(dateFilters.year, months[dateFilters.month] + 1, 1)
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
          accountFilter,
          dateFilter,
          ...queryFilters
        ]
      }
    })

  return prisma.transactions.findMany({
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
        accountFilter,
        dateFilter,
        ...queryFilters
      ]
    }
  })
}

enum Categories {
  'income_freck_studio',
  'subscription_charity',
  'tax_vat',
  'other_excursions',
  'income_sharu',
  'expense',
  'rent',
  'prive_ontrekking',
  'income_extra',
  'subscription_discovery',
  'subscription_spotify',
  'income_shantelle',
  'other_udemy',
  'tax_water',
  'other_bank_costs',
  'groceries',
  'income_canvasheroes',
  'income_frasiola',
  'income_molly',
  'other_health_dentist',
  'other_health_vaccine',
  'subscription_hp',
  'income_pennie',
  'ciri',
  'other_travel',
  'health_insurance',
  'income_huurtoeslag',
  'income_rijksakademie',
  'prive_savings',
  'subscription_woningnet',
  'other_flight_tickets',
  'restaurant',
  'other_bank_interest',
  'income_zorgtoeslag',
  '',
  'other_gift',
  'other_game',
  'subscription_classpass',
  'subscription_pathe',
  'subscription_museumCard',
  'subscription_hbomax',
  'prive_revolut',
  'subscription_ps4',
  'subscription_mobile',
  'subscription_googleone',
  'prive_correctie',
  'subscription_microsoft',
  'tax',
  'subscription_disney',
  'internet',
  'subscription_icloud',
  'ciri_insurance',
  'other_beauty',
  'energy',
  'subscription_netflix',
  'restaurant_rijks_lunch',
  'waternet',
  'other_clothing',
  'subscription_camera',
  'home_supplies',
  'tax_gemeente'
}
