import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { readableTextColor, darken, lighten } from "@operational/utils"
import { Theme, expandColor } from "@operational/theme"

import { isWhite } from "../utils/color"
import { WithTheme, Css, CssStatic } from "../types"

export interface IStyleProps {
  theme?: Theme
  color?: string
  active?: boolean
  disabled?: boolean
  condensed?: boolean
}

export interface Props {
  id?: string
  css?: Css
  className?: string
  /** Invoked when you click on the button */
  onClick?: React.HTMLProps<HTMLButtonElement>["onClick"]
  type?: string
  children?: React.ReactNode
  /**
   * What color of button would you like? It can be a hex value or a named theme color
   * @default white
   */
  color?: string
  /** Active state */
  active?: boolean
  /** Disabled option */
  disabled?: boolean
  /** Condensed option */
  condensed?: boolean
}

const Container = glamorous.button(({ theme, color, active, disabled, condensed }: IStyleProps): CssStatic => {
  const defaultColor: string = theme.colors.white
  const backgroundColor: string = expandColor(theme, color) || defaultColor
  const activeBackgroundColor: string = darken(backgroundColor, 5)
  const textColor = readableTextColor(backgroundColor, [theme.colors.text, "white"])
  const activeBoxShadow = theme.shadows.pressed
  const spacing = theme.spacing

  return {
    label: "button",
    ...theme.typography.body,
    display: "inline-block",
    padding: condensed ? `${spacing / 8}px ${spacing / 2}px` : `${spacing * 0.375}px ${spacing * 1.5}px`,
    borderRadius: theme.borderRadius,
    border: "1px solid",
    borderColor: isWhite(backgroundColor) ? theme.colors.gray : active ? activeBackgroundColor : backgroundColor,
    cursor: disabled ? "auto" : "pointer",
    boxShadow: active ? activeBoxShadow : "none",
    backgroundColor: active ? activeBackgroundColor : backgroundColor,

    color: textColor,
    opacity: disabled ? 0.6 : 1.0,
    outline: "none",

    ...!disabled
      ? {
          ":hover": {
            backgroundColor: activeBackgroundColor,
            color: readableTextColor(activeBackgroundColor, ["white", "#222"]),
          },

          ":focus": {
            outline: 0,
            boxShadow: `0 0 0 3px ${lighten(backgroundColor, 35)}`,
          },

          ":active": {
            boxShadow: activeBoxShadow,
          },
        }
      : {},

    marginRight: spacing / 2,
  }
})

const Button = (props: Props) => (
  <Container
    type={props.type}
    id={props.id}
    css={props.css}
    className={props.className}
    onClick={props.disabled ? null : props.onClick}
    color={props.color}
    active={props.active}
    disabled={props.disabled}
    condensed={props.condensed}
  >
    {props.children}
  </Container>
)

export default Button