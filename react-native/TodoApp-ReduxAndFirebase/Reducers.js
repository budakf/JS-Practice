import * as Actions from './Actions.js';


export function todoReducer (state = [], action) {
    if(action.type === Actions.ADD_TODO){
        return [ ...state, {text: action.payload.text, completed: action.payload.completed, id: action.id } ]
    }
    else if(action.type === Actions.DELETE_TODO){
        console.log("DELETE_TODO")
        state = state.filter( s => s.id !== action.id )
        return state
    }
    else if(action.type === Actions.UPDATE_TODO){
        console.log("UPDATE_TODO")
        state = state.map( todo => {
            if(todo.id === action.id ){
                todo.text = action.payload.text
                todo.completed = action.payload.completed
            }
            return todo
        })
      
        return state
    }
    return state
}


export const Reducer = (state, action) =>{

    return {
        todos: todoReducer(state.todos || [], action)
    }

}

