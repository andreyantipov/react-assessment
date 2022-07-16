import { forwardRef } from 'react';
import { classNames } from 'app/ui';
import $ from './SearchBar.module.css';

export type SearchBarProps = {
  children: JSX.Element | JSX.Element[]
} & React.HTMLProps<HTMLDivElement>;


export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(({ children }, ref) => {

  const classes = classNames($, {
    'searchbar': true,
  })

  return (
    <div ref={ref} className={classes}>
      <div className={$['search-icon']}>
        <span className="material-symbols-outlined">search</span>
      </div>
      {children}
    </div>
  );
});