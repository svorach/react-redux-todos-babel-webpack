import React from 'react'
import ReactDOM from 'react-dom'

import { Component } from 'react'
import { createStore } from 'redux'
import { combineReducers } from 'redux'

import AddTodo from './src/components/AddTodo.jsx'
import TodoList from './src/components/TodoList.jsx'
import FilterLink from './src/components/FilterLink.jsx'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
        
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}


const todoApp = combineReducers({
  todos,
  visibilityFilter
})

const store = createStore(todoApp)

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

let nextTodoId = 0

class TodoApp extends Component {
	onAddTodo(input, e) {
		e.preventDefault()

    store.dispatch({
      type: 'ADD_TODO',
      text: input.value,
      id: nextTodoId += 1
    })
  }

	onTodoClick(id) {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id
    })
  }

	onFilterLinkClick(filter, e)  {
	  e.preventDefault();

	  store.dispatch({
	    type: 'SET_VISIBILITY_FILTER',
	    filter
	  });
	}

  render() {
    const { todos, visibilityFilter } = this.props
    const visibleTodos = getVisibleTodos(todos, visibilityFilter)

    return (
      <div>
      	<AddTodo onAddTodo={this.onAddTodo} />

        <TodoList todos={visibleTodos} onTodoClick={this.onTodoClick} />
        
        <p>
          Show:
          {' '}
          <FilterLink onClick={this.onFilterLinkClick} filter='SHOW_ALL' currentFilter={visibilityFilter}>All</FilterLink>
          {' '}
          <FilterLink onClick={this.onFilterLinkClick} filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>Active</FilterLink>
          {' '}
          <FilterLink onClick={this.onFilterLinkClick} filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>Completed</FilterLink>
        </p>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.querySelector('#root')
  )
}

store.subscribe(render)
render()
