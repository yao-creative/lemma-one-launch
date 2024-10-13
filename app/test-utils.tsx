import React from 'react'
import { render as rtlRender } from '@testing-library/react'

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(ui, { ...options })
}

export * from '@testing-library/react'
export { render }