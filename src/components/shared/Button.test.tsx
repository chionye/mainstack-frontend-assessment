/** @format */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/test-utils'
import userEvent from '@testing-library/user-event'
import CustomButton from './Button'

describe('CustomButton', () => {
  it('should render with children', () => {
    render(<CustomButton onClick={() => {}}>Click me</CustomButton>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<CustomButton onClick={handleClick}>Click me</CustomButton>)

    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should render with solid variant by default', () => {
    render(<CustomButton onClick={() => {}}>Solid Button</CustomButton>)
    const button = screen.getByRole('button', { name: /solid button/i })
    expect(button).toBeInTheDocument()
  })

  it('should render with outline variant', () => {
    render(
      <CustomButton onClick={() => {}} variant="outline">
        Outline Button
      </CustomButton>
    )
    const button = screen.getByRole('button', { name: /outline button/i })
    expect(button).toBeInTheDocument()
  })

  it('should accept custom width prop', () => {
    render(
      <CustomButton onClick={() => {}} width="200px">
        Custom Width
      </CustomButton>
    )
    const button = screen.getByRole('button', { name: /custom width/i })
    expect(button).toHaveStyle({ width: '200px' })
  })

  it('should accept custom bg prop', () => {
    render(
      <CustomButton onClick={() => {}} bg="red">
        Custom BG
      </CustomButton>
    )
    const button = screen.getByRole('button', { name: /custom bg/i })
    expect(button).toBeInTheDocument()
  })

  it('should accept custom color prop', () => {
    render(
      <CustomButton onClick={() => {}} color="blue">
        Custom Color
      </CustomButton>
    )
    const button = screen.getByRole('button', { name: /custom color/i })
    expect(button).toBeInTheDocument()
  })

  it('should accept custom padding props', () => {
    render(
      <CustomButton onClick={() => {}} py="20px" px="40px">
        Custom Padding
      </CustomButton>
    )
    const button = screen.getByRole('button', { name: /custom padding/i })
    expect(button).toBeInTheDocument()
  })

  it('should be disabled when disabled prop is true', () => {
    render(
      <CustomButton onClick={() => {}} disabled>
        Disabled Button
      </CustomButton>
    )
    const button = screen.getByRole('button', { name: /disabled button/i })
    expect(button).toBeDisabled()
  })

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <CustomButton onClick={handleClick} disabled>
        Disabled Button
      </CustomButton>
    )

    const button = screen.getByRole('button', { name: /disabled button/i })
    await user.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should accept additional props', () => {
    render(
      <CustomButton onClick={() => {}} data-testid="custom-button" aria-label="Custom ARIA label">
        Test Button
      </CustomButton>
    )
    const button = screen.getByTestId('custom-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Custom ARIA label')
  })
})
