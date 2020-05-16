import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { withNavigationFocus } from 'react-navigation';
import {ListItem} from 'react-native-elements';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import * as FileSystem from 'expo-file-system';


class VideoLibraryScreen extends React.Component{
  
  	constructor(props){
		super(props)

		this.state={
			videos: []
		}

	}

	static navigationOptions = ({navigation}) => (
		{
			headerShown: false,
		}
	)

	getVideoFiles = async () => {
		const videos = await FileSystem.readDirectoryAsync("file:///storage/emulated/0/AppName/Videos")
		this.setState({ videos: videos} )
	}
	
	UNSAFE_componentWillMount = async () => {
        //const videos = await MediaLibrary.getAssetsAsync({album:"AppName/Videos"})
		await this.getVideoFiles()
	}
	
	UNSAFE_componentWillReceiveProps = async (props) => {
        //const videos = await MediaLibrary.getAssetsAsync({album:"AppName/Videos"})
		await this.getVideoFiles()
    }

  	render(){
		const { isFocused } = this.props
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.videos}
					renderItem={({ item }) => (
						<VideoListElement item={item} 
						goToDetails={() => this.props.navigation.push("VideoPlayerScreen",{
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
		padding:4,
	},

});


function VideoListElement(props){

	return(
		<ListItem style={styles.element}
			bottomDivider
			title={props.item.slice(0,20)+"..."}
			subtitle="Today"
			titleStyle={{fontSize:25,color:"teal"}}
			rightIcon = {
				<TouchableOpacity style={styles.touchableOpacity}  onPress={ () => props.goToDetails()}>
					<MaterialCommunityIcons name="play" size={30} color="teal" />
				</TouchableOpacity> 
			}
			raised
		/>
	)
}


export default withNavigationFocus(VideoLibraryScreen)


{/* <TextInput style={styles.input}/>
<TouchableOpacity style={styles.sendIcon}
	onPress={ ()=>{} }>
	<AntDesign name="search1" size={30} color="teal"/>
</TouchableOpacity>	 */}


// input:{
// 	flexGrow:1,
// 	marginTop:50,
// 	marginLeft:20,
// 	marginRight:25,
// 	paddingLeft:5, 
// 	paddingRight:10, 
// 	borderBottomWidth:1,
// 	borderColor:"teal",
// },

// sendIcon:{
// 	marginTop:50,
// 	marginRight:25,
// },