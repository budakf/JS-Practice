const firstNames = [
    'Fatih', 'Ali', 'Hasan', 'Emin', 'Saim', 'Hamza', 'Steven', 'Fernando', 'Mike', 'Mehmet', 'Osman' 
]
  
const lastNames = [
    'Budak', 'Seyfi', 'Yılmaz', 'As', 'Gerrard', 'Tuna', 'Torres', 'Ateş', 'Çetinoğlu', 'Hara', 'Ermiş' 
]

const generateName = () => `${ firstNames[ rand( firstNames.length-1 ) ] }  ${ lastNames[ rand( lastNames.length - 1 ) ] }`

const rand = (max, min = 0) => Math.floor( Math.random() * (max-min) ) + min

const generatePhoneNumber = () => `${rand(10000,999)}-${rand(10000, 999)}-${rand(1000, 99)}`

const addKeys = (val, key) => ({ key:key.toString() , ...val })

export const compareNames = (contact1, contact2) => contact1.name > contact2.name 

createContact = () => ({ 
    name: generateName(),
    phoneNumber:generatePhoneNumber()

})

export default contacts = Array.from( { length:20 }, createContact).map(addKeys)

