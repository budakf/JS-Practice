import {Reducer} from './Reducers'
import * as firebase from 'firebase'
import ignoreWarnings from 'react-native-ignore-warnings';
ignoreWarnings('Setting a timer');

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "blabla.firebaseapp.com",
    databaseURL: "https://blabla.firebaseio.com",
    projectId: "blabla",
    storageBucket: "blabla.appspot.com",
    appId: "APP_ID",
};
  
firebase.initializeApp(firebaseConfig);


class Store{

    constructor(reducer, state){

        if(!!Store.instance){
            return Store.instance
        }

        Store.instance = this
        this.reducer = reducer
        this.state = state
        this.subscribers = new Set()

        return this
    }

    getState(){
        return this.state
    }

    getTodos(){
        return this.state.todos
    }

    setTodos( todos ){
        this.state.todos = todos
        this.subscribers.forEach( callback => callback() )
    }

    subscribe(callback){
        this.subscribers.add(callback)
    }

    unsubscribe(callback){
        this.subscribers.delete(callback)
    }

    dispatch(action){
        this.state = this.reducer( this.state, action )
        this.subscribers.forEach( callback => callback() )
        if(action.type === 'ADD_TODO')
            this.sendDataToFireBase(action)
        else if(action.type === 'DELETE_TODO')
            this.deleteDataFromFireBase(action)
    }

    sendDataToFireBase(action){
        firebase.database().ref('todos/' + action.id ).set({
            id: action.id,
            text: action.payload
        });
    }

    receiveDataFireBase(){
        firebase.database().ref('todos/').on('value', (todos) => {

            let result = []
        
            for (let [key, value] of Object.entries(todos.val() )) {
                result.push({ id: key, text: value.text})
            }

            store.setTodos( result )
        
        });
    }

    deleteDataFromFireBase(action){
        firebase.database().ref('todos/' + action.id).remove()
    }

};

let store = new Store( Reducer, { todos: [] } )
store.receiveDataFireBase()


export default store


