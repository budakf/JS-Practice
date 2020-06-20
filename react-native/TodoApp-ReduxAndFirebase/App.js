import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { ListItem, CheckBox } from 'react-native-elements'
import Dialog from "react-native-dialog";

import store from './Store'
import * as Actions from './Actions'

export default class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            textValue: "",
            selectedTodoText: "", // update edilecek Todo nun o anki halini tutuyoruz
            updatedTodo: {id: "0", text: "", completed: false}, // update edilecek Todo nun o anki halini tutuyoruz
            dialogVisible: false,
            hasNewTodo: false
        }
    }

    componentDidMount = () => {
        store.subscribe(this.reRender)
    }

    addTodo = () => {
        if( this.state.textValue !== "" ){
            store.dispatch( Actions.addTodo( { text: this.state.textValue, completed: false } ) )
            this.setState({ textValue: "" })
        }    
    }

    deleteTodo = id => {
        store.dispatch( Actions.deleteTodo( id ) )
    }

    reRender = () => {
        this.setState({hasNewTodo: !this.state.hasNewTodo})
    }

    onChangeText = textValue => {
        this.setState({ textValue })
    }

    openDialog = todo => {
        this.setState({ dialogVisible: true, selectedTodoText: todo.text, updatedTodo: todo })
    }

    closeDialog = () => {
        this.setState({
            dialogVisible: false,
            updatedTodo: {id: "0", text: "", completed: false}, 
            selectedTodoText: "", 
        })
    }

    handleUpdateTodo = () => {
        store.dispatch( Actions.updateTodo( this.state.updatedTodo ) )
        this.closeDialog()
    }

    toggleCompleted = () => {
        this.setState({
            updatedTodo : { 
                id: this.state.updatedTodo.id,
                text: this.state.updatedTodo.text, 
                completed: !this.state.updatedTodo.completed,
            },
        })
    }

    renderItem = item => {
        return(
            <View>
                <ListItem
                    onLongPress = { () => this.deleteTodo(item.id) }
                    onPress = { () => this.openDialog(item) }
                    key={ item.id }
                    title={ item.text }
                    bottomDivider
                    checkmark={ item.completed }
                />
            </View>
        )
    }

    render(){
      
        return(
            <View style={styles.container}>
                <Text>

                </Text>
                <View style={styles.input}>
                    <TextInput style={styles.inputText}       
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.textValue} 
                    /> 
                    <TouchableOpacity onPress={ this.addTodo } >
                        <AntDesign name='plus' style={styles.addIcon} raised size={25} /> 
                    </TouchableOpacity>
                </View>
                <FlatList style={styles.list}
                    data={ store.getTodos() }
                    renderItem={ ({item}) => this.renderItem(item)  }
                />
                <Dialog.Container visible={this.state.dialogVisible} >
                    <View style={styles.dialogInputView } >
                        <Dialog.Input    
                            value={this.state.updatedTodo.text} 
                            style={styles.dialogInput}
                            onChangeText={updatedTodoText => this.setState({ updatedTodo: { id: this.state.updatedTodo.id, text: updatedTodoText, completed: this.state.updatedTodo.completed } } ) }
                        />
                        <CheckBox checked={this.state.updatedTodo.completed} checkedColor='teal' onPress={() => this.toggleCompleted()  } />
                    </View>
                    <Dialog.Button label="Cancel" onPress={ () => this.closeDialog()  } />
                    <Dialog.Button label="Update" onPress={ () => this.handleUpdateTodo() } />
                </Dialog.Container>
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
    dialogInputView:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems: "center"
    },
    dialogInput:{
        backgroundColor: '#f5f5f5', 
        borderRadius: 10, 
        paddingLeft: 10, 
        paddingRight: 10,
        flexGrow:1,
        width: 200
    },
});


