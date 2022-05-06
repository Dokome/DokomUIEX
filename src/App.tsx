import React from 'react'
import Menu, { MenuMode } from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className="App">
      <Menu onSelect={console.log} mode={MenuMode.Vertical}>
        {new Array(3).fill(0).map((_, index) => (
          <MenuItem index={index} key={index}>
            {`Menu Item ${index}`}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default App
