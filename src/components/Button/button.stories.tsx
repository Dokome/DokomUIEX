import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './button'

export default {
  title: 'Button Component',
  component: Button,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => (
  <>
    <Button btnType="default">Default Type</Button>
    <Button btnType="primary">Primary Type</Button>
    <Button btnType="success">Success Type</Button>
    <Button btnType="warning">Warning Type</Button>
    <Button btnType="danger">Danger Type</Button>
    <Button btnType="link" href="https://baidu.com">
      Link Type
    </Button>
  </>
)
//
export const ButtonType = Template.bind({})

ButtonType.args = {
  btnType: 'default',
  children: 'DefaultButton',
}

//
export const ButtonSize = Template.bind({})

ButtonSize.args = {
  btnType: 'primary',
  children: 'PrimaryButton',
}
