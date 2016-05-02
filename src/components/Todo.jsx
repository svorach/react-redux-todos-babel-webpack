export default ({ onClick, completed, text }) => (
  <li onClick={onClick.bind(completed)} style={{ textDecoration: completed ? 'line-through' : 'none'}}>
    {text}
  </li>
)