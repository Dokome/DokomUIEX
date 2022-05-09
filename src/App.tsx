import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'

library.add(fas)
function App() {
  return (
    <div className="App">
      <Menu mode="horizontal" defaultOpenSubMenus={['1']}>
        <MenuItem>
          <Icon icon="face-angry" />
          <span> Coffe</span>
        </MenuItem>
        <SubMenu title="Dropdown">
          <MenuItem>Dropdown 1</MenuItem>
          <MenuItem>Dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>MenuItem 3</MenuItem>
      </Menu>
    </div>
  )
}

export default App
