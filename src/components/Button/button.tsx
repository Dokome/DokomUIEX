import classNames from 'classnames'
import React from 'react'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

// export enum ButtonType {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Warning = 'warning',
//   Success = 'success',
//   Link = 'link',
// }

export type ButtonType =
  | 'primary'
  | 'default'
  | 'danger'
  | 'warning'
  | 'success'
  | 'link'

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children?: React.ReactNode
  href?: string
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> &
  BaseButtonProps
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> &
  BaseButtonProps
// 通过 Partial 将属性全变为可选
export type ButtonPorps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonPorps> = props => {
  const { btnType, size, disabled, children, href, className, ...restProps } =
    props
  // btn, btn-lg btn-primary...
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  })
  //
  if (btnType === 'link' && href) {
    // link 类型
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    //button 类型
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button
