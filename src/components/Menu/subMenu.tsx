import React, { useContext, FunctionComponentElement, useState } from 'react'
import { MenuContext, MenuMode } from './menu'
import { MenuItemProps } from './menuItem'
import classNames from 'classnames'

export interface SubMenuProps {
  index?: string
  title?: string
  className?: string
  children?: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = props => {
  const { children, index, title, className } = props
  const context = useContext(MenuContext)
  const opendSubMenus = context.defaultOpenSubMenus as string[]
  const isOpend =
    index && context.mode === MenuMode.Vertical && opendSubMenus.includes(index)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  })
  const [menuOpen, setOpen] = useState(isOpend)
  //
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 100)
  }

  const clickEvents =
    context.mode === MenuMode.Vertical ? { onClick: handleClick } : {}
  const hoverEvents =
    context.mode === MenuMode.Horizontal
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, sindex) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${sindex}` })
      } else {
        console.error(
          'Warning: SubMenu has a child which is not a MenuItem component'
        )
      }
    })

    return <ul className={subMenuClasses}>{childrenComponent}</ul>
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
