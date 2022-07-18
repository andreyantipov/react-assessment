import $ from './Text.module.css';
import { classNames } from 'app/utils';

export type TextProps = {
    size?: "small" | "medium" | "large" | "h1"
    color?: "primary" | "secondary"
}

export const Text: FCC<TextProps> = ({ size, color, children }) => {
    const classes = classNames($, {
        'color-primary': color === 'primary',
        'color-secondary': color === 'secondary',
        'size-small': size === 'small',
        'size-medium': size === 'medium',
        'size-large': size === 'large',
        'size-h1': size === 'h1'
    })
    return(<span className={classes}>{children}</span>)
}

Text.defaultProps = {
    size: "medium",
    color: "primary"
}