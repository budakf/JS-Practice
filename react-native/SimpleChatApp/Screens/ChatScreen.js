import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, FlatList, Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MessageBubble from "./MessageBubble"
import { ImageBackground } from 'react-native';


export default class  ChatScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            messages: [ 
                {content:"Fatih Deneme Message1", isMine:true},
                {content:"Fatih Deneme Message2", isMine:false},
                {content:"Fatih Deneme Message3", isMine:true},
                {content:"Fatih1", isMine:true},
                {content:"Fatih Deneme Message4", isMine:false},
                {content:"Fatih2", isMine:true},
                {content:"Fatih3", isMine:false},
            ],
            newMessage: ""
        }
    }

    static navigationOptions = ({ navigation }) => {
        return{
            title:"",
            headerStyle:{
                backgroundColor: '#0F4B73',
            },
            headerTintColor: 'white',
        }
    }

    newMessageHandler = (newMessage) => {
        this.setState({newMessage})
    }

    sendnewMessage = () => {
        if(this.state.newMessage !== ""){
            this.setState(
                {
                    messages:[...this.state.messages, { content: this.state.newMessage, isMine: true }],
                    newMessage:""
                }
            )
            this.textInput.clear()
            Keyboard.dismiss()
        }
        
    }

    render(){

        return(
            <View style={styles.container}>
                <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage} >
                    <FlatList
                        style={styles.flatList}
                        data={this.state.messages}
                        renderItem= {({item}) => <MessageBubble text={item.content} mine={item.isMine} />  }
                        keyExtractor={item => item.content}
                    />
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView} >
                        <TextInput
                            ref={ textInput => { this.textInput = textInput }}
                            text={this.state.newMessage} 
                            style={styles.input}
                            multiline
                            autoCapitalize='none'
                            adjustResize='windowSoftInputMode'
                            onChangeText={ this.newMessageHandler } 
                        />
                        <MaterialIcons  name="send" color="#0F4B73" size={35}  onPress={() => this.sendnewMessage() } /> 
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    container:{
        flex:1,
        // alignItems:'center',
        justifyContent:'center',
    },
    backgroundImage:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    flatList:{
        marginTop:10,
    },
    keyboardAvoidingView:{
        // backgroundColor:"red", 
        flexDirection: "row", 
        marginBottom: 10, 
        alignItems:"center",
        justifyContent: "center"
    },
    input:{
        flex:1,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft: 20,
        paddingRight: 10,
        marginLeft: 10,
        marginRight: 5,
        borderRadius: 20,
        borderWidth:0.5,
        backgroundColor:'white',
    },

});


