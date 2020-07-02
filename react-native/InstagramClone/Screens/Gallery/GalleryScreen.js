import React from 'react';
import { StyleSheet, FlatList, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { createStackNavigator } from 'react-navigation-stack';

import Feather from 'react-native-vector-icons/Feather';


class GalleryScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            media: []
        }
    }

    async componentDidMount() {
        const album = await MediaLibrary.getAlbumAsync('Camera')
        const photos = await MediaLibrary.getAssetsAsync({ album: album, mediaType:[ MediaLibrary.MediaType.photo ] }) 
        const media = photos.assets.map( m => (
            {
                id:  m.id, 
                uri: m.uri 
            } 
        ))
        this.setState( { media } )
    }    

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {}
        return {
            headerTitle: "Gallery",
            headerLeft: () => (
                <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.navigate('ActivityScreen') }>
                    < Feather name='x' color={navigation.tintColor} size={30} />
                </TouchableOpacity>
            ),
        };
    } 

    render(){
        const bigImage = this.state.media[0] || {}
        console.log(bigImage)
        return (
            <View style={styles.container}>
                <Image style={styles.mainImage} source={{ uri: bigImage.uri }} />
                <View style={styles.flatList}>
                    <FlatList
                        data={this.state.media}
                        renderItem={({ item }) => (
                            <View style={styles.imageBackground}>
                                <Image style={styles.imageThumbnail} source={{ uri: item.uri }} />
                            </View>
                        )}
                        numColumns={3}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        )
    }

}

 
export default GalleryStack = createStackNavigator( 
    {
        GalleryScreen: {
            screen: GalleryScreen,
        }
    }, 
)


const styles = StyleSheet.create({
    headerLeft:{
        padding:10,
    },
    container:{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    mainImage:{
        flex: 0.5,
    },
    flatList:{
        flex: 0.5,
    },
    imageBackground:{ 
        flexDirection: 'column', 
        margin: 2
    },
    imageThumbnail:{
        justifyContent: 'center',
        alignItems: 'center',
        width: Math.round(Dimensions.get('window').width / 3 - 5),
        height: 100,
    },
    
});


