import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';


export default class LibraryListElement extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ListItem style={styles.element}
                bottomDivider
                title={this.props.item.slice(0,20)+"..."}
                subtitle="Today"
                titleStyle={{fontSize:25,color:"teal"}}
                rightIcon = {
                    <TouchableOpacity onPress={() => console.log(this.props.item)}>
                        <MaterialCommunityIcons name="play" size={30} color="teal" />
                    </TouchableOpacity> 
                }
                raised
            />
        )
    }
}

const styles = StyleSheet.create({
    
    element:{
        
    }

})