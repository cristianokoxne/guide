import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {

    apiKey: 'AIzaSyAn7OmgPlfc93l77b_DmVCaDyi3SgziMB4',
    authDomain: 'guide-7c8a0.firebaseapp.com',
    databaseURL:'https://guide-7c8a0-default-rtdb.firebaseio.com',
    projectId: 'guide-7c8a0',
    storageBucket: 'guide-7c8a0.appspot.com',
    messagingSenderId:'526668664406',
    appId:'1:526668664406:web:10f0e44d34d453d9a8f5f7'
  
};
  
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export{firebase, auth, database}
