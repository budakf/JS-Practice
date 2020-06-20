import {Reducer} from './Reducers'
import {ReducerForFireBase} from './ReducerForFireBase'
import * as firebase from 'firebase'

import ignoreWarnings from 'react-native-ignore-warnings';
ignoreWarnings('Setting a timer');

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    appId: "",
};

firebase.initializeApp(firebaseConfig);


class Store{

    constructor(reducerForFireBase, reducer, state){

        if(!!Store.instance){
            return Store.instance
        }

        Store.instance = this
        this.reducer = reducer
        this.reducerForFireBase = reducerForFireBase
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

    reduce(action){
        this.state = this.reducer( this.state, action )
        this.reducerForFireBase( action )
    }

    dispatch(action){
        this.reduce( action )
        this.subscribers.forEach( callback => callback() )
    }

    receiveDataFireBase(){
        firebase.database().ref('todos/').on('value', (todos) => {
    
            let result = []

            for (let [key, value] of Object.entries(todos.val() )) {
                result.push({ id: key, text: value.text, completed: value.completed})
            }
    
            store.setTodos( result )
        
        });
    }

};

let store = new Store( ReducerForFireBase, Reducer, { todos: [] } )
store.receiveDataFireBase()


export default store


