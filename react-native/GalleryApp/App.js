import React from 'react';
import { View, StatusBar, ActivityIndicator} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import CameraScreen  from "./Screen/CameraScreen"
import AudioScreen from "./Screen/AudioScreen"

import AudioLibraryScreen from "./Screen/AudioLibraryScreen"
import AudioPlayerScreen from "./Screen/AudioPlayerScreen"

import VideoLibraryScreen from "./Screen/VideoLibraryScreen"
import VideoPlayerScreen from "./Screen/VideoPlayerScreen"

import PhotoLibraryScreen from "./Screen/PhotoLibraryScreen"
import PhotoDisplayScreen from "./Screen/PhotoDisplayScreen"


const AudioLibraryStack = createStackNavigator(
	{
		AudioLibraryScreen:{
			screen: AudioLibraryScreen,
		},
		AudioPlayerScreen:{
			screen: AudioPlayerScreen,
		},
	},
	{
		initialRouteName:"AudioLibraryScreen",
		navigationOptions: {
			title: "Audio",
		}
	}

)

const VideoLibraryStack = createStackNavigator(
	{
		VideoLibraryScreen:{
			screen: VideoLibraryScreen,
		},
		VideoPlayerScreen:{
			screen: VideoPlayerScreen,
		},
	},
	{ 
		initialRouteName:"VideoLibraryScreen",
		navigationOptions: {
			title: "Video",
		}
	}
	
)

const PhotoLibraryStack = createStackNavigator(
	{
		PhotoLibraryScreen:{
			screen: PhotoLibraryScreen,
		},
		PhotoDisplayScreen:{
			screen: PhotoDisplayScreen,
		},
	},
	{
		initialRouteName:"PhotoLibraryScreen",
		navigationOptions: {
			title: "Photo",
		}
	}

)

const LibraryNavigator = createMaterialTopTabNavigator(
	{
		AudioLibraryStack:{
			screen: AudioLibraryStack,
		},
		VideoLibraryStack:{
			screen: VideoLibraryStack,
		},
		PhotoLibraryStack:{
			screen: PhotoLibraryStack,
		},
	},
	{
		initialRouteName:'AudioLibraryStack',
		tabBarOptions:{
			indicatorStyle: { 
				backgroundColor: "teal" 
			},
			activeTintColor:'teal',
			inactiveTintColor:'gray',
			style: {
				marginTop: Constants.statusBarHeight,
				backgroundColor: 'transparent',
				//height:70,
			},
			//showIcon:true,

		},
	}
)


const MainNavigator = createBottomTabNavigator(
	{
		LibraryNavigator:{
			screen:LibraryNavigator,
			navigationOptions:{
				tabBarLabel: 'Library',
				tabBarIcon : ({ tintColor }) => (
					< MaterialCommunityIcons name='library' color={tintColor} size={25} />
				),
			}
		},
		AudioScreen:{
			screen:AudioScreen,
		},
		CameraScreen:{
			screen:CameraScreen,
		},
	},
	{
		initialRouteName:'LibraryNavigator',
		tabBarOptions:{
			activeTintColor:'teal',
			style: {
				backgroundColor: 'white',
			}
		},
	}
)

const AppContainer = createAppContainer(MainNavigator)


export default class App extends React.Component{
	
	constructor(props){
		super(props)

		this.state={
			hasCameraPermission: false,
			hasCameraROLLPermission: false,
			hasAudioPermission: false,
		}
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

	async componentDidMount(){
		this.takeCameraPermission()
		this.takeCameraROLLPermission()
		this.takeAudioPermission()
		StatusBar.setBackgroundColor("transparent")
	}

	render(){
		if( !this.state.hasCameraPermission || !this.state.hasCameraROLLPermission || !this.state.hasAudioPermission ){
			return(
				<View style={{flex:1, justifyContent:"center", flexDirection:"row"}} >
					<ActivityIndicator size="large" color="teal" />
				</View>
			)
		}else if( this.state.hasCameraPermission === true ){
			return (
				<AppContainer/>
			);
		}
	}
}
