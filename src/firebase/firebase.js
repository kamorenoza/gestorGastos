import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAguOG0Dcj1Jing0gqw64FuD7r6flq7hDc',
  authDomain: 'gestor-gastos-6029b.firebaseapp.com',
  projectId: 'gestor-gastos-6029b',
  storageBucket: 'gestor-gastos-6029b.appspot.com',
  messagingSenderId: '1025908341871',
  appId: '1:1025908341871:web:79a04021263ba1fe10619a'
}

const fb = initializeApp(firebaseConfig)
export const { db, auth } = { db: getFirestore(fb), auth: getAuth(fb) }
