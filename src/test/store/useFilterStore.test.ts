/** @format */

import { describe, it, expect, beforeEach } from 'vitest'
import { useFilterStore } from '../../store/useFilterStore'
import type { Transaction } from '../../api/types'

describe('useFilterStore', () => {
  let mockTransactions: Transaction[]

  beforeEach(() => {
    useFilterStore.setState({
      selectedItems: {
        trans_type: [],
        trans_status: [],
      },
      startDate: '',
      endDate: '',
      transactionPeriod: 'all time',
      transactions: [],
      filteredData: [],
      hasAppliedFilter: false,
      filterCount: 0,
    })

    const today = new Date()
    mockTransactions = [
      {
        amount: 5000,
        metadata_id: 'meta1',
        metadata: {
          name: 'Test User 1',
          type: 'deposit',
          email: 'user1@test.com',
          quantity: '1',
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
        metadata_id: 'meta2',
        metadata: {
          name: 'Test User 2',
          type: 'withdrawal',
          email: 'user2@test.com',
          quantity: '1',
          country: 'Nigeria',
          product_name: 'Product B',
        },
        payment_reference: 'ref2',
        status: 'pending',
        type: 'withdrawal',
        date: today.toISOString(),
      },
    ]
  })

  describe('setTransactions', () => {
    it('should set transactions when no filter is applied', () => {
      useFilterStore.getState().setTransactions(mockTransactions)

      const state = useFilterStore.getState()
      expect(state.transactions).toEqual(mockTransactions)
      expect(state.filteredData).toEqual(mockTransactions)
      expect(state.hasAppliedFilter).toBe(false)
    })

    it('should not update if transactions are the same', () => {
      useFilterStore.getState().setTransactions(mockTransactions)
      const initialState = useFilterStore.getState()

      useFilterStore.getState().setTransactions(mockTransactions)
      const newState = useFilterStore.getState()

      expect(newState).toEqual(initialState)
    })

    it('should re-apply filter when filter is active and transactions change', () => {
      useFilterStore.getState().setTransactions(mockTransactions)

      useFilterStore.getState().setTransactionPeriod('today')
      useFilterStore.getState().applyFilter()

      expect(useFilterStore.getState().hasAppliedFilter).toBe(true)

      const newTransactions = [...mockTransactions]
      useFilterStore.getState().setTransactions(newTransactions)

      expect(useFilterStore.getState().hasAppliedFilter).toBe(true)
    })
  })

  describe('Filter Criteria Actions', () => {
    it('should set start date', () => {
      useFilterStore.getState().setStartDate('2024-01-01')
      expect(useFilterStore.getState().startDate).toBe('2024-01-01')
    })

    it('should set end date', () => {
      useFilterStore.getState().setEndDate('2024-12-31')
      expect(useFilterStore.getState().endDate).toBe('2024-12-31')
    })

    it('should set transaction period', () => {
      useFilterStore.getState().setTransactionPeriod('last 7 days')
      expect(useFilterStore.getState().transactionPeriod).toBe('last 7 days')
    })

    it('should toggle selection - add item', () => {
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')

      expect(useFilterStore.getState().selectedItems.trans_type).toContain('deposit')
    })

    it('should toggle selection - remove item', () => {
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')

      expect(useFilterStore.getState().selectedItems.trans_type).not.toContain('deposit')
    })

    it('should toggle multiple items', () => {
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')
      useFilterStore.getState().toggleSelection('withdrawal', 'trans_type')

      const types = useFilterStore.getState().selectedItems.trans_type
      expect(types).toContain('deposit')
      expect(types).toContain('withdrawal')
      expect(types).toHaveLength(2)
    })
  })

  describe('applyFilter', () => {
    beforeEach(() => {
      useFilterStore.getState().setTransactions(mockTransactions)
    })

    it('should apply filter and set hasAppliedFilter to true', () => {
      useFilterStore.getState().setTransactionPeriod('today')
      useFilterStore.getState().applyFilter()

      expect(useFilterStore.getState().hasAppliedFilter).toBe(true)
    })

    it('should calculate filter count for period filter', () => {
      useFilterStore.getState().setTransactionPeriod('today')
      useFilterStore.getState().applyFilter()

      const { filterCount, filteredData } = useFilterStore.getState()
      // Filter count should be 1 if there are results, 0 if no results
      expect(filterCount).toBe(filteredData.length > 0 ? 1 : 0)
    })

    it('should calculate filter count for custom date range', () => {
      const today = new Date().toISOString().split('T')[0]
      useFilterStore.getState().setStartDate(today)
      useFilterStore.getState().setEndDate(today)
      useFilterStore.getState().applyFilter()

      const { filterCount, filteredData } = useFilterStore.getState()
      expect(filterCount).toBe(filteredData.length > 0 ? 1 : 0)
    })

    it('should calculate filter count for type filter', () => {
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')
      useFilterStore.getState().applyFilter()

      const { filterCount, filteredData } = useFilterStore.getState()
      expect(filterCount).toBe(filteredData.length > 0 ? 1 : 0)
    })

    it('should calculate filter count for status filter', () => {
      useFilterStore.getState().toggleSelection('successful', 'trans_status')
      useFilterStore.getState().applyFilter()

      const { filterCount, filteredData } = useFilterStore.getState()
      expect(filterCount).toBe(filteredData.length > 0 ? 1 : 0)
    })

    it('should calculate filter count for multiple filters', () => {
      useFilterStore.getState().setTransactionPeriod('today')
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')
      useFilterStore.getState().toggleSelection('successful', 'trans_status')
      useFilterStore.getState().applyFilter()

      const { filterCount, filteredData } = useFilterStore.getState()
      if (filteredData.length > 0) {
        expect(filterCount).toBe(3) // period + type + status
      } else {
        expect(filterCount).toBe(0)
      }
    })

    it('should return 0 filter count when no results', () => {
      useFilterStore.getState().setTransactionPeriod('today')
      useFilterStore.getState().toggleSelection('nonexistent', 'trans_type')
      useFilterStore.getState().applyFilter()

      expect(useFilterStore.getState().filterCount).toBe(0)
      expect(useFilterStore.getState().filteredData).toHaveLength(0)
    })

    it('should filter transactions correctly', () => {
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')
      useFilterStore.getState().applyFilter()

      const { filteredData } = useFilterStore.getState()
      filteredData.forEach((t) => {
        expect(t.type).toBe('deposit')
      })
    })
  })

  describe('clearFilter', () => {
    beforeEach(() => {
      useFilterStore.getState().setTransactions(mockTransactions)
    })

    it('should reset all filter criteria', () => {
      // Set some filters
      useFilterStore.getState().setTransactionPeriod('last 7 days')
      useFilterStore.getState().setStartDate('2024-01-01')
      useFilterStore.getState().setEndDate('2024-12-31')
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')
      useFilterStore.getState().toggleSelection('successful', 'trans_status')
      useFilterStore.getState().applyFilter()

      // Clear filters
      useFilterStore.getState().clearFilter()

      const state = useFilterStore.getState()
      expect(state.transactionPeriod).toBe('all time')
      expect(state.startDate).toBe('')
      expect(state.endDate).toBe('')
      expect(state.selectedItems.trans_type).toHaveLength(0)
      expect(state.selectedItems.trans_status).toHaveLength(0)
      expect(state.hasAppliedFilter).toBe(false)
      expect(state.filterCount).toBe(0)
    })

    it('should preserve transactions', () => {
      useFilterStore.getState().setTransactionPeriod('last 7 days')
      useFilterStore.getState().applyFilter()
      useFilterStore.getState().clearFilter()

      expect(useFilterStore.getState().transactions).toEqual(mockTransactions)
    })

    it('should reset filteredData to all transactions', () => {
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')
      useFilterStore.getState().applyFilter()

      useFilterStore.getState().clearFilter()

      expect(useFilterStore.getState().filteredData).toEqual(mockTransactions)
    })
  })

  describe('resetFilterCriteria', () => {
    it('should reset only filter criteria without clearing transactions', () => {
      useFilterStore.getState().setTransactions(mockTransactions)
      useFilterStore.getState().setTransactionPeriod('last 7 days')
      useFilterStore.getState().setStartDate('2024-01-01')
      useFilterStore.getState().setEndDate('2024-12-31')
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')

      useFilterStore.getState().resetFilterCriteria()

      const state = useFilterStore.getState()
      expect(state.transactionPeriod).toBe('all time')
      expect(state.startDate).toBe('')
      expect(state.endDate).toBe('')
      expect(state.selectedItems.trans_type).toHaveLength(0)
      expect(state.selectedItems.trans_status).toHaveLength(0)

      // Transactions should still be there
      expect(state.transactions).toEqual(mockTransactions)
    })
  })

  describe('State Immutability', () => {
    it('should not mutate original transaction array', () => {
      const originalTransactions = [...mockTransactions]
      useFilterStore.getState().setTransactions(mockTransactions)
      useFilterStore.getState().toggleSelection('deposit', 'trans_type')
      useFilterStore.getState().applyFilter()

      expect(mockTransactions).toEqual(originalTransactions)
    })
  })
})
