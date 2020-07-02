import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import * as Font from 'expo-font'
import * as Facebook from 'expo-facebook'


export default class  LoginScreen extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            // email:"",
            // password:"",
            // disabled:true,
            fontLoaded:false,
        }
        
    }

    async UNSAFE_componentWillMount() {
        await Font.loadAsync({
          'DancingScript': require('../assets/fonts/DancingScript-VariableFont_wght.ttf')
        });
        this.setState({ fontLoaded: true })
    }

    // emailHandler = email => {
    //     this.setState( { email } , this.shoudEnabledButton)
    // }

    // passwordHandler = password => {
    //     this.setState( {password} , this.shoudEnabledButton)
    // }

    // shoudEnabledButton = () => {
    //     if( this.state.email !== "" && this.state.password !== "" ){
    //         this.changeButtonColorAndEnable(false, "#6499bc")
    //     }else{
    //         this.changeButtonColorAndEnable(true, "lightblue")
    //     }
    // }

    // changeButtonColorAndEnable = (state, color)  => {
    //     this.setState({ disabled: state })
    //     this.loginButton.setNativeProps({
    //         style:{backgroundColor: color }
    //     });
    // }

    login = async () => {

        this.props.navigation.navigate( 'HomeScreen', { type: "PARAM" } )

        // try {
        //     await Facebook.initializeAsync('APP_ID');
        //     const result = await Facebook.logInWithReadPermissionsAsync({
        //       permissions: ['public_profile', ],
        //     });
        //     if(result.type === 'success'){
        //         console.log("Success: ", JSON.stringify( result ))
        //         const token = result.token
        //         const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
                
        //         console.log('Logged in!', `Hi ${(await response.json()).name}!`)
                
        //         this.props.navigation.navigate( 'HomeScreen', { 
        //             type: result.type, 
        //             token: result.token, 
        //             expires: result.expires, 
        //             permissions: result.permissions,
        //             declinedPermissions: result.declinedPermissions,
        //          }, )

        //     }else{
        //         console.log("Fail")
        //     }
        //   } catch ({ message }) {
        //     console.log(`Facebook Login Error: ${message}`);
        //   }

    }

    signUp = () => {
        console.log("signUp")
    }

    render(){
        
        return(
            <View style={styles.container}>

                { this.state.fontLoaded &&<Text style={styles.instaText} > Instagram </Text> }

                {/* <TextInput text={this.state.email} style={styles.input}
                    autoCapitalize='none'
                    placeholder='email'
                    onChangeText={ this.emailHandler } 
                />
                <TextInput  text={this.state.password} style={styles.input}
                    secureTextEntry
                    autoCapitalize='none'
                    placeholder='password'
                    onChangeText={ this.passwordHandler } 
                /> */}
                
                <TouchableHighlight title="LoginTitle"  ref={ref => {this.loginButton = ref } }
                    onPress={ this.login }
                    underlayColor='teal'
                    style={styles.loginButton} 
                >
                    <Text style={styles.loginText} > Login With Facebook </Text>
                </TouchableHighlight>

                {/* <Text onPress={ this.forgetPassword } style={styles.forgetPassword}  > 
                    Forget Password? 
                </Text>

                <Text style={styles.or}> OR </Text>

                <Text onPress={ this.signUp } style={styles.signUp}  > Don't have an account? 
                    <Text style = {{ color: '#468499' }}> SignUp </Text>
                </Text> */}

            </View>
        );
    }

}


const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'stretch',
        justifyContent:'center',
        marginTop: StatusBar.currentHeight,
    },

    instaText:{
        marginBottom: 30,
        textAlign: 'center',
        fontSize: 50,
        fontFamily:"DancingScript",
    },

    // input:{
    //     alignItems: "center",
    //     paddingTop:10,
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     marginBottom: 10,
    //     marginLeft: 20,
    //     marginRight: 20,
    //     borderColor:"lightgray",
    //     borderRadius:3,
    //     borderWidth:1,
    //     backgroundColor:'#F5F5F5',
    // },

    loginButton:{
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        borderRadius:3,
        backgroundColor:'lightblue',
    },

    loginText:{
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 100,
        marginRight: 100,
        color:"white",
        textAlign: 'center',
    },

    // forgetPassword:{
    //     marginTop: 5,
    //     marginLeft: Dimensions.get('window').width - 160,
    //     color:'#468499',
    // },

    // or:{
    //     fontSize: 14,
    //     marginTop: 25,
    //     alignSelf: 'center',
    //     color: '#A2A2A2'
    // },

    // loginWithFaceBookButton:{
    //     marginTop: 20,
    //     marginRight: 100,
    //     marginLeft: 100,
    //     textAlign: 'center',
    //     color:'#468499',
    // },

    // signUp:{
    //     marginTop: 10,
    //     textAlign: 'center',
    // }

});
