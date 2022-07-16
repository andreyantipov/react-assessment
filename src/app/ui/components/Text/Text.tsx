import $ from './Text.module.css';
import { classNames } from 'app/utils';

export type TextProps = {
    size?: "small" | "medium" | "large"
}

export const Text: FCC<TextProps> = ({ size, children }) => {
    const classes = classNames($, {
        'base': true,
        'size-small': size === 'small',
        'size-medium': size === 'medium',
        'size-large': size === 'large'
    })
    return(<span className={classes}>{children}</span>)
}

Text.defaultProps = {
    size: "medium"
}