import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';


export default class ContactListElement extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View>
                <ListItem
                    key={this.props.contact.key}
                    leftAvatar={{ source: { uri: this.props.contact.photo.large } }}
                    title={this.props.contact.name}
                    subtitle={this.props.contact.phone}
                    bottomDivider
                    onPress={ () => this.props.goToDetails( this.props.contact )  }
                    onLongPress={ () => this.props.doCall( this.props.contact ) }
                />
        </View>
        )
    }
}