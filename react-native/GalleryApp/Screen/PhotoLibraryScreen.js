import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, StatusBar } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {ListItem} from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import  FontAwesome from 'react-native-vector-icons/FontAwesome';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import * as FileSystem from 'expo-file-system';


class PhotoLibraryScreen extends React.Component{
  
  	constructor(props){
		super(props)

		this.state={
			photos: []
		}

    }

    getPhotoFiles = async () =>{
        const photos = await FileSystem.readDirectoryAsync("file:///storage/emulated/0/AppName/Photos")
        this.setState({ photos: photos})
    }

    UNSAFE_componentWillMount = async () => {
        // const photos = await MediaLibrary.getAssetsAsync({album:"AppName/Photos"})  // Uygulama crash oluyor.
        await this.getPhotoFiles()
    }

    UNSAFE_componentWillReceiveProps = async (props) => {
        // const photos = await MediaLibrary.getAssetsAsync({album:"AppName/Photos"})  // Uygulama crash oluyor.
        await this.getPhotoFiles()
    }

	static navigationOptions = ({navigation}) => (
		{
			headerShown: false,
		}
	)

  	render(){
		const { isFocused } = this.props
        return (
			<View style={styles.container}>
				<FlatList
					data={this.state.photos}
					renderItem={({ item }) => (
						<PhotoListElement item={item}  
						goToDisplayScreen={ () => this.props.navigation.push("PhotoDisplayScreen",{
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
		padding:8,
	},
});

function PhotoListElement(props){

	return(
		<ListItem style={styles.element}
			bottomDivider
			title={props.item.slice(0,20)+"..."}
			subtitle="Today"
			titleStyle={{fontSize:25,color:"teal"}}
			rightIcon = {
				<TouchableOpacity style={styles.touchableOpacity}  onPress={() => props.goToDisplayScreen() }> 
					<FontAwesome name="photo" size={25} color="teal" />
				</TouchableOpacity> 
			}
			raised
		/>
	)
}

export default withNavigationFocus(PhotoLibraryScreen)

