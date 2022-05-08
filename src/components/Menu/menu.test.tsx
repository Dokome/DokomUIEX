import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Menu, { MenuMode, MenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: MenuMode.Vertical,
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={'0'}>Active MenuItem</MenuItem>
      <MenuItem index={'1'} disabled>
        Disabled MenuItem
      </MenuItem>
      <MenuItem index={'2'}>Normal MenuItem</MenuItem>
    </Menu>
  )
}
let MenuElement: HTMLElement,
  ActiveElement: HTMLElement,
  DisabledElement: HTMLElement
describe('menu and menuItem component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(generateMenu(testProps))
    MenuElement = screen.getByTestId('test-menu')
    ActiveElement = screen.getByText('Active MenuItem')
    DisabledElement = screen.getByText('Disabled MenuItem')
  })
  it('should render the correct menu and menuItem based on default props', () => {
    expect(MenuElement).toBeInTheDocument()
    expect(MenuElement).toHaveClass('menu test')
    // eslint-disable-next-line testing-library/no-node-access
    expect(MenuElement.getElementsByTagName('li').length).toEqual(3)
    expect(ActiveElement).toHaveClass('menu-item is-active')
    expect(DisabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    const NormalItem = screen.getByText('Normal MenuItem')
    fireEvent.click(NormalItem)
    expect(NormalItem).toHaveClass('is-active')
    expect(ActiveElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(DisabledElement)
    expect(DisabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    render(generateMenu(testVerticalProps))
    MenuElement = screen.getByTestId('test-menu')
    expect(MenuElement).toHaveClass('menu-vertical')
  })
})
