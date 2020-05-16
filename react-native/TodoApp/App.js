import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import Row from "./Row"
import NewTodo from "./NewTodo"


export default class App extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      todos: [],
    }

  }

  generateKey = () =>{
    return `${"key_"}${new Date().getTime()}`
  }

  addTodo = newTodo => {
    this.setState({
      //todos: [...this.state.todos, { text:newTodo, checkmark:false }].map( (val, key) => ({ ...val, key:key.toString()}) ),
      todos: [...this.state.todos, { key:this.generateKey(), text:newTodo, checkmark:false }],
    })
  }

  deleteTodo = key => {
    this.setState({
      todos: this.state.todos.filter( todo => {
        if( todo.key === key){
          return false
        }
        return true
      })
    })
  }

  toggleTodo = key => {
    this.setState({
      todos: this.state.todos.map( todo => {
        if( todo.key === key){
          return {text:todo.text, key:todo.key, checkmark: !todo.checkmark}
        }
        return {...todo}
      })
    })
  }

  renderItem = (todo) => (
    <Row todo={todo}
      toggleTodo={ () => this.toggleTodo(todo.key) }
      deleteTodo={ () => this.deleteTodo(todo.key) }
    />
  )

  render(){
    console.log( this.state.todos.map(todo => todo.key) )
    return(
      <View style={styles.container}>
        <NewTodo addTodo={this.addTodo}/>
        <FlatList
          data={this.state.todos}
          renderItem={ ({item}) => this.renderItem(item)  }
        />        
      </View>

    );
  }
} 


const styles = StyleSheet.create({
  
  container:{
    flex:1,
    paddingTop: 50,
  },
})