/** @format */

import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../../test-utils'
import TransactionCount from '../../../../../components/layout/revenue/transactions/TransactionCount'

describe('TransactionCount', () => {
  describe('Rendering', () => {
    it('should render transaction count heading', () => {
      render(<TransactionCount count={10} period="all time" />)

      expect(screen.getByText('10 Transactions')).toBeInTheDocument()
    })

    it('should render period description', () => {
      render(<TransactionCount count={5} period="all time" />)

      expect(screen.getByText(/Your transactions for all time/i)).toBeInTheDocument()
    })

    it('should render as h3 heading', () => {
      const { container } = render(<TransactionCount count={10} period="all time" />)

      const heading = container.querySelector('h3')
      expect(heading).toBeInTheDocument()
      expect(heading?.textContent).toBe('10 Transactions')
    })
  })

  describe('Count Display', () => {
    it('should display single transaction correctly', () => {
      render(<TransactionCount count={1} period="all time" />)

      expect(screen.getByText('1 Transactions')).toBeInTheDocument()
    })

    it('should display zero transactions', () => {
      render(<TransactionCount count={0} period="all time" />)

      expect(screen.getByText('0 Transactions')).toBeInTheDocument()
    })

    it('should display large number of transactions', () => {
      render(<TransactionCount count={9999} period="all time" />)

      expect(screen.getByText('9999 Transactions')).toBeInTheDocument()
    })

    it('should handle various count numbers', () => {
      const counts = [5, 10, 50, 100, 500, 1000]

      counts.forEach((count) => {
        const { rerender } = render(<TransactionCount count={count} period="all time" />)

        expect(screen.getByText(`${count} Transactions`)).toBeInTheDocument()

        rerender(<TransactionCount count={0} period="all time" />)
      })
    })
  })

  describe('Period Formatting', () => {
    it('should format "all time" period correctly', () => {
      render(<TransactionCount count={10} period="all time" />)

      expect(screen.getByText('Your transactions for all time')).toBeInTheDocument()
    })

    it('should format "this month" period correctly', () => {
      render(<TransactionCount count={10} period="this month" />)

      expect(screen.getByText('Your transactions for this month')).toBeInTheDocument()
    })

    it('should format "last 7 days" period correctly', () => {
      render(<TransactionCount count={10} period="last 7 days" />)

      expect(screen.getByText('Your transactions for last 7 days')).toBeInTheDocument()
    })

    it('should format "last 3 months" period correctly', () => {
      render(<TransactionCount count={10} period="last 3 months" />)

      expect(screen.getByText('Your transactions for last 3 months')).toBeInTheDocument()
    })

    it('should format "today" period correctly', () => {
      render(<TransactionCount count={10} period="today" />)

      expect(screen.getByText('Your transactions for today')).toBeInTheDocument()
    })

    it('should format custom period correctly', () => {
      render(<TransactionCount count={10} period="custom range" />)

      expect(screen.getByText('Your transactions for custom range')).toBeInTheDocument()
    })
  })

  describe('Period Text Formatting', () => {
    it('should return period as-is for "this month"', () => {
      render(<TransactionCount count={10} period="this month" />)

      const text = screen.getByText(/Your transactions for/i)
      expect(text.textContent).toBe('Your transactions for this month')
    })

    it('should return period as-is for "all time"', () => {
      render(<TransactionCount count={10} period="all time" />)

      const text = screen.getByText(/Your transactions for/i)
      expect(text.textContent).toBe('Your transactions for all time')
    })

    it('should return formatted period for other periods', () => {
      render(<TransactionCount count={10} period="last 30 days" />)

      const text = screen.getByText(/Your transactions for/i)
      expect(text.textContent).toBe('Your transactions for last 30 days')
    })
  })

  describe('Component Structure', () => {
    it.skip('should render Box wrapper', () => {
      const { container } = render(<TransactionCount count={10} period="all time" />)

      const box = container.querySelector('[class*="chakra-box"]')
      expect(box).toBeInTheDocument()
    })

    it('should render heading and description text', () => {
      render(<TransactionCount count={10} period="all time" />)

      const heading = screen.getByText('10 Transactions')
      const description = screen.getByText(/Your transactions for all time/i)

      expect(heading).toBeInTheDocument()
      expect(description).toBeInTheDocument()
    })

    it('should have proper heading hierarchy', () => {
      const { container } = render(<TransactionCount count={10} period="all time" />)

      const h3 = container.querySelector('h3')
      expect(h3).toBeInTheDocument()
    })
  })

  describe('Typography', () => {
    it('should render heading with correct font size', () => {
      render(<TransactionCount count={10} period="all time" />)

      const heading = screen.getByText('10 Transactions')
      expect(heading).toHaveStyle({ fontSize: '20px' })
    })

    it.skip('should render heading with semibold weight', () => {
      render(<TransactionCount count={10} period="all time" />)

      const heading = screen.getByText('10 Transactions')
      expect(heading).toHaveStyle({ fontWeight: 'var(--chakra-fontWeights-semibold)' })
    })

    it('should render description with correct font size', () => {
      render(<TransactionCount count={10} period="all time" />)

      const description = screen.getByText(/Your transactions for/i)
      expect(description).toHaveStyle({ fontSize: '14px' })
    })
  })

  describe('Dynamic Updates', () => {
    it('should update count when prop changes', () => {
      const { rerender } = render(<TransactionCount count={10} period="all time" />)

      expect(screen.getByText('10 Transactions')).toBeInTheDocument()

      rerender(<TransactionCount count={25} period="all time" />)

      expect(screen.queryByText('10 Transactions')).not.toBeInTheDocument()
      expect(screen.getByText('25 Transactions')).toBeInTheDocument()
    })

    it('should update period when prop changes', () => {
      const { rerender } = render(<TransactionCount count={10} period="all time" />)

      expect(screen.getByText('Your transactions for all time')).toBeInTheDocument()

      rerender(<TransactionCount count={10} period="this month" />)

      expect(screen.queryByText('Your transactions for all time')).not.toBeInTheDocument()
      expect(screen.getByText('Your transactions for this month')).toBeInTheDocument()
    })

    it('should update both count and period simultaneously', () => {
      const { rerender } = render(<TransactionCount count={10} period="all time" />)

      expect(screen.getByText('10 Transactions')).toBeInTheDocument()
      expect(screen.getByText('Your transactions for all time')).toBeInTheDocument()

      rerender(<TransactionCount count={5} period="this month" />)

      expect(screen.getByText('5 Transactions')).toBeInTheDocument()
      expect(screen.getByText('Your transactions for this month')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty period string', () => {
      render(<TransactionCount count={10} period="" />)

      expect(screen.getByText('Your transactions for')).toBeInTheDocument()
    })

    it('should handle very long period text', () => {
      const longPeriod = 'from January 1st 2024 to December 31st 2024 for all regions'

      render(<TransactionCount count={10} period={longPeriod} />)

      expect(screen.getByText(`Your transactions for ${longPeriod}`)).toBeInTheDocument()
    })

    it('should handle negative count gracefully', () => {
      // TypeScript should prevent this, but testing runtime behavior
      render(<TransactionCount count={-5} period="all time" />)

      expect(screen.getByText('-5 Transactions')).toBeInTheDocument()
    })

    it('should handle decimal count by displaying as-is', () => {
      // TypeScript should prevent this, but testing runtime behavior
      render(<TransactionCount count={10.5 as any} period="all time" />)

      expect(screen.getByText('10.5 Transactions')).toBeInTheDocument()
    })
  })

  describe('Period Variations', () => {
    const periods = [
      'all time',
      'this month',
      'last 7 days',
      'last 30 days',
      'last 3 months',
      'today',
      'yesterday',
      'this week',
      'last week',
      'this year',
    ]

    periods.forEach((period) => {
      it(`should display period "${period}" correctly`, () => {
        render(<TransactionCount count={10} period={period} />)

        expect(screen.getByText(`Your transactions for ${period}`)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading role', () => {
      render(<TransactionCount count={10} period="all time" />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading.textContent).toBe('10 Transactions')
    })

    it('should be readable by screen readers', () => {
      render(<TransactionCount count={10} period="all time" />)

      const heading = screen.getByRole('heading', { level: 3 })
      const description = screen.getByText(/Your transactions for/i)

      expect(heading).toBeInTheDocument()
      expect(description).toBeInTheDocument()
    })
  })
})
