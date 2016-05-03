import React from 'react'

export default({ onAddTodo }) => {
	let input;

	return (
		<div>
	    <input ref={node => { input = node }} />
	    <button onClick={(e) => {
	    	onAddTodo(input, e);
	    	input.value = ''
	    }}>Add Todo</button>
	  </div>
  )
}