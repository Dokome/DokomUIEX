import React from 'react'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

// export enum ThemeProps {
//   Primary = 'primary',
//   Secondary = 'secondary',
//   Success = 'success',
//   Warning = 'warning',
//   Danger = 'danger',
//   Info = 'info',
//   Light = 'light',
//   Dark = 'dark',
// }

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'light'
  | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = props => {
  const { className, theme, ...restProps } = props
  const classes = classNames('icon', className, {
    [`icon-${theme}`]: theme,
  })

  return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon
