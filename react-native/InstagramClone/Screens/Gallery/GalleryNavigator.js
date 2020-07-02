import React from 'react';
import { StyleSheet, Icon, View, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import GalleryStack from "./GalleryScreen"
import VideoStack from "./Video/VideoStack"
import PhotoStack from "./Photo/PhotoStack"


export default GalleryNavigator = createMaterialTopTabNavigator(

    {
        GalleryStack:{
            screen: GalleryStack,
        },
        PhotoStack:{
            screen: PhotoStack,
        },
        VideoStack:{
            screen: VideoStack,
        },
    },
    {
        initialRouteName: "GalleryStack",
        tabBarPosition:"bottom",
        tabBarOptions:{
            activeTintColor:"black",
            inactiveTintColor:"gray",
            indicatorStyle:{
                backgroundColor: "black",
            },
            style:{
                backgroundColor: 'white',
            },
            labelStyle:{
                fontSize: 12,
            }
        }
    }

)
