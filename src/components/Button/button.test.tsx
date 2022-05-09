import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Button, { ButtonPorps, ButtonSize } from './button'
const defaultProps = {
  onClick: jest.fn(),
}

const testProps: ButtonPorps = {
  btnType: 'primary',
  size: ButtonSize.Large,
  className: 'klass',
}

const disabledProps: ButtonPorps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('button component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>Button</Button>)
    const element = screen.getByText('Button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element?.tagName).toBe('BUTTON')
    expect(element.disabled).toBeFalsy()
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    render(<Button {...testProps}>Button</Button>)
    const element = screen.getByText('Button')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })

  it('should render a link when btn type equals link and href is provided', () => {
    render(
      <Button btnType={'link'} href="dummy">
        Button
      </Button>
    )
    const element = screen.getByText('Button')
    expect(element).toBeInTheDocument()
    expect(element?.tagName).toBe('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>Button</Button>)
    const element = screen.getByText('Button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
})
