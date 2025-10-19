/** @format */

import { type ReactElement, type ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { Provider } from '../components/ui/provider'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider>{children}</Provider>
  )

  return render(ui, {
    wrapper: Wrapper,
    ...options,
  })
}

// eslint-disable-next-line
export * from '@testing-library/react'
export { customRender as render }
