import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { withNavigationFocus } from 'react-navigation';

import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import  Ionicons  from 'react-native-vector-icons/Ionicons';


class CameraScreen extends React.Component{
  
  	constructor(props){
		super(props)

		this.state={
			type: Camera.Constants.Type.back,
			isRecording: false,
		}
  	}

	static navigationOptions = ({navigation}) => (
		{
			tabBarLabel: 'Camera',
			tabBarIcon : ({ tintColor }) => (
				< Ionicons name='md-camera' color={tintColor} size={25} />
			),
		}
	)

  	switchCameraType = () => {
	  	this.setState( prevState => ({
		  	type: prevState.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
		}))
  	}

  	takePhoto =  async () => {
	  	if(this.camera){
			const {uri} = await this.camera.takePictureAsync()
			const saveResult = await MediaLibrary.createAssetAsync(uri)
			const isAvailable = await MediaLibrary.getAlbumAsync("AppName/Photos")
			console.log(saveResult)
			if(isAvailable === null){
				await MediaLibrary.createAlbumAsync("AppName/Photos", {filename:"Deneme.jpg",id:saveResult.id}, false)
			}else{
				await MediaLibrary.addAssetsToAlbumAsync("AppName/Photos", {filename:"Deneme.jpg",id:saveResult.id}, false)	
			}
		}
  	}

	recordVideo = async () => {
		if(this.camera){
			if(!this.state.isRecording){
				this.setState({isRecording: true})
				const {uri} = await this.camera.recordAsync()
				const saveResult = await MediaLibrary.createAssetAsync(uri)
				const isAvailable = await MediaLibrary.getAlbumAsync("AppName/Videos")
				if(isAvailable === null){
					await MediaLibrary.createAlbumAsync("AppName/Videos", saveResult.id, false)	
				}else{
					await MediaLibrary.addAssetsToAlbumAsync("AppName/Videos", saveResult.id, false)	
				}	
	
			}else{
				this.camera.stopRecording()
				this.setState({isRecording: false})
			}
		}
	}

  	render(){
		const { isFocused } = this.props
	  	return (
			<View style={styles.container}>
				{ isFocused &&
				<Camera style={styles.cameraContainer} type={this.state.type} ref={(ref) => { this.camera = ref }} >
						<VideoButton isRecording={this.state.isRecording} recordVideo={() => this.recordVideo()} />
						{ !this.state.isRecording && <PhotoButton takePhoto={() => this.takePhoto()} /> }
						{ !this.state.isRecording && <SwitchButton switch={() => this.switchCameraType()} /> }
				</Camera>
	  			} 
    
			</View>
		);
	}

}


function VideoButton(props){

	return(
		<TouchableOpacity style={ styles.videoButton } onPress={() => props.recordVideo() }>
			<MaterialCommunityIcons name={ props.isRecording ? "video-off": "video"} 
				size={40} color={ props.isRecording ? "red": "white"}/> 
		</TouchableOpacity>
	)

}

function PhotoButton(props){

	return(
		<TouchableOpacity style={ styles.photoButton } onPress={() => props.takePhoto() }>
			<MaterialCommunityIcons name="camera" size={40} color="white"/> 
		</TouchableOpacity>
	)

}

function SwitchButton(props){

	return(
		<TouchableOpacity style={ styles.switchButton } onPress={ () => props.switch() }>
			<MaterialCommunityIcons name="video-switch" size={40} color="white"/> 
		</TouchableOpacity>
	)

}


const styles = StyleSheet.create({

	container:{
		flex: 1, 
		flexDirection: "column",
		backgroundColor: "transparent",
	},

	cameraContainer:{
		flex: 1, 
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: "transparent",
	},
  
	videoButton: {
		alignSelf: 'flex-end',
		alignItems: 'center',
		marginBottom: 50,
		backgroundColor: "transparent",
	},

	photoButton: {
		alignSelf: 'flex-end',
		alignItems: 'center',
		marginBottom: 50,
		backgroundColor: "transparent",
	},

	switchButton: {
		alignSelf: 'flex-end',
		alignItems: 'center',
		marginBottom: 50,
		backgroundColor: "transparent",
	},

});

export default withNavigationFocus(CameraScreen)
