import React from 'react';
import { StyleSheet, Text, Icon, View, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import PhotoScreen from './PhotoScreen'

export default PhotoStack = createStackNavigator( 
    {
        PhotoScreen: {
            screen: PhotoScreen,
        }
    }, 
)
