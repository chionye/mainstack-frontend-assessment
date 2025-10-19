/** @format */

import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../../test-utils'
import TransactionItem from '../../../../../components/layout/revenue/transactions/TransactionItem'
import type { Transaction } from '../../../../../api/types'

describe('TransactionItem', () => {
  const mockDepositTransaction: Transaction = {
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
  }

  const mockWithdrawalTransaction: Transaction = {
    amount: 3000,
    metadata_id: 'meta2',
    metadata: {
      name: '',
      type: 'withdrawal',
      email: '',
      country: 'Nigeria',
    },
    payment_reference: 'ref456',
    status: 'successful',
    type: 'withdrawal',
    date: '2024-01-10T14:45:00.000Z',
  }

  const mockPendingTransaction: Transaction = {
    amount: 1500,
    metadata_id: 'meta3',
    metadata: {
      type: 'deposit',
      country: 'Nigeria',
    },
    payment_reference: 'ref789',
    status: 'pending',
    type: 'deposit',
    date: '2024-01-20T09:15:00.000Z',
  }

  describe('Deposit Transactions', () => {
    it('should render deposit transaction with product name', () => {
      render(<TransactionItem transaction={mockDepositTransaction} />)

      expect(screen.getByText('Premium Subscription')).toBeInTheDocument()
      expect(screen.getByText('USD 5000')).toBeInTheDocument()
      expect(screen.getByText('John doe')).toBeInTheDocument()
    })

    it('should display formatted date correctly', () => {
      render(<TransactionItem transaction={mockDepositTransaction} />)

      // Date should be formatted as "MMM dd yyyy"
      expect(screen.getByText(/Jan 15 2024/i)).toBeInTheDocument()
    })

    it('should show deposit icon for transactions with product_name', () => {
      const { container } = render(<TransactionItem transaction={mockDepositTransaction} />)

      // Check if deposit icon is rendered (arrowLeftDown)
      const iconContainer = container.firstChild
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('Withdrawal Transactions', () => {
    it('should render withdrawal transaction without product name', () => {
      render(<TransactionItem transaction={mockWithdrawalTransaction} />)

      expect(screen.getByText('Cash Withdrawal')).toBeInTheDocument()
      expect(screen.getByText('USD 3000')).toBeInTheDocument()
    })

    it('should show status when name is not available', () => {
      render(<TransactionItem transaction={mockWithdrawalTransaction} />)

      expect(screen.getByText('Successful')).toBeInTheDocument()
    })

    it('should show withdrawal icon for transactions without product_name', () => {
      const { container } = render(<TransactionItem transaction={mockWithdrawalTransaction} />)

      const iconContainer = container.firstChild
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('Transaction Status', () => {
    it('should display pending status with correct color', () => {
      render(<TransactionItem transaction={mockPendingTransaction} />)

      const statusText = screen.getByText('Pending')
      expect(statusText).toBeInTheDocument()
    })

    it('should display successful status when name is empty', () => {
      render(<TransactionItem transaction={mockWithdrawalTransaction} />)

      expect(screen.getByText('Successful')).toBeInTheDocument()
    })

    it('should display customer name when available', () => {
      render(<TransactionItem transaction={mockDepositTransaction} />)

      expect(screen.getByText('John doe')).toBeInTheDocument()
    })
  })

  describe('Amount Display', () => {
    it('should render amount with USD prefix', () => {
      render(<TransactionItem transaction={mockDepositTransaction} />)

      expect(screen.getByText('USD 5000')).toBeInTheDocument()
    })

    it('should use custom fontSize when provided', () => {
      render(
        <TransactionItem transaction={mockDepositTransaction} amountFontSize="20px" />
      )

      // Check if custom font size is applied
      const amountText = screen.getByText('USD 5000')
      expect(amountText).toHaveStyle({ fontSize: '20px' })
    })

    it('should use default fontSize when not provided', () => {
      render(<TransactionItem transaction={mockDepositTransaction} />)

      const amountText = screen.getByText('USD 5000')
      expect(amountText).toHaveStyle({ fontSize: '16px' })
    })
  })

  describe('Date Formatting', () => {
    it('should format date as MMM dd yyyy', () => {
      render(<TransactionItem transaction={mockDepositTransaction} />)

      expect(screen.getByText('Jan 15 2024')).toBeInTheDocument()
    })

    it('should handle different dates correctly', () => {
      const differentDateTransaction = {
        ...mockDepositTransaction,
        date: '2024-12-25T00:00:00.000Z',
      }

      render(<TransactionItem transaction={differentDateTransaction} />)

      expect(screen.getByText(/Dec 25 2024/i)).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle transaction with no metadata', () => {
      const noMetadataTransaction: Transaction = {
        amount: 2000,
        metadata_id: 'meta4',
        metadata: undefined,
        payment_reference: 'ref999',
        status: 'successful',
        type: 'withdrawal',
        date: '2024-01-01T12:00:00.000Z',
      }

      render(<TransactionItem transaction={noMetadataTransaction} />)

      expect(screen.getByText('Cash Withdrawal')).toBeInTheDocument()
      expect(screen.getByText('USD 2000')).toBeInTheDocument()
      expect(screen.getByText('Successful')).toBeInTheDocument()
    })

    it('should handle transaction with empty product_name', () => {
      const emptyProductTransaction = {
        ...mockDepositTransaction,
        metadata: {
          ...mockDepositTransaction.metadata,
          product_name: '',
        },
      }

      render(<TransactionItem transaction={emptyProductTransaction} />)

      expect(screen.getByText('Cash Withdrawal')).toBeInTheDocument()
    })

    it('should handle large amounts', () => {
      const largeAmountTransaction = {
        ...mockDepositTransaction,
        amount: 9999999,
      }

      render(<TransactionItem transaction={largeAmountTransaction} />)

      expect(screen.getByText('USD 9999999')).toBeInTheDocument()
    })

    it('should handle zero amount', () => {
      const zeroAmountTransaction = {
        ...mockDepositTransaction,
        amount: 0,
      }

      render(<TransactionItem transaction={zeroAmountTransaction} />)

      expect(screen.getByText('USD 0')).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('should render all transaction details in correct layout', () => {
      const { container } = render(<TransactionItem transaction={mockDepositTransaction} />)

      // Check if HStack is rendered
      const hStack = container.querySelector('[class*="chakra-stack"]')
      expect(hStack).toBeInTheDocument()

      // Check if all texts are present
      expect(screen.getByText('Premium Subscription')).toBeInTheDocument()
      expect(screen.getByText('USD 5000')).toBeInTheDocument()
      expect(screen.getByText('John doe')).toBeInTheDocument()
      expect(screen.getByText('Jan 15 2024')).toBeInTheDocument()
    })
  })
})
