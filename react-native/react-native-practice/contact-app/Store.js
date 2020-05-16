import {createStore} from 'redux';


const ADD_CONTACT = "ADD_CONTACT"
const ADD_USER = "ADD_USER"

// Action Creator
AddContact = update => ({
    type: ADD_CONTACT,
    payload: update,
})


contactReducer = (state = [], action) =>{
    if(action.type === ADD_CONTACT)   
        return  [ ...state, action.payload ]
    return state
}

userReducer = (state = {}, action) =>{
    if(action.type === ADD_USER)   
        return  Object.assign( {}, state, action.payload )
    return state
}

const reducer = (state, action) => (
    {
        contacts: contactReducer(state.contacts || [], action),
        //user: userReducer(state.user, action),
    }
)

export const store = createStore(reducer, { user:{}, contacts:[] })

console.log( store.getState() )
store.dispatch( AddContact( { name:"Fatih" , phoneNumber:"23534534543" }) ) 
store.dispatch( AddContact( { name:"Ali", phoneNumber:"56787654"} ) ) 
store.dispatch( AddContact( { name:"Gerrard", phoneNumber:"0987654"} ) ) 
console.log( store.getState() )

