/** @format */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../../test-utils'
import TransactionList from '../../../../../components/layout/revenue/transactions/TransactionList'
import type { Transaction } from '../../../../../api/types'

describe('TransactionList', () => {
  const mockTransactions: Transaction[] = [
    {
      amount: 5000,
      metadata_id: 'meta1',
      metadata: {
        name: 'John doe',
        type: 'deposit',
        email: 'john@example.com',
        quantity: '2',
        country: 'Nigeria',
        product_name: 'Premium Subscription',
      },
      payment_reference: 'ref123',
      status: 'successful',
      type: 'deposit',
      date: '2024-01-15T10:30:00.000Z',
    },
    {
      amount: 3000,
      metadata_id: 'meta2',
      metadata: {
        type: 'withdrawal',
        country: 'Nigeria',
      },
      payment_reference: 'ref456',
      status: 'successful',
      type: 'withdrawal',
      date: '2024-01-10T14:45:00.000Z',
    },
    {
      amount: 1500,
      metadata_id: 'meta3',
      metadata: {
        name: 'Jane smith',
        type: 'deposit',
        email: 'jane@example.com',
        product_name: 'Basic Plan',
        country: 'Nigeria',
      },
      payment_reference: 'ref789',
      status: 'pending',
      type: 'deposit',
      date: '2024-01-20T09:15:00.000Z',
    },
  ]

  describe('Rendering Transactions', () => {
    it('should render all transactions when array is not empty', () => {
      render(
        <TransactionList transactions={mockTransactions} onClearFilter={() => {}} />
      )

      expect(screen.getByText('Premium Subscription')).toBeInTheDocument()
      expect(screen.getByText('Cash Withdrawal')).toBeInTheDocument()
      expect(screen.getByText('Basic Plan')).toBeInTheDocument()
    })

    it('should render correct number of transaction items', () => {
      render(
        <TransactionList transactions={mockTransactions} onClearFilter={() => {}} />
      )

      // Should render 3 transactions
      expect(screen.getByText('USD 5000')).toBeInTheDocument()
      expect(screen.getByText('USD 3000')).toBeInTheDocument()
      expect(screen.getByText('USD 1500')).toBeInTheDocument()
    })

    it('should use payment_reference as key for each transaction', () => {
      const { container } = render(
        <TransactionList transactions={mockTransactions} onClearFilter={() => {}} />
      )

      // Check if VStack is rendered with transactions
      const vStack = container.querySelector('[class*="chakra-stack"]')
      expect(vStack).toBeInTheDocument()
      expect(vStack?.children).toHaveLength(3)
    })
  })

  describe('Empty State', () => {
    it('should render EmptyState when transactions array is empty', () => {
      render(<TransactionList transactions={[]} onClearFilter={() => {}} />)

      expect(
        screen.getByText(/No matching transaction found for the selected filter/i)
      ).toBeInTheDocument()
    })

    it('should not render transaction items when array is empty', () => {
      render(<TransactionList transactions={[]} onClearFilter={() => {}} />)

      expect(screen.queryByText('USD')).not.toBeInTheDocument()
    })

    it('should pass onClearFilter to EmptyState', () => {
      const handleClearFilter = vi.fn()

      render(<TransactionList transactions={[]} onClearFilter={handleClearFilter} />)

      expect(screen.getByRole('button', { name: /clear filter/i })).toBeInTheDocument()
    })
  })

  describe('Custom Font Size', () => {
    it('should use default font size when not specified', () => {
      render(
        <TransactionList transactions={mockTransactions} onClearFilter={() => {}} />
      )

      const amountText = screen.getByText('USD 5000')
      expect(amountText).toHaveStyle({ fontSize: '16px' })
    })

    it('should use custom font size when specified', () => {
      render(
        <TransactionList
          transactions={mockTransactions}
          onClearFilter={() => {}}
          amountFontSize="20px"
        />
      )

      const amountText = screen.getByText('USD 5000')
      expect(amountText).toHaveStyle({ fontSize: '20px' })
    })

    it('should apply custom font size to all transaction items', () => {
      render(
        <TransactionList
          transactions={mockTransactions}
          onClearFilter={() => {}}
          amountFontSize="18px"
        />
      )

      const amounts = ['USD 5000', 'USD 3000', 'USD 1500']
      amounts.forEach((amount) => {
        const element = screen.getByText(amount)
        expect(element).toHaveStyle({ fontSize: '18px' })
      })
    })
  })

  describe('List Structure', () => {
    it('should render transactions in VStack with proper spacing', () => {
      const { container } = render(
        <TransactionList transactions={mockTransactions} onClearFilter={() => {}} />
      )

      const vStack = container.querySelector('[class*="chakra-stack"]')
      expect(vStack).toBeInTheDocument()
    })

    it('should render transactions with stretch alignment', () => {
      const { container } = render(
        <TransactionList transactions={mockTransactions} onClearFilter={() => {}} />
      )

      const vStack = container.querySelector('[class*="chakra-stack"]')
      expect(vStack).toBeInTheDocument()
    })
  })

  describe('Single Transaction', () => {
    it('should render single transaction correctly', () => {
      render(
        <TransactionList transactions={[mockTransactions[0]]} onClearFilter={() => {}} />
      )

      expect(screen.getByText('Premium Subscription')).toBeInTheDocument()
      expect(screen.getByText('USD 5000')).toBeInTheDocument()
      expect(screen.getByText('John doe')).toBeInTheDocument()
    })
  })

  describe('Multiple Transactions', () => {
    it('should handle large number of transactions', () => {
      const largeTransactionArray: Transaction[] = Array.from({ length: 100 }, (_, i) => ({
        ...mockTransactions[0],
        payment_reference: `ref${i}`,
        amount: i * 100,
      }))

      const { container } = render(
        <TransactionList transactions={largeTransactionArray} onClearFilter={() => {}} />
      )

      const vStack = container.querySelector('[class*="chakra-stack"]')
      expect(vStack?.children).toHaveLength(100)
    })

    it('should render transactions in order', () => {
      render(
        <TransactionList transactions={mockTransactions} onClearFilter={() => {}} />
      )

      const amounts = screen.getAllByText(/USD/)
      expect(amounts).toHaveLength(3)
      expect(amounts[0]).toHaveTextContent('USD 5000')
      expect(amounts[1]).toHaveTextContent('USD 3000')
      expect(amounts[2]).toHaveTextContent('USD 1500')
    })
  })

  describe('Edge Cases', () => {
    it('should handle transactions with missing metadata gracefully', () => {
      const transactionWithoutMetadata: Transaction = {
        amount: 2000,
        metadata_id: 'meta4',
        metadata: undefined,
        payment_reference: 'ref999',
        status: 'successful',
        type: 'withdrawal',
        date: '2024-01-01T12:00:00.000Z',
      }

      render(
        <TransactionList
          transactions={[transactionWithoutMetadata]}
          onClearFilter={() => {}}
        />
      )

      expect(screen.getByText('Cash Withdrawal')).toBeInTheDocument()
      expect(screen.getByText('USD 2000')).toBeInTheDocument()
    })

    it('should handle zero amount transactions', () => {
      const zeroAmountTransaction = {
        ...mockTransactions[0],
        amount: 0,
        payment_reference: 'ref000',
      }

      render(
        <TransactionList transactions={[zeroAmountTransaction]} onClearFilter={() => {}} />
      )

      expect(screen.getByText('USD 0')).toBeInTheDocument()
    })

    it('should handle negative amount transactions', () => {
      const negativeAmountTransaction = {
        ...mockTransactions[0],
        amount: -1000,
        payment_reference: 'ref-neg',
      }

      render(
        <TransactionList
          transactions={[negativeAmountTransaction]}
          onClearFilter={() => {}}
        />
      )

      expect(screen.getByText('USD -1000')).toBeInTheDocument()
    })
  })

  describe('Conditional Rendering', () => {
    it('should switch from transactions to empty state when cleared', () => {
      const { rerender } = render(
        <TransactionList transactions={mockTransactions} onClearFilter={() => {}} />
      )

      expect(screen.getByText('Premium Subscription')).toBeInTheDocument()

      rerender(<TransactionList transactions={[]} onClearFilter={() => {}} />)

      expect(
        screen.getByText(/No matching transaction found for the selected filter/i)
      ).toBeInTheDocument()
      expect(screen.queryByText('Premium Subscription')).not.toBeInTheDocument()
    })

    it('should switch from empty state to transactions when populated', () => {
      const { rerender } = render(
        <TransactionList transactions={[]} onClearFilter={() => {}} />
      )

      expect(
        screen.getByText(/No matching transaction found for the selected filter/i)
      ).toBeInTheDocument()

      rerender(
        <TransactionList transactions={mockTransactions} onClearFilter={() => {}} />
      )

      expect(screen.getByText('Premium Subscription')).toBeInTheDocument()
      expect(
        screen.queryByText(/No matching transaction found for the selected filter/i)
      ).not.toBeInTheDocument()
    })
  })
})
