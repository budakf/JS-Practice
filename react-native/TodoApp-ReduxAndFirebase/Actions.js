export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';


export function addTodo( payload ){
    return {
        type: ADD_TODO,
        id: Date.now().toString(),
        payload
    }
}

export function deleteTodo( id ){
    return{
        type: DELETE_TODO,
        id
    }
}

export function updateTodo( payload ){
    return{
        type: UPDATE_TODO,
        id : payload.id,
        payload: {
            text: payload.text, 
            completed: payload.completed,
        }
    }
}

 