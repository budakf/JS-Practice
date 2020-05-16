import React from 'react';
import { View, TouchableOpacity, StyleSheet, Slider, Dimensions, Image } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import  Ionicons from 'react-native-vector-icons/Ionicons';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Video } from 'expo-av';


class VideoPlayerScreen extends React.Component{
    
	constructor(props){
        super(props)

        this.filePath = "file:///storage/emulated/0/AppName/Videos/" + props.navigation.getParam("filename")
        this.intervalId = 0
        this.state = {
            sliderValue: 0,
            isPlaying: true,
            duration: 0
        }

    }
    
    static navigationOptions = ({navigation}) => (
		{
            headerShown: false,
		}
    )

    changeVideoTime(sliderValue){
        this.video.setPositionAsync(sliderValue*1000)
        this.setState({sliderValue})
    }
    
    moveSlider = () => {
        if(this.intervalId ===0 ){
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
        this.video.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
        const status = await this.video.getStatusAsync();
        this.setState({duration: Math.floor(status.durationMillis/1000) })
        this.moveSlider()
    }

    async componentWillUnmount(){
        console.log("componentWillUnmount")
        await this.video.stopAsync()
        this.stopSlider()
    }

    pause = async () => {
        await this.video.pauseAsync()
        this.setState({isPlaying: false})
        this.stopSlider()
    }

    play = async () => {
        await this.video.playAsync()
        this.setState({isPlaying: true})
        this.moveSlider()
    }

    stop = async () => {
        this.setState({isPlaying: false})
        await this.video.stopAsync()
        this.stopSlider()
        this.setState({sliderValue:0})
    }

    controlPlay = async () => {
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
                <Video  style={styles.videoComponent}
                    ref={(ref) => { this.video = ref }}
                    rate={1.0}
                    volume={1.0}
                    source={{uri: this.filePath }}
                    resizeMode="cover"
                    shouldPlay
                />
                <Slider
                    minimumValue={1}
                    maximumValue={this.state.duration}
                    minimumTrackTintColor="#1EB1FC"
                    maximumTractTintColor="#1EB1FC"
                    step={1}
                    value={this.state.sliderValue}
                    onValueChange={(sliderValue) => this.changeVideoTime(sliderValue) }
                    style={styles.slider}
                    thumbTintColor="teal"
                />  

                <View style={styles.subContainer}>
                    <TouchableOpacity style={styles.backward}
                        onPress={() => this.changeVideoTime(this.state.sliderValue-10) }>
                        <MaterialIcons name="replay-10" size={35} color="teal"/>     
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.playButton}  onPress={() => this.controlPlay() }>
                        <Ionicons name={this.state.isPlaying ? "ios-pause" : "ios-play" } size={35} color="teal"/>     
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.forward} 
                        onPress={() => this.changeVideoTime(this.state.sliderValue+10) }>
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
    videoComponent:{
        flex:1,
        width: Dimensions.get('window').width,
        height:250,
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
        marginTop:10,
        marginBottom:5,
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

export default withNavigationFocus(VideoPlayerScreen)
