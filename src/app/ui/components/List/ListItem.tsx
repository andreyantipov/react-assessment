import $ from './List.module.css'
import { classNames } from 'app/utils';

export type ListItemProps = {
  selected?: boolean
} & React.HTMLProps<HTMLLIElement>;

export const ListItem: FCC<ListItemProps> = ({ children, selected = false, ...props }) => {
  const classes = classNames($, {
    'base-list-item': true,
    'base-list-item--selected': selected
  });

  return <li className={classes} {...props}>{children}</li>;
};
