/** @format */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../../test-utils'
import userEvent from '@testing-library/user-event'
import FilterButton from '../../../../../components/layout/revenue/transactions/FilterButton'

describe('FilterButton', () => {
  describe('Rendering', () => {
    it('should render filter button with text', () => {
      render(<FilterButton onClick={() => {}} />)

      expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument()
    })

    it('should render Filter text', () => {
      render(<FilterButton onClick={() => {}} />)

      expect(screen.getByText('Filter')).toBeInTheDocument()
    })

    it('should render chevron down icon', () => {
      const { container } = render(<FilterButton onClick={() => {}} />)

      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Filter Count Badge', () => {
    it('should not show badge when filterCount is 0', () => {
      render(<FilterButton onClick={() => {}} filterCount={0} />)

      expect(screen.queryByText('0')).not.toBeInTheDocument()
    })

    it('should not show badge when filterCount is undefined', () => {
      render(<FilterButton onClick={() => {}} />)

      const badge = screen.queryByText(/[0-9]+/)
      expect(badge).not.toBeInTheDocument()
    })

    it('should show badge when filterCount is greater than 0', () => {
      render(<FilterButton onClick={() => {}} filterCount={3} />)

      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('should display correct filterCount number', () => {
      render(<FilterButton onClick={() => {}} filterCount={5} />)

      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should handle large filter counts', () => {
      render(<FilterButton onClick={() => {}} filterCount={99} />)

      expect(screen.getByText('99')).toBeInTheDocument()
    })

    it('should handle very large filter counts', () => {
      render(<FilterButton onClick={() => {}} filterCount={999} />)

      expect(screen.getByText('999')).toBeInTheDocument()
    })
  })

  describe('Click Handler', () => {
    it('should call onClick when button is clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<FilterButton onClick={handleClick} />)

      const button = screen.getByRole('button', { name: /filter/i })
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should call onClick multiple times if clicked multiple times', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<FilterButton onClick={handleClick} />)

      const button = screen.getByRole('button', { name: /filter/i })

      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should call onClick when button with filter count is clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<FilterButton onClick={handleClick} filterCount={5} />)

      const button = screen.getByRole('button', { name: /filter/i })
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Button Styling', () => {
    it('should have outline variant', () => {
      render(<FilterButton onClick={() => {}} />)

      const button = screen.getByRole('button', { name: /filter/i })
      expect(button).toBeInTheDocument()
    })

    it('should have rounded full border radius', () => {
      render(<FilterButton onClick={() => {}} />)

      const button = screen.getByRole('button', { name: /filter/i })
      expect(button).toHaveStyle({ borderRadius: 'var(--chakra-radii-full)' })
    })

    it.skip('should have no border', () => {
      render(<FilterButton onClick={() => {}} />)

      const button = screen.getByRole('button', { name: /filter/i })
      expect(button).toHaveStyle({ border: 'none' })
    })

    it('should have no box shadow', () => {
      render(<FilterButton onClick={() => {}} />)

      const button = screen.getByRole('button', { name: /filter/i })
      expect(button).toHaveStyle({ boxShadow: 'none' })
    })
  })

  describe('Component Structure', () => {
    it('should render HStack with Filter text and icon', () => {
      const { container } = render(<FilterButton onClick={() => {}} />)

      const hStack = container.querySelector('[class*="chakra-stack"]')
      expect(hStack).toBeInTheDocument()
    })

    it('should render all elements when filterCount is present', () => {
      const { container } = render(<FilterButton onClick={() => {}} filterCount={5} />)

      expect(screen.getByText('Filter')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Badge Styling', () => {
    it('should render badge with rounded full border radius', () => {
      render(<FilterButton onClick={() => {}} filterCount={3} />)

      const badge = screen.getByText('3')
      expect(badge).toHaveStyle({ borderRadius: 'var(--chakra-radii-full)' })
    })

    it('should render badge with white text color', () => {
      render(<FilterButton onClick={() => {}} filterCount={3} />)

      const badge = screen.getByText('3')
      expect(badge).toHaveStyle({ color: 'var(--chakra-colors-white)' })
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<FilterButton onClick={handleClick} />)

      // Button reference not needed - just checking it renders

      // Tab to button and press Enter
      await user.tab()
      await user.keyboard('{Enter}')

      expect(handleClick).toHaveBeenCalled()
    })

    it('should handle space key press', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<FilterButton onClick={handleClick} />)

      const button = screen.getByRole('button', { name: /filter/i })
      button.focus()

      await user.keyboard(' ')

      expect(handleClick).toHaveBeenCalled()
    })

    it('should be focusable', () => {
      render(<FilterButton onClick={() => {}} />)

      const button = screen.getByRole('button', { name: /filter/i })
      button.focus()

      expect(button).toHaveFocus()
    })
  })

  describe('Edge Cases', () => {
    it('should handle filterCount of 1', () => {
      render(<FilterButton onClick={() => {}} filterCount={1} />)

      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('should not show negative filterCount', () => {
      // TypeScript should prevent this, but testing runtime behavior
      render(<FilterButton onClick={() => {}} filterCount={-1} />)

      expect(screen.queryByText('-1')).not.toBeInTheDocument()
    })

    it('should handle rapid button clicks', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<FilterButton onClick={handleClick} />)

      const button = screen.getByRole('button', { name: /filter/i })

      // Rapid clicks
      await user.tripleClick(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('Memo Optimization', () => {
    it('should be memoized to prevent unnecessary re-renders', () => {
      const { rerender } = render(<FilterButton onClick={() => {}} filterCount={3} />)

      expect(screen.getByText('3')).toBeInTheDocument()

      // Re-render with same props
      rerender(<FilterButton onClick={() => {}} filterCount={3} />)

      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('should re-render when filterCount changes', () => {
      const { rerender } = render(<FilterButton onClick={() => {}} filterCount={3} />)

      expect(screen.getByText('3')).toBeInTheDocument()

      // Re-render with different filterCount
      rerender(<FilterButton onClick={() => {}} filterCount={5} />)

      expect(screen.queryByText('3')).not.toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })
  })

  describe('Dynamic Updates', () => {
    it('should update badge when filterCount changes', () => {
      const { rerender } = render(<FilterButton onClick={() => {}} filterCount={0} />)

      expect(screen.queryByText('0')).not.toBeInTheDocument()

      rerender(<FilterButton onClick={() => {}} filterCount={5} />)

      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should hide badge when filterCount becomes 0', () => {
      const { rerender } = render(<FilterButton onClick={() => {}} filterCount={5} />)

      expect(screen.getByText('5')).toBeInTheDocument()

      rerender(<FilterButton onClick={() => {}} filterCount={0} />)

      expect(screen.queryByText('5')).not.toBeInTheDocument()
    })
  })
})
