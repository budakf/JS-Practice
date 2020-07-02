import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import * as Font from 'expo-font'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


export default class HomeScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            token:"EAAIsMAL0dN4BAN33sMmPNtEwmLXOcrvRyQYU5W3Om49hizKpQYFZBU7ZBsZCtwVxstSpDRHqMBWypj96jK6iZCNaCcgb16Ga48kbx0n9rb4kyfABlgt3uVw7wJUKEDTE0AwUwlYpLSgNw506qhGP1VK3RlFBcbvNX0POon9BjGc5eISWSZAkab1Jz0t8D0TZA9Q2W7HKBMBAZDZD",
        }
    }

    async componentDidMount(){
        await Font.loadAsync({
          'DancingScript': require('../assets/fonts/DancingScript-VariableFont_wght.ttf')
        });
        let fontLoaded = true 
        this.props.navigation.setParams({ 
            fontLoaded,
        });

        const token = this.state.token
        const response = await fetch(`https://api.instagram.com/v1/media/popular`)
        console.log(JSON.stringify(response))
    }
    
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {}

        return {
            headerTitle: () => {null},
            headerLeft: () => (
                <View style={styles.headerLeft}>
                    < SimpleLineIcons name='camera' color={navigation.tintColor} size={30} />
                    { params.fontLoaded && <Text style={styles.instaText} > Instagram </Text>}
                </View>
            ),
            headerRight: () => (
                < FontAwesome style={styles.headerRight}  name='send-o' color={navigation.tintColor} size={30} />
            ),
        };
    };

    render(){
        return (
            <View style={styles.container}>    
                <Text> Home Screen </Text>
                <Text> { this.props.navigation.getParam('type',"TOKEN") } </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerLeft:{
        flexDirection:"row",
        marginLeft: 10,
    },
    instaText:{
        fontSize: 20,
        fontFamily:"DancingScript",
    },
    headerRight:{
        marginRight: 20
    },
});