
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

firebase.initializeApp({

})

export const auth = firebase.auth()
export default firebase


