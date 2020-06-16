import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ListItem } from 'react-native-elements'

import store from './Store'
import {Reducer} from './Reducers'
import * as Actions from './Actions'

export default class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            textValue: "",
            hasNewTodo: false
        }
    }

    componentDidMount = () => {
        store.subscribe(this.updateTodos)
    }

    addTodo = () => {
        if( this.state.textValue !== "" ){
            store.dispatch( Actions.addTodo( this.state.textValue ) )
            this.setState({ textValue: "" })
        }    
    }

    deleteTodo = id => {
        store.dispatch( Actions.deleteTodo( id ) )
    }

    updateTodos = () => {
        this.setState({hasNewTodo: !this.state.hasNewTodo})
    }

    onChangeText = textValue => {
        this.setState({ textValue })
    }

    renderItem = item => {
        return(
            <View>
                <ListItem
                  onLongPress = { () => this.deleteTodo(item.id) }
                  key={item.id}
                  title={item.text}
                  bottomDivider
                />
            </View>
        )
    }
    
    render(){
      
        return(
            <View style={styles.container}>
                <View style={styles.input}>
                    <TextInput style={styles.inputText}       
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.textValue} 
                    /> 
                    <TouchableOpacity onPress={ this.addTodo } >
                        <AntDesign name='plus' style={styles.addIcon} size={25} /> 
                    </TouchableOpacity>
                </View>
                <FlatList style={styles.list}
                    data={ store.getTodos() }
                    renderItem={ ({item}) => this.renderItem(item)  }
                    // keyExtractor = { item => item.id }
                />   
            </View>
        );
    }
}


const styles = StyleSheet.create({

  container: {
      flex: 1,
      justifyContent: 'space-between',
      marginTop: StatusBar.currentHeight
  },
  input: {
      flexDirection: 'row',
      alignItems: 'center',
      width: Math.round( Dimensions.get("window").width ) ,
      height: StatusBar.currentHeight * 2,
      marginTop: StatusBar.currentHeight * 2,
  },
  inputText: {
      marginLeft: 20,
      paddingLeft: 10,
      width: Math.round( Dimensions.get("window").width ) - 80 ,
      height: StatusBar.currentHeight * 2,
      backgroundColor:"#f5f5f5",
      borderRadius:20,
  },
  addIcon: {
      padding : 15,
      color:'teal',
  },
  list:{
  }

});


