/** @format */

import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from '../components/ui/provider'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add any custom options here
}

/**
 * Custom render function that wraps components with necessary providers
 */
const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  return render(ui, {
    wrapper: ({ children }) => <Provider>{children}</Provider>,
    ...options,
  })
}

export * from '@testing-library/react'
export { customRender as render }
