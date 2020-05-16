import React from "react"
import {render} from "react-dom"


let id = 0;

const Todo = props =>(
    <li>
        <input type="checkbox" checked={props.todo.checked} onChange={props.toggleTodo}/>
        <button onClick={ props.deleteTodo } >Delete</button>
        <span>{props.todo.text}</span>
    </li>
)

class App extends React.Component {

    constructor(){
      super()
      this.state = {
        todos: []
      }
    }

    addTodo(){
      const text = prompt("Please Add New Todo")
      this.setState({ 
        todos: [...this.state.todos, {id: id++, text: text, checked: false} ] 
      })
    }

    deleteTodo(id){
        this.setState({
          todos: this.state.todos.filter( todo => todo.id != id )
        })
    }

    toggleTodo(id){
        this.setState({
          todos: this.state.todos.map( todo => {
            if(todo.id !== id) return todo
            return {
              id: todo.id,
              text: todo.text,
              checked: !todo.checked
            }
          })
        })
    }

    render(){
      return(
          <div>
              <div>Total Todo Count: {this.state.todos.length}</div>
              <div>Checked Todo Count: {this.state.todos.filter( todo => todo.checked).length}</div>
              <div>UnChecked Todo Count: {this.state.todos.filter( todo => !todo.checked).length}</div>

              <button onClick={() => this.addTodo() } >Add Todo</button>
              <ul>
                  { this.state.todos.map( 
                    todo => <Todo 
                      todo={todo} 
                      deleteTodo={() => this.deleteTodo(todo.id)} 
                      toggleTodo={() => this.toggleTodo(todo.id)} 
                      /> ) }
              </ul>
          </div>
      )
    }

}

export default App;
