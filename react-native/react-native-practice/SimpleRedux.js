class Store{

    constructor(reducer, state){
        this.reducer = reducer
        this.state = state
        
    }

    getState() {
        return this.state
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action)
    }

}

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
        user: userReducer(state.user, action),
    }
)

let store = new Store(reducer, { user:{}, contacts:[] })

console.log( store.getState() )
store.dispatch( AddContact( { name:"Fatih"} ) ) 
store.dispatch( AddContact( { name:"Ali"} ) ) 
store.dispatch( AddContact( { name:"Gerrard"} ) ) 
console.log( store.getState() )

