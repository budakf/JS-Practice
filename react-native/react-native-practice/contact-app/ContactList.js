import React from 'react';
import { SectionList, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Row } from './Row.js';


const SectionHeader = props =>(
   
   <View style={{ alignItems:'flex-start', marginLeft: 15 }} >
        <Text style={{color:'blue'}}> 
            { props.obj.section.title}  
        </Text> 
    </View>
    
)

class ContactList extends React.Component{
    
    constructor(props){
        super(props)
    }

    generateSections(){
        const contactsByLetter = this.props.contacts.reduce( (obj, contact) => {
            const firstLetter = contact.name[0].toUpperCase()
            return {
                ...obj,
                [firstLetter] : [ ...(obj[firstLetter]) || [] , contact  ]
            }
        }, {} )
    
        const sections = Object.keys(contactsByLetter).sort().map( letter => (
            {
                title : letter,
                data  : contactsByLetter[letter]
            }
        ))
        return sections
    }
    


    renderItem = obj => ( <Row {...(obj.item)} /> )
   
    //renderSectionHeader = obj =>( <SectionHeader  obj={obj}/> )

    render(){
        try{
            return(
                <SectionList 
                style={{flex:1, backgroundColor:"lightblue"}}
                sections={ this.generateSections() } 
                renderItem={ this.renderItem }
                //renderSectionHeader={ this.renderSectionHeader } 
            />
            )
        }
        catch (error) {
            return (
                 <Text> {error.message} </Text> 
            )
        }
    }
}

ContactList.protoTypes = {
    renderItem: PropTypes.func,
    renderSectionHeader: PropTypes.func,
    contacts: PropTypes.array
}

export default ContactList