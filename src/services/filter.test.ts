/** @format */

import { describe, it, expect, beforeEach } from 'vitest'
import { filterData } from './filter'
import type { Transaction } from '@/api/types'

describe('filterData', () => {
  let mockTransactions: Transaction[]

  beforeEach(() => {
    // Create mock transactions for testing
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    const lastWeek = new Date(today)
    lastWeek.setDate(today.getDate() - 8)
    const lastMonth = new Date(today)
    lastMonth.setMonth(today.getMonth() - 1)
    const threeMonthsAgo = new Date(today)
    threeMonthsAgo.setMonth(today.getMonth() - 3)

    mockTransactions = [
      {
        amount: 5000,
        metadata: {
          name: 'Test User 1',
          type: 'deposit',
          email: 'user1@test.com',
          quantity: 1,
          country: 'Nigeria',
          product_name: 'Product A',
        },
        payment_reference: 'ref1',
        status: 'successful',
        type: 'deposit',
        date: today.toISOString(),
      },
      {
        amount: 3000,
        metadata: {
          name: 'Test User 2',
          type: 'withdrawal',
          email: 'user2@test.com',
          quantity: 1,
          country: 'Nigeria',
          product_name: 'Product B',
        },
        payment_reference: 'ref2',
        status: 'pending',
        type: 'withdrawal',
        date: yesterday.toISOString(),
      },
      {
        amount: 2000,
        metadata: {
          name: 'Test User 3',
          type: 'deposit',
          email: 'user3@test.com',
          quantity: 1,
          country: 'Nigeria',
          product_name: 'Product C',
        },
        payment_reference: 'ref3',
        status: 'successful',
        type: 'deposit',
        date: lastWeek.toISOString(),
      },
      {
        amount: 1000,
        metadata: {
          name: 'Test User 4',
          type: 'withdrawal',
          email: 'user4@test.com',
          quantity: 1,
          country: 'Nigeria',
          product_name: 'Product D',
        },
        payment_reference: 'ref4',
        status: 'failed',
        type: 'withdrawal',
        date: lastMonth.toISOString(),
      },
    ]
  })

  describe('Date Range Filtering', () => {
    it('should return all transactions when date range is "all time"', () => {
      const result = filterData(mockTransactions, 'all time')
      expect(result).toHaveLength(4)
    })

    it('should filter by "today"', () => {
      const result = filterData(mockTransactions, 'today')
      expect(result.length).toBeGreaterThanOrEqual(1)
      // Should include today's transaction
      const today = new Date()
      result.forEach((t) => {
        const tDate = new Date(t.date)
        expect(tDate.getDate()).toBe(today.getDate())
        expect(tDate.getMonth()).toBe(today.getMonth())
        expect(tDate.getFullYear()).toBe(today.getFullYear())
      })
    })

    it('should filter by "last 7 days"', () => {
      const result = filterData(mockTransactions, 'last 7 days')
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      result.forEach((t) => {
        expect(new Date(t.date).getTime()).toBeGreaterThanOrEqual(sevenDaysAgo.getTime())
      })
    })

    it('should filter by "this month"', () => {
      const result = filterData(mockTransactions, 'this month')
      const today = new Date()

      result.forEach((t) => {
        const tDate = new Date(t.date)
        expect(tDate.getMonth()).toBe(today.getMonth())
        expect(tDate.getFullYear()).toBe(today.getFullYear())
      })
    })

    it('should filter by "last 3 months"', () => {
      const result = filterData(mockTransactions, 'last 3 months')
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

      result.forEach((t) => {
        expect(new Date(t.date).getTime()).toBeGreaterThanOrEqual(threeMonthsAgo.getTime())
      })
    })
  })

  describe('Custom Date Range Filtering', () => {
    it('should filter by custom date range', () => {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 10)
      const endDate = new Date()

      const result = filterData(
        mockTransactions,
        'all time',
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      )

      result.forEach((t) => {
        const tDate = new Date(t.date)
        expect(tDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime())
        expect(tDate.getTime()).toBeLessThanOrEqual(endDate.getTime())
      })
    })

    it('should handle custom range with start and end as same date', () => {
      const today = new Date().toISOString().split('T')[0]
      const result = filterData(mockTransactions, 'all time', today, today)

      result.forEach((t) => {
        const tDate = new Date(t.date).toISOString().split('T')[0]
        expect(tDate).toBe(today)
      })
    })
  })

  describe('Transaction Type Filtering', () => {
    it('should filter by single transaction type', () => {
      const result = filterData(mockTransactions, 'all time', undefined, undefined, ['deposit'])

      result.forEach((t) => {
        expect(t.type).toBe('deposit')
      })
      expect(result.length).toBeGreaterThan(0)
    })

    it('should filter by multiple transaction types', () => {
      const result = filterData(mockTransactions, 'all time', undefined, undefined, ['deposit', 'withdrawal'])

      result.forEach((t) => {
        expect(['deposit', 'withdrawal']).toContain(t.type)
      })
    })

    it('should normalize "Withdrawals" to "withdrawal"', () => {
      const result = filterData(mockTransactions, 'all time', undefined, undefined, ['Withdrawals'])

      result.forEach((t) => {
        expect(t.type).toBe('withdrawal')
      })
    })

    it('should return empty array if no matching types', () => {
      const result = filterData(mockTransactions, 'all time', undefined, undefined, ['nonexistent'])
      expect(result).toHaveLength(0)
    })
  })

  describe('Transaction Status Filtering', () => {
    it('should filter by single status', () => {
      const result = filterData(mockTransactions, 'all time', undefined, undefined, [], ['successful'])

      result.forEach((t) => {
        expect(t.status.toLowerCase()).toBe('successful')
      })
      expect(result.length).toBeGreaterThan(0)
    })

    it('should filter by multiple statuses', () => {
      const result = filterData(mockTransactions, 'all time', undefined, undefined, [], ['successful', 'pending'])

      result.forEach((t) => {
        expect(['successful', 'pending']).toContain(t.status.toLowerCase())
      })
    })

    it('should be case insensitive', () => {
      const result1 = filterData(mockTransactions, 'all time', undefined, undefined, [], ['SUCCESSFUL'])
      const result2 = filterData(mockTransactions, 'all time', undefined, undefined, [], ['successful'])

      expect(result1).toEqual(result2)
    })

    it('should return empty array if no matching status', () => {
      const result = filterData(mockTransactions, 'all time', undefined, undefined, [], ['nonexistent'])
      expect(result).toHaveLength(0)
    })
  })

  describe('Combined Filtering', () => {
    it('should filter by both type and status', () => {
      const result = filterData(mockTransactions, 'all time', undefined, undefined, ['deposit'], ['successful'])

      result.forEach((t) => {
        expect(t.type).toBe('deposit')
        expect(t.status.toLowerCase()).toBe('successful')
      })
    })

    it('should filter by date range, type, and status', () => {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 10)
      const endDate = new Date()

      const result = filterData(
        mockTransactions,
        'all time',
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0],
        ['deposit'],
        ['successful']
      )

      result.forEach((t) => {
        expect(t.type).toBe('deposit')
        expect(t.status.toLowerCase()).toBe('successful')
        const tDate = new Date(t.date)
        expect(tDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime())
        expect(tDate.getTime()).toBeLessThanOrEqual(endDate.getTime())
      })
    })

    it('should handle filters that result in no matches', () => {
      const result = filterData(mockTransactions, 'all time', undefined, undefined, ['deposit'], ['failed'])
      expect(result).toHaveLength(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty transactions array', () => {
      const result = filterData([], 'all time')
      expect(result).toHaveLength(0)
    })

    it('should not mutate original array', () => {
      const original = [...mockTransactions]
      filterData(mockTransactions, 'all time', undefined, undefined, ['deposit'])
      expect(mockTransactions).toEqual(original)
    })

    it('should handle empty filter arrays', () => {
      const result = filterData(mockTransactions, 'all time', undefined, undefined, [], [])
      expect(result).toHaveLength(4)
    })
  })
})
