import React from 'react';
import { StyleSheet, TextInput, Text, Platform, TouchableHighlight, View, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    
    form: {
        flex:1,
        padding: 15,
        alignItems: 'stretch',
        justifyContent: 'center',
        alignContent: 'center',
    },

    input: {
        flexGrow:0,
        flexShrink:1,
        flexBasis: 50,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor:'white',
        borderRadius:5,
        padding: 10,
        margin:5,
    },

    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 25,
        marginRight:100,
        marginLeft:100,
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'white',
        borderRadius:5,
        borderColor: 'black',
        borderWidth: 1,
    }

})

export default class ContactForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            name: '',
            phoneNumber: '',
            disabled: true,
        }
    }

    checkInfo = () => {
        if( this.state.name.length > 4 && this.state.name.length <= 20 && 
            +this.state.phoneNumber > 0 &&  this.state.phoneNumber.length == 11 ){
            this.setState({ disabled: false })
        }
        else
            this.setState({ disabled: true })
    }

    handleNameValue = name => {
        if( name.length <= 20 ){
            this.setState({name: name}, this.checkInfo)
        }
        // this.checkInfo()
    }

    handlePhoneValue = phoneNumber => {
        if( +phoneNumber >=0 && phoneNumber.length <= 11 ){
            this.setState({phoneNumber: phoneNumber}, this.checkInfo)
        }
        //this.checkInfo()
    }

    handleSubmit = () => {
        if( !this.state.disabled ){
            this.props.onSubmit( {...this.state} )
        }
    }

    render(){

        return(
            <View style={styles.form}>
                <TextInput
                    style={styles.input} 
                    value={this.state.name} 
                    onChangeText={this.handleNameValue}
                    placeholder='name'
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={styles.input}
                    value={this.state.phoneNumber} 
                    onChangeText={this.handlePhoneValue}
                    placeholder='phone number'
                    keyboardType="numeric"
                />
                <TouchableHighlight 
                    disabled={this.state.disabled}
                    style={styles.buttonContainer} 
                    onPress={this.handleSubmit}
                    underlayColor='#68c0cf'>
                    <Text>Submit</Text>
                </TouchableHighlight>
            </View>
        )

    }

}