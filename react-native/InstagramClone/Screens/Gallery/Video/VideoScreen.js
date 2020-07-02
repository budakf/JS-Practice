import React from 'react';
import { StyleSheet, Text, Icon, View, Platform, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { withNavigationFocus } from 'react-navigation';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


class VideoScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            type: Camera.Constants.Type.back,
            isRecording: false,
        }
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {}
        return {
            headerTitle: "Video",
            headerLeft: () => (
                <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.navigate('ActivityScreen') }>
                    < Feather name='x' color={navigation.tintColor} size={30} />
                </TouchableOpacity>
            ),
        };
    };

    switchCameraType = () => {
        this.setState( prevState => ({
            type: prevState.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
      }))
    }

    takeCameraPermission = async () => {
		const {status} = await Camera.requestPermissionsAsync()
		this.setState({
			hasCameraPermission : status === "granted",
        })
    }

    takeCameraROLLPermission = async () => {
		const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		this.setState({
			hasCameraROLLPermission : status === "granted",
		})
    }

    takeAudioPermission = async () => {
		const {status} = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		this.setState({
			hasAudioPermission : status === "granted",
		})
	}

    recordVideo = async () => {
		if(this.camera){
			if(!this.state.isRecording){
				this.setState({isRecording: true})
				const {uri} = await this.camera.recordAsync()
				const saveResult = await MediaLibrary.createAssetAsync(uri)
				const isAvailable = await MediaLibrary.getAlbumAsync("InstagramClone/Videos")
				if(isAvailable === null){
					await MediaLibrary.createAlbumAsync("InstagramClone/Videos", saveResult.id, false)	
				}else{
					await MediaLibrary.addAssetsToAlbumAsync("InstagramClone/Videos", saveResult.id, false)	
				}	
	
			}else{
				this.camera.stopRecording()
				this.setState({isRecording: false})
			}
		}
	}
 
    async componentDidMount(){
		this.takeCameraPermission()
        this.takeCameraROLLPermission()
        this.takeAudioPermission()
	}

    render(){
        const {isFocused} = this.props
        return ( 
            isFocused && 
            <View style={styles.container}>    
                <Camera style={styles.cameraContainer} type={this.state.type} ref={(ref) => { this.camera = ref }} >
                    <TouchableOpacity style={styles.buttonContainer}  onPress={ () => this.switchCameraType() }>
                        < Entypo name='cycle' color="#d0d0d0" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} >
                        < FontAwesome name='flash' color="#d0d0d0" size={30} />
                    </TouchableOpacity>
                </Camera>
                <TouchableOpacity style={styles.videoButton} onPress={() => this.takePhoto() }>
                    < Ionicons name='ios-radio-button-on' color="#d0d0d0" size={100} />
                </TouchableOpacity>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    headerLeft:{
        padding:10,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
    },
    cameraContainer:{
		flex: 0.8, 
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: "transparent",
    },
    buttonContainer:{
		alignSelf: 'flex-end',
        marginBottom:10,
        padding: 10,
    },
    videoButton:{
        flex:0.2,
        padding:30,
        alignItems: 'center',
    }
});

export default  withNavigationFocus(VideoScreen)  