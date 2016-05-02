export default ({filter, currentFilter, children, onFilterLinkClick }) => {
  if (filter === currentFilter) {
    return (<span>{children}</span>);
  }
            
  return (
    <a href='#'
       onClick={onFilterLinkClick.bind(this, filter)}
    >
      {children}
    </a>
  )
}