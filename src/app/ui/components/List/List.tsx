import { forwardRef } from 'react';
import $ from './List.module.css'

export type ListProps = {
    children: JSX.Element | JSX.Element[]
} & React.HTMLProps<HTMLUListElement>;

export const List = forwardRef<HTMLUListElement, ListProps>(({ children, ...props }, ref) => {
    return(<ul ref={ref} className={$['base-list']} {...props}>{children}</ul>)
})