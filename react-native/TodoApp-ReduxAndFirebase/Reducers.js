import * as Actions from './Actions.js';


export function todoReducer (state = [], action) {
    if(action.type === Actions.ADD_TODO) {
        return [ ...state, {text: action.payload, id: action.id } ]
    }
    else if(action.type === Actions.DELETE_TODO){
        console.log("DELETE_TODO")
        state = state.filter( s => s.id !== action.id )
        return state
    }
    return state
}


export const Reducer = (state, action) =>{

    return {
        todos: todoReducer(state.todos || [], action)
    }

}
