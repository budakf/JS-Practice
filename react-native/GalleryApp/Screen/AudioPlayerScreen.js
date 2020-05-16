import React from 'react';
import { View, TouchableOpacity, StyleSheet, Slider, Dimensions, Image } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import  Ionicons from 'react-native-vector-icons/Ionicons';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av';


class AudioPlayerScreen extends React.Component{
    
	constructor(props){
        super(props)

        this.filePath = "file:///storage/emulated/0/AppName/Audios/" + props.navigation.getParam("filename")
        this.soundObject = new Audio.Sound();
        this.intervalId = 0

        this.state = {
            isPlaying : true,
            duration : 0,
            sliderValue : 0,
        }

    }
    
    static navigationOptions = ({navigation}) => (
		{
            headerShown: false,
		}
    )

    changeAudioTime(sliderValue){
        this.soundObject.setPositionAsync(sliderValue*1000)
        this.setState({sliderValue})
    }
    
    moveSlider = () => {
        if(this.intervalId === 0){
            this.intervalId = setInterval( () => {
                this.setState({sliderValue: ++this.state.sliderValue})            
            }, 1000);
        }
    }

    stopSlider = () => {
       clearInterval(this.intervalId)
       this.intervalId = 0
    }

    onPlaybackStatusUpdate = playbackStatus => {
        if (!playbackStatus.isLoaded) {
            if (playbackStatus.error) {
              console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            }
        }else {
            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                this.stop()
            }
        }
    }
    
    async componentDidMount(){
        console.log("componentDidMount")
        try{
            const result = await Audio.Sound.createAsync(  {uri: this.filePath}, {shouldPlay:true}  )
            this.soundObject = result.sound
            this.soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            const status = await this.soundObject.getStatusAsync()
            this.setState({duration: Math.floor(status.durationMillis/1000) })
            this.moveSlider()
            // this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            //     this.play()
            // });
            // this.unFocusListener = this.props.navigation.addListener('willBlur', async () => {  
            // });
        }catch(err){
            console.log("ERROR: ",err)
        }
    }

    async componentWillUnmount(){
        console.log("componentWillUnmount")
        // this.focusListener.remove()
        // this.unFocusListener.remove()
        this.stopSlider()
        await this.soundObject.stopAsync()
        this.soundObject = null
    }

    pause = async () => {
        this.setState({isPlaying: false})
        await this.soundObject.pauseAsync()
        this.stopSlider()
    }

    play = async () => {
        this.setState({isPlaying: true})
        await this.soundObject.playAsync()
        this.moveSlider()
    }

    stop = async () => {
        this.setState({isPlaying: false})
        await this.soundObject.stopAsync()
        this.stopSlider()
        this.setState({sliderValue:0})
    }

    controlPlay = async () =>  {
        if(this.state.isPlaying){
            this.pause()
        }else{
            this.play()
        }
    }
    
	render(){
        const{ isFocused } = this.props

		return(
		  	<View style={styles.container}>
                <TouchableOpacity style={styles.backButton}  onPress={() => this.props.navigation.pop() }>
                    <AntDesign name="arrowleft" size={30} color="teal"/>     
                </TouchableOpacity>  
                <Image  style={styles.audioBackgroundImage}
                    source={require("../assets/audio-background-image.png")}
                />
                <Slider
                    minimumValue={1}
                    maximumValue={this.state.duration}
                    minimumTrackTintColor="#1EB1FC"
                    maximumTractTintColor="#1EB1FC"
                    step={1}
                    value={this.state.sliderValue}
                    onValueChange={(sliderValue) => this.changeAudioTime(sliderValue) }
                    style={styles.slider}
                    thumbTintColor="teal"
                />  

                <View style={styles.subContainer}>
                    <TouchableOpacity style={styles.backward}
                        onPress={() => this.changeAudioTime(this.state.sliderValue-10) }>
                        <MaterialIcons name="replay-10" size={35} color="teal"/>     
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.playButton}  onPress={() => this.controlPlay() }>
                        <Ionicons name={this.state.isPlaying ? "ios-pause" : "ios-play" } size={35} color="teal"/>     
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.forward} 
                        onPress={() => this.changeAudioTime(this.state.sliderValue+10) }>
                        <MaterialIcons name="forward-10" size={35} color="teal"/>     
                    </TouchableOpacity> 
                </View>
            </View>
	  	);
  	}
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"flex-start", 
    },    
    backButton:{
        padding:15,
    },
    audioBackgroundImage:{
        flex:1,
        width: Dimensions.get('window').width,
        height:200,
    },
    slider:{
        alignSelf:"center",
        width:Dimensions.get('window').width * 0.75,
        marginTop:30,
    },
    subContainer:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignSelf:"center", 
        marginTop:30,
        marginBottom:30,
    },
    playButton:{
        padding:15,
    },    
    forward:{
        padding:15,
    },    
    backward:{
        padding:15,
    },

})

export default withNavigationFocus(AudioPlayerScreen)
