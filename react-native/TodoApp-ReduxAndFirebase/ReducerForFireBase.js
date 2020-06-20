import * as Actions from './Actions.js';
import * as firebase from 'firebase'


export function todoReducerForFireBase (action) {
    if(action.type === Actions.ADD_TODO){
        console.log("ADD_TODO")
        saveDataToFireBase(action)
    }
    else if(action.type === Actions.DELETE_TODO){
        console.log("DELETE_TODO") 
        deleteDataFromFireBase(action)
    }
    else if(action.type === Actions.UPDATE_TODO){
        console.log("UPDATE_TODO")
        updateDataToFireBase(action)
    }
}


saveDataToFireBase = (action) => {
    firebase.database().ref('todos/' + action.id ).set({
        id: action.id,
        text: action.payload.text, 
        completed: action.payload.completed,
    });
}

updateDataToFireBase = (action) => {
    let updates = {};
    updates['/todos/' + action.id] = { id: action.id, text: action.payload.text, completed: action.payload.completed };
    firebase.database().ref().update(updates);
}

deleteDataFromFireBase = (action) => {
    firebase.database().ref('todos/' + action.id).remove()
}

export const ReducerForFireBase = (action) =>{

    todoReducerForFireBase(action)

}
