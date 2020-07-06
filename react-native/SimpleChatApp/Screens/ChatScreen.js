import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, FlatList, Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MessageBubble from "./MessageBubble"
import { ImageBackground } from 'react-native';
import firebase, {auth} from '../FirebaseAuthentication'
import ignoreWarnings from 'react-native-ignore-warnings';
ignoreWarnings('Setting a timer');

export default class  ChatScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            messages: [],
            newMessage: ""
        }
    }

    
    static navigationOptions = ({ navigation }) => {
        return{
            title:navigation.getParam('friendName',''),
            headerStyle:{
                backgroundColor: '#0F4B73',
            },
            headerTintColor: 'white',
            headerRight: () => ( 
                <View style={{ width: 70, marginRight: 10, flexDirection:'row', justifyContent:"space-between" }} > 
                    <MaterialIcons name="videocam" color="white" size={25}  onPress={() => navigation.push("VideoCallScreen") } /> 
                    <MaterialIcons name="phone" color="white" size={25}  onPress={() => navigation.push("VoiceCallScreen") } />                 
                </View> 
            ),
        }
    }


    UNSAFE_componentWillMount = async () => {

        const messageDBId = auth.currentUser.uid < this.props.navigation.getParam('friendUid','') ? 
                        auth.currentUser.uid  + '-' + this.props.navigation.getParam('friendUid','') :
                        this.props.navigation.getParam('friendUid','') + '-' + auth.currentUser.uid

        console.log("messageDBId: ", messageDBId)

        await firebase.database().ref('messages/' + messageDBId).on('value', (messages) => {
            let result = []
            for (let [key, value] of (Object.entries(messages.val() || []) )){
                result.push({ id: key, from: value.from, to: value.to, content: value.content, shown: value.shown })
            }
            this.setState( { messages : result })        
        });
        
    }


    newMessageHandler = newMessage => {
        this.setState({newMessage})
    }


    sendNewMessageToServer = async (message) => {
        const result = await fetch(`http://192.168.1.24:4040/message/send`, { 
            method: 'POST',
            headers:{ 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message }) // body data type must match "Content-Type" header
        })
    }


    sendNewMessage = () => {
        if(this.state.newMessage !== ""){

            const messageDBId = auth.currentUser.uid < this.props.navigation.getParam('friendUid','') ? 
                            auth.currentUser.uid  + '-' + this.props.navigation.getParam('friendUid','') :
                            this.props.navigation.getParam('friendUid','') + '-' + auth.currentUser.uid

            this.sendNewMessageToServer({
                messageDBId: messageDBId,
                from: auth.currentUser?.email,
                to: this.props.navigation.getParam('friendEmail',''),
                content: this.state.newMessage
            })
            this.setState(
                {
                    newMessage:"",
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
                        renderItem= {({item}) => <MessageBubble text={item?.content} mine={item?.from === auth.currentUser.email} />  }
                        keyExtractor={item => item?.id}
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
                        <MaterialIcons  name="send" color="#0F4B73" size={35}  onPress={() => this.sendNewMessage() } /> 
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


