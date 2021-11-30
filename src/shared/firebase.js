import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBD6UMKKnAIVDrem-PftKSVhpiH4B_RUFk',
  authDomain: 'react-magazine-be099.firebaseapp.com',
  projectId: 'react-magazine-be099',
  storageBucket: 'react-magazine-be099.appspot.com',
  messagingSenderId: '928077420804',
  appId: '1:928077420804:web:17e36a24fa4a1320f81851',
  measurementId: 'G-RTWQZEF3Y3',
}

firebase.initializeApp(firebaseConfig)

const apiKey = firebaseConfig.apiKey
const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()

export { auth, apiKey, firestore, storage }
