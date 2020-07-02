import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, FlatList } from 'react-native';
import { moderateScale } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Svg, { Path } from 'react-native-svg'



export default class  MessageBubble extends React.Component{

    constructor(props){
        super(props)
    }


    render(){

        return(
            <View style={[styles.message, this.props.mine ? styles.mine : styles.notMine ]}>
                <View style={[styles.cloud, {backgroundColor: this.props.mine ? 'orange' : "white" } ]}>
                    {
                        this.props.text ? 
                        <Text style={ styles.text } >
                            {this.props.text}
                        </Text> : null
                    }
                </View>
                <View style={[ styles.arrowContainer, this.props.mine ? styles.rightArrowContainer : styles.leftArrowContainer ]} >
                    {
                        <Svg
                            styles={ this.props.mine ? styles.rightArrow : styles.leftArrow }
                            width={ moderateScale(15.5,  0.5) }
                            height={ moderateScale(17.5, 0.5) }
                            viewBox="32.484 17.5 15.515 17.5"
                            enable-background="new 32.485 17.5 15.515 17.5"
                        >
                            <Path
                                d={ this.props.mine 
                                    ? 
                                    "M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                                    : 
                                    "M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"

                                }
                                fill={this.props.mine ? 'orange' : 'white'}
                                x="0"
                                y="0"
                            />
                        
                        </Svg>
                    }
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    message:{
        flexDirection:'row',
        marginVertical: moderateScale(7,2)
    },
    notMine:{
        marginLeft: 20,
    }, 
    mine:{
        alignSelf:'flex-end',
        marginRight: 20,
    },
    cloud:{
        maxWidth: moderateScale(250,2),
        paddingHorizontal: moderateScale(10,2),
        paddingTop: moderateScale(5,2),
        paddingBottom: moderateScale(7,2),
        borderRadius: 20,
    },
    text:{
        paddingTop:3,
        fontSize: 17,
        lineHeight:22,
        color:"black",
    },
    arrowContainer:{
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:-1,
        flex:1,
    },
    leftArrowContainer:{
        justifyContent:"flex-end",
        alignItems:"flex-start",
    },
    rightArrowContainer:{
        justifyContent:"flex-end",
        alignItems:"flex-end",
    },
    leftArrow:{
        left: moderateScale(-6, 0.5)
    },
    rightArrow:{
        right: moderateScale(-6, 0.5)
    }

});


