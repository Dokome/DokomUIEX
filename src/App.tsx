import React from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Large}
        href={'https://baidu.com'}
        target="_blank"
      >
        Hello World Link
      </Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small}>
        {ButtonType.Default}
      </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        {ButtonType.Primary}
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        {ButtonType.Danger}
      </Button>
      <Button btnType={ButtonType.Warning} size={ButtonSize.Large} autoFocus>
        {ButtonType.Warning}
      </Button>
      <Button btnType={ButtonType.Success} size={ButtonSize.Large}>
        {ButtonType.Success}
      </Button>
    </div>
  )
}

export default App
