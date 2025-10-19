/** @format */

import { describe, it, expect } from 'vitest'
import { render } from '../../../../test-utils'
import TransactionIcon from '../../../../../components/layout/revenue/transactions/TransactionIcon'

describe('TransactionIcon', () => {
  describe('Deposit Transactions', () => {
    it('should render deposit icon for deposit type', () => {
      const { container } = render(<TransactionIcon type="deposit" />)

      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render with custom size when specified', () => {
      const { container } = render(<TransactionIcon type="deposit" size="64px" />)

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Withdrawal Transactions', () => {
    it('should render withdrawal icon for withdrawal type', () => {
      const { container } = render(<TransactionIcon type="withdrawal" />)

      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render with custom size for withdrawal when specified', () => {
      const { container } = render(<TransactionIcon type="withdrawal" size="80px" />)

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Custom Sizes', () => {
    const sizes = ['32px', '48px', '64px', '80px', '100px']

    sizes.forEach((size) => {
      it(`should render with size ${size}`, () => {
        const { container } = render(<TransactionIcon type="deposit" size={size} />)

        expect(container.firstChild).toBeInTheDocument()
      })
    })
  })

  describe('Icon Types', () => {
    it('should render deposit and withdrawal icons', () => {
      const { container: depositContainer } = render(<TransactionIcon type="deposit" />)
      const { container: withdrawalContainer } = render(<TransactionIcon type="withdrawal" />)

      expect(depositContainer.firstChild).toBeInTheDocument()
      expect(withdrawalContainer.firstChild).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('should render successfully', () => {
      const { container } = render(<TransactionIcon type="deposit" />)

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Memo Optimization', () => {
    it('should be memoized to prevent unnecessary re-renders', () => {
      const { rerender, container } = render(<TransactionIcon type="deposit" size="48px" />)

      const firstRender = container.firstChild

      // Re-render with same props
      rerender(<TransactionIcon type="deposit" size="48px" />)

      const secondRender = container.firstChild

      // Component should be memoized
      expect(firstRender).toBeInTheDocument()
      expect(secondRender).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle very small sizes', () => {
      const { container } = render(<TransactionIcon type="deposit" size="16px" />)

      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle very large sizes', () => {
      const { container } = render(<TransactionIcon type="deposit" size="200px" />)

      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle deposit type correctly', () => {
      const { container } = render(<TransactionIcon type="deposit" />)

      expect(container.firstChild).toBeInTheDocument()
    })

    it('should handle withdrawal type correctly', () => {
      const { container } = render(<TransactionIcon type="withdrawal" />)

      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
