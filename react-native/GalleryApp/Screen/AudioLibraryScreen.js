import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, StatusBar } from 'react-native';
import {ListItem} from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import * as FileSystem from 'expo-file-system';



class AudioLibraryScreen extends React.Component{
  
  	constructor(props){
		super(props)

		this.state={
			audios: []
		}

  	}

	static navigationOptions = ({navigation}) => (
		{
			headerShown: false,
		}
	)
	
	getAudioFiles = async () => {
		const audios = await FileSystem.readDirectoryAsync("file:///storage/emulated/0/AppName/Audios")
		this.setState({ audios: audios})	
	}

	async componentDidMount(){
		//const audios = await MediaLibrary.getAssetsAsync({first:5, album:"AppName/Audios"})
		await this.getAudioFiles()
	}

	async UNSAFE_componentWillReceiveProps(props){
		//const audios = await MediaLibrary.getAssetsAsync({first:5, album:"AppName/Audios"})
		await this.getAudioFiles()
	}
	
  	render(){
		const { isFocused } = this.props
	  	return (
			<View style={styles.container}>
				<FlatList
					data={this.state.audios}
					renderItem={({ item }) => (
						<AudioListElement item={item}  
						goToDetails={() => this.props.navigation.push("AudioPlayerScreen",{
							filename:item
						})} />
					)}
					keyExtractor={item => item.toString()}
				/>
			</View>
		);
	}
  
}

const styles = StyleSheet.create({
	container:{ 
		flex: 1, 
		flexDirection:"row",
		justifyContent:"center", 
		alignItems:"baseline", 
	},

	text:{
		
	},

	touchableOpacity:{
		padding:5,
	},

});

function AudioListElement(props){

	return(
		<ListItem style={styles.element}
			bottomDivider
			title={props.item.slice(0,20)+"..."}
			subtitle="Today"
			titleStyle={{fontSize:25,color:"teal"}}
			rightIcon = {
				<TouchableOpacity style={styles.touchableOpacity} onPress={ () => props.goToDetails() }>
					<MaterialCommunityIcons name="play" size={30} color="teal" />
				</TouchableOpacity>
			}
			raised
		/>
	)
}

export default withNavigationFocus(AudioLibraryScreen)

