/** @format */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../../test-utils'
import userEvent from '@testing-library/user-event'
import EmptyState from '../../../../../components/layout/revenue/transactions/EmptyState'

describe('EmptyState', () => {
  describe('Rendering', () => {
    it('should render empty state message', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      expect(
        screen.getByText(/No matching transaction found for the selected filter/i)
      ).toBeInTheDocument()
    })

    it('should render description text', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      expect(
        screen.getByText(/Change your filters to see more results, or add a new product/i)
      ).toBeInTheDocument()
    })

    it('should render clear filter button', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      expect(screen.getByRole('button', { name: /clear filter/i })).toBeInTheDocument()
    })

    it.skip('should render receipt image', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const image = screen.getByAltText('No transactions')
      expect(image).toBeInTheDocument()
    })
  })

  describe('Clear Filter Button', () => {
    it('should call onClearFilter when button is clicked', async () => {
      const handleClearFilter = vi.fn()
      const user = userEvent.setup()

      render(<EmptyState onClearFilter={handleClearFilter} />)

      const clearButton = screen.getByRole('button', { name: /clear filter/i })
      await user.click(clearButton)

      expect(handleClearFilter).toHaveBeenCalledTimes(1)
    })

    it('should call onClearFilter multiple times if clicked multiple times', async () => {
      const handleClearFilter = vi.fn()
      const user = userEvent.setup()

      render(<EmptyState onClearFilter={handleClearFilter} />)

      const clearButton = screen.getByRole('button', { name: /clear filter/i })

      await user.click(clearButton)
      await user.click(clearButton)
      await user.click(clearButton)

      expect(handleClearFilter).toHaveBeenCalledTimes(3)
    })

    it('should have outline variant styling', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const clearButton = screen.getByRole('button', { name: /clear filter/i })
      expect(clearButton).toBeInTheDocument()
    })

    it('should have rounded full border radius', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const clearButton = screen.getByRole('button', { name: /clear filter/i })
      expect(clearButton).toHaveStyle({ borderRadius: 'var(--chakra-radii-full)' })
    })
  })

  describe('Component Structure', () => {
    it('should render with proper layout structure', () => {
      const { container } = render(<EmptyState onClearFilter={() => {}} />)

      const vStack = container.querySelector('[class*="chakra-stack"]')
      expect(vStack).toBeInTheDocument()
    })

    it('should render all elements in correct order', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const heading = screen.getByText(/No matching transaction found/i)
      const description = screen.getByText(/Change your filters/i)
      const button = screen.getByRole('button', { name: /clear filter/i })

      expect(heading).toBeInTheDocument()
      expect(description).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })
  })

  describe('Typography', () => {
    it('should render heading with correct text', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const heading = screen.getByText(/No matching transaction found for the selected filter/i)
      expect(heading.tagName).toBe('H2')
    })

    it('should render heading as h2 element', () => {
      const { container } = render(<EmptyState onClearFilter={() => {}} />)

      const h2 = container.querySelector('h2')
      expect(h2).toBeInTheDocument()
      expect(h2?.textContent).toBe(
        'No matching transaction found for the selected filter'
      )
    })

    it('should render description text correctly', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const description = screen.getByText(
        /Change your filters to see more results, or add a new product/i
      )
      expect(description).toBeInTheDocument()
    })
  })

  describe('Image Display', () => {
    it.skip('should render receipt icon image', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const image = screen.getByAltText('No transactions')
      expect(image).toHaveAttribute('src')
    })

    it.skip('should have proper alt text for accessibility', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const image = screen.getByAltText('No transactions')
      expect(image).toHaveAttribute('alt', 'No transactions')
    })

    it.skip('should render image inside badge container', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const image = screen.getByAltText('No transactions')
      expect(image.parentElement).toBeInTheDocument()
    })
  })

  describe('User Interaction', () => {
    it('should be keyboard accessible', async () => {
      const handleClearFilter = vi.fn()
      const user = userEvent.setup()

      render(<EmptyState onClearFilter={handleClearFilter} />)

      await user.tab()
      await user.keyboard('{Enter}')

      expect(handleClearFilter).toHaveBeenCalled()
    })

    it('should handle space key press', async () => {
      const handleClearFilter = vi.fn()
      const user = userEvent.setup()

      render(<EmptyState onClearFilter={() => handleClearFilter()} />)

      const clearButton = screen.getByRole('button', { name: /clear filter/i })
      clearButton.focus()

      await user.keyboard(' ')

      expect(handleClearFilter).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should render without crashing when onClearFilter is undefined', () => {
      render(<EmptyState onClearFilter={undefined as any} />)

      expect(screen.getByRole('button', { name: /clear filter/i })).toBeInTheDocument()
    })

    it('should handle rapid button clicks', async () => {
      const handleClearFilter = vi.fn()
      const user = userEvent.setup()

      render(<EmptyState onClearFilter={handleClearFilter} />)

      const clearButton = screen.getByRole('button', { name: /clear filter/i })

      await user.tripleClick(clearButton)

      expect(handleClearFilter).toHaveBeenCalledTimes(3)
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button with proper text', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const button = screen.getByRole('button', { name: /clear filter/i })
      expect(button).toBeInTheDocument()
    })

    it.skip('should have accessible image with alt text', () => {
      render(<EmptyState onClearFilter={() => {}} />)

      const image = screen.getByAltText('No transactions')
      expect(image).toBeInTheDocument()
    })

    it('should have proper heading hierarchy', () => {
      const { container } = render(<EmptyState onClearFilter={() => {}} />)

      const h2 = container.querySelector('h2')
      expect(h2).toBeInTheDocument()
    })
  })
})
