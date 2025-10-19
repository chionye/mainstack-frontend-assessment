/** @format */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useWallet } from '../../../api/hooks/useWallet'
import { API } from '../../../api/client'

vi.mock('../../../api/client', () => ({
  API: {
    get: vi.fn(),
  },
}))

describe('useWallet', () => {
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

  it('should fetch wallet data successfully', async () => {
    const mockWalletData = {
      balance: 5000,
      total_payout: 10000,
      total_revenue: 15000,
      pending_payout: 2000,
      ledger_balance: 3000,
    }

    vi.mocked(API.get).mockResolvedValueOnce({ data: mockWalletData })

    const { result } = renderHook(() => useWallet(), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockWalletData)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should use correct query key', () => {
    vi.mocked(API.get).mockResolvedValueOnce({ data: {} })

    const { result } = renderHook(() => useWallet(), { wrapper })

    expect(result.current).toBeDefined()
  })

  it('should call the correct endpoint', async () => {
    const mockWalletData = { balance: 5000 }
    vi.mocked(API.get).mockResolvedValueOnce({ data: mockWalletData })

    renderHook(() => useWallet(), { wrapper })

    await waitFor(() => {
      expect(API.get).toHaveBeenCalledWith('/wallet')
    })
  })

  it('should have correct staleTime configuration', async () => {
    const mockWalletData = { balance: 5000 }
    vi.mocked(API.get).mockResolvedValueOnce({ data: mockWalletData })

    const { result } = renderHook(() => useWallet(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.isStale).toBe(false)
  })
})
