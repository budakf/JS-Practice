import React from 'react';
import {Text, View, StyleSheet, } from 'react-native';
import {Icon} from 'native-base'
import { ListItem } from 'react-native-elements'

export const Row = props => (
  //   <View style={styles.contact}>
  //     <Icon name="contact" style={{ marginRight:10 }} />
  //     <Text>{props.name} {props.phoneNumber} </Text>
  //   </View>
  // )


    <View>
      <ListItem
        key={props.i}
        //leftAvatar={{ source: { uri: props.avatar_url } }}
        title={props.name}
        subtitle={props.phoneNumber}
        bottomDivider
      />
  </View>
  

)


const styles = StyleSheet.create({
    contact:{
      flexDirection:'row',
      justifyContent: 'flex-start',
      alignItems:'center',
      padding: 10
  }
})