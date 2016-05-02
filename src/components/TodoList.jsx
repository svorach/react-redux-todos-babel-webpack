import Todo from './Todo.jsx'

export default ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
       key={todo.id}
       {...todo}
       onClick={() => onTodoClick(todo.id)} />
    )}
  </ul>
)