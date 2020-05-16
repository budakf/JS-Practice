import React from 'react';
import { StyleSheet, StatusBar, View, TouchableOpacity, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { withNavigationFocus } from 'react-navigation';
import  FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Audio } from 'expo-av';


class AudioScreen extends React.Component{
  
  	constructor(props){
		super(props)

		this.state={
			isRecording: false,
			time: "00:00",
			intervalId: 0,
			audioRecorder: null,
		}
  	}

	static navigationOptions = ({navigation}) => (
		{
			tabBarLabel: 'Audio',
			tabBarIcon : ({ tintColor }) => (
				< FontAwesome name='microphone' color={tintColor} size={25} />
			),
		}
	)

	
	doRecord = async () =>{
		await this.state.audioRecorder.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
		const result = await this.state.audioRecorder.startAsync();
		if(result.canRecord){
			this.setState({
				isRecording: result.isRecording,
				intervalId:	 setInterval(() => this.increaseTimer(), 1000),
			})
		}
	}

	recordAudio = async () => {
		try {
			this.setState({ audioRecorder: new Audio.Recording()}, this.doRecord )
		}catch (error) {
		  console.error(error)
		}
	}

	stopAudioRecord = async () => {
		clearInterval(this.state.intervalId)
		this.setState({
			isRecording: false,
			intervalId:	 0,
			time: "00:00",
		})
		const result = await this.state.audioRecorder.stopAndUnloadAsync()
		if(result.isDoneRecording){
			const saveResult = await MediaLibrary.createAssetAsync(this.state.audioRecorder.getURI())
			const isAvailable = await MediaLibrary.getAlbumAsync("AppName/Audios")
			if(isAvailable === null){
				await MediaLibrary.createAlbumAsync("AppName/Audios", saveResult.id, false)	
			}else{
				await MediaLibrary.addAssetsToAlbumAsync("AppName/Audios", saveResult.id, false)	
			}		
		}

	}

	increaseTimer = () => {

		let time = this.state.time.split(":")
		let seconds = (+time[0]) * 60 + (+time[1])
		seconds += 1
	
		let min = Math.floor(seconds/60)
		min = min > 9 ? min+"" : "0"+min
		let sec = seconds%60 + ""
		sec = sec > 9 ? sec+"" : "0"+sec
	
		time = min+":"+sec

		this.setState({ time: time })
	}

  	render(){
		const { isFocused } = this.props
	  	return (
			<View  style={styles.container}>
				{	!this.state.isRecording && 
					<TouchableOpacity style={styles.startAudioRecord}
						onPress={ async () => this.recordAudio()}>
						<MaterialCommunityIcons name='microphone' color="white" size={40} />
					</TouchableOpacity>
				}
				{
					this.state.isRecording && 
					<Text style={styles.text}>
						Recording Audio
					</Text>
				}
				{
					this.state.isRecording && 
					<Text style={styles.time} >
						{this.state.time}
					</Text>
				}
				{ 	this.state.isRecording && 
					<TouchableOpacity style={styles.stopAudioRecord}
						onPress={ async () => this.stopAudioRecord()}>
					</TouchableOpacity>
				}
            </View>
		);
	}

}

const styles = StyleSheet.create({

	container:{
		flex: 1, 
		backgroundColor:"white",
		justifyContent:"center",
		alignItems:"center",
	},

	startAudioRecord:{
		padding:30,
		borderRadius:60,
		backgroundColor:"red",
	},

	stopAudioRecord:{
		padding:25,
		marginTop:150,
		justifyContent:"flex-end",
		backgroundColor:"red",
	},

	text:{
		color:"teal",
		fontSize:25,
		marginTop:150,
	},

	time:{
		color:"lightgray",
		fontSize:45,
	}

});

export default withNavigationFocus(AudioScreen)
