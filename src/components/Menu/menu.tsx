import React, { createContext, useState } from 'react'
import { MenuItemProps } from './menuItem'
import classNames from 'classnames'

export enum MenuMode {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  mode?: MenuMode
  style?: React.CSSProperties
  className?: string
  defaultIndex?: string
  defaultOpenSubMenus?: string[]
  children?: React.ReactNode
  onSelect?: SelectCallback
}

interface IMenuContext {
  defaultOpenSubMenus?: string[]
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
}

export const MenuContext = createContext<IMenuContext>({
  index: '0',
})

const Menu: React.FC<MenuProps> = props => {
  const {
    mode,
    style,
    className,
    defaultIndex,
    onSelect,
    children,
    defaultOpenSubMenus,
  } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    [`menu-${mode}`]: mode,
  })

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (['MenuItem', 'SubMenu'].includes(displayName || '')) {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        )
      }
    })
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    defaultOpenSubMenus,
    mode,
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: MenuMode.Horizontal,
  defaultOpenSubMenus: [],
}

export default Menu
