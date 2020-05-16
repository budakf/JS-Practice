import React from 'react';
import { ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; 

export default class Row extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ListItem  bottomDivider
                key={this.props.todo.key} 
                title={this.props.todo.text}
                titleStyle={{ color: 'white' }}
                onPress={ () => this.props.toggleTodo()}
                checkmark={this.props.todo.checkmark}
                onLongPress={ () => this.props.deleteTodo() }
                Component={TouchableScale}
                linearGradientProps={{
                    colors: ['#00D0D0', 'teal'],
                    start: [1, 0],
                    end: [0.1, 0],
                }}
                containerStyle={{
                    borderRadius: 30,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                }}
            />
        )
    }
}