import $ from './Highlighter.module.css'

export const Highlighter: FCC = ({ children }) => {
    return <span className={$.base}>{children}</span>
}