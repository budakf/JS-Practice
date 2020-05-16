import * as Contacts from 'expo-contacts';

export const fetchUsers = async () => {
    const url = 'https://randomuser.me/api/?results=10&nat=tr'
    const response = await fetch(url)
    const result = await response.json()
    const contacts = await result.results.map(processContacts).map((val, key) => ( {...val, key: key} ) )
    return contacts
}

export const processContacts = contact => (
    { 
        name: `${contact.name.first} ${contact.name.last}`,
        gender: contact.gender,
        cell: contact.cell,
        phone: contact.phone,
        email: contact.email,
        photo: {
            medium: contact.picture.medium,
            large: contact.picture.large,
        },
    }
)

export const fetchRealUsers = async () => {
    let {status} = await Contacts.requestPermissionsAsync()
    if(status === "granted"){
        const {data} = await Contacts.getContactsAsync({
            fields: [Contacts.PHONE_NUMBERS] 
        })
        return data[0] 
    }
}
