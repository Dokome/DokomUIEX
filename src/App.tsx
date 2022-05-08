import React from 'react'
import Menu, { MenuMode } from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
  return (
    <div className="App">
      <Menu mode={MenuMode.Vertical} defaultOpenSubMenus={['1']}>
        <MenuItem>MenuItem 1</MenuItem>
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
