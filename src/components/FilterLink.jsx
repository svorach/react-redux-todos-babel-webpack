export default ({filter, currentFilter, children, onClick }) => {
  if (filter === currentFilter) {
    return (<span>{children}</span>);
  }
            
  return (
    <a href='#' onClick={onClick.bind(this, filter)}>
      {children}
    </a>
  )
}