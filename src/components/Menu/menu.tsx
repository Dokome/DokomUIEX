import React, { createContext, useState } from 'react'
import classNames from 'classnames'

export enum MenuMode {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

type SelectCallback = (selectedIndex: number) => void

export interface MenuProps {
  mode?: MenuMode
  style?: React.CSSProperties
  className?: string
  defaultIndex?: number
  children?: React.ReactNode
  onSelect?: SelectCallback
}

interface IMenuContext {
  index: number
  onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({
  index: 0,
})

const Menu: React.FC<MenuProps> = props => {
  const { mode, style, className, defaultIndex, onSelect, children } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    [`menu-${mode}`]: mode,
  })

  const handleClick = (index: number) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: MenuMode.Horizontal,
}

export default Menu
