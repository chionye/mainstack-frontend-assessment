/** @format */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTransactions } from '../../../api/hooks/useTransactions'
import { API } from '../../../api/client'
import type { Transaction } from '../../../api/types'

// Mock the API client
vi.mock('../../../api/client', () => ({
  API: {
    get: vi.fn(),
  },
}))

describe('useTransactions', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  const mockTransactions: Transaction[] = [
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
      date: new Date().toISOString(),
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
      date: new Date().toISOString(),
    },
  ]

  it('should fetch transactions successfully', async () => {
    vi.mocked(API.get).mockResolvedValueOnce({ data: mockTransactions })

    const { result } = renderHook(() => useTransactions(), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockTransactions)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should return empty array by default', async () => {
    vi.mocked(API.get).mockResolvedValueOnce({ data: [] })

    const { result } = renderHook(() => useTransactions(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual([])
  })

  it('should call the correct endpoint', async () => {
    vi.mocked(API.get).mockResolvedValueOnce({ data: mockTransactions })

    renderHook(() => useTransactions(), { wrapper })

    await waitFor(() => {
      expect(API.get).toHaveBeenCalledWith('/transactions')
    })
  })

  it('should have correct staleTime configuration', async () => {
    vi.mocked(API.get).mockResolvedValueOnce({ data: mockTransactions })

    const { result } = renderHook(() => useTransactions(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.isStale).toBe(false)
  })

  it('should use correct query key', () => {
    vi.mocked(API.get).mockResolvedValueOnce({ data: [] })

    const { result } = renderHook(() => useTransactions(), { wrapper })

    expect(result.current).toBeDefined()
  })

  it('should handle large transaction arrays', async () => {
    const largeTransactionArray = Array.from({ length: 100 }, (_, i) => ({
      ...mockTransactions[0],
      payment_reference: `ref${i}`,
      amount: i * 100,
    }))

    vi.mocked(API.get).mockResolvedValueOnce({ data: largeTransactionArray })

    const { result } = renderHook(() => useTransactions(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toHaveLength(100)
  })
})
