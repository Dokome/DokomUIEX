import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import Menu, { MenuMode, MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

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
      <MenuItem>Active MenuItem</MenuItem>
      <MenuItem disabled>Disabled MenuItem</MenuItem>
      <MenuItem>Normal MenuItem</MenuItem>
      <SubMenu>
        <MenuItem>SubMenu MenuItem</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}

let MenuElement: HTMLElement,
  ActiveElement: HTMLElement,
  DisabledElement: HTMLElement
describe('menu and menuItem component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    const view = render(generateMenu(testProps))
    // eslint-disable-next-line testing-library/no-container
    view.container.append(createStyleFile())

    MenuElement = screen.getByTestId('test-menu')
    ActiveElement = screen.getByText('Active MenuItem')
    DisabledElement = screen.getByText('Disabled MenuItem')
  })
  it('should render the correct menu and menuItem based on default props', () => {
    expect(MenuElement).toBeInTheDocument()
    expect(MenuElement).toHaveClass('menu test')
    // expect(MenuElement.getElementsByTagName('li').length).toEqual(3)
    // eslint-disable-next-line testing-library/no-node-access
    expect(MenuElement.querySelectorAll(':scope > li').length).toEqual(4)
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

  it('should show dropdown items when hover on subMenu', async () => {
    expect(screen.queryByText('SubMenu MenuItem')).not.toBeVisible()
    const dropdownElement = screen.getByText('SubMenu MenuItem')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(screen.queryByText('SubMenu MenuItem')).toBeVisible()
    })
    fireEvent.click(screen.getByText('SubMenu MenuItem'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(screen.queryByText('SubMenu MenuItem')).not.toBeVisible()
    })
  })
})
