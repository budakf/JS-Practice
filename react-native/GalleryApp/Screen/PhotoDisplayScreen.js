import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Dimensions, Slider } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {ListItem} from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import * as FileSystem from 'expo-file-system';


class PhotoDisplayScreen extends React.Component{
    
  	constructor(props){
		super(props)
        this.filePath="file:///storage/emulated/0/AppName/Photos/" + this.props.navigation.getParam("filename")
    }

    static navigationOptions = ({navigation}) => (
		{
			headerShown: false,
		}
	)

  
	render(){
        
        const{ isFocused } = this.props
		return(
		  	<View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.pop() }>
                    <AntDesign name="arrowleft" size={30} color="white"/>     
                </TouchableOpacity>  
                <Image  style={styles.audioBackgroundImage}
                    source={{uri:this.filePath}}>
                </Image>   
            </View>
	  	);
  	}

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection:"column",
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: "black"
    },    
    backButton:{
        alignSelf:"flex-start",
        paddingRight:10,
        paddingLeft:10,
    },
    audioBackgroundImage:{
        marginBottom:45,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.65,
    },

})


export default withNavigationFocus(PhotoDisplayScreen)

