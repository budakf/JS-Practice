import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';


export default class ContactDetailsScreen extends React.Component{

    constructor(props){
        super(props)
    }

    static navigationOptions = ({navigation}) => (
        {
            headerTitleAlign: 'center',
            headerTitle: navigation.getParam("contact").name,
            headerRight: () => (
                <TouchableOpacity style={styles.edit}>
                    <Text style={{color:'lightblue'}}> Edit </Text>
                </TouchableOpacity>
            ),
        }
    )
    

    render(){
        return(
            <View style={styles.container} >
                <Image style={styles.image}
                    source={ { uri: this.props.navigation.getParam('contact').photo.large } }  />
                <Text style={styles.text} > 
                    email : { this.props.navigation.getParam('contact').email } 
                </Text>
                <TouchableOpacity>
                    <Text style={styles.text} > 
                        cell phone: { this.props.navigation.getParam('contact').cell } 
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text} > 
                        phone: { this.props.navigation.getParam('contact').phone } 
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop : 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    text: {
        marginTop: 10,
        fontSize: 15,
        color: 'gray'
    },
    edit: {
        marginRight: 10,
    }
    

})