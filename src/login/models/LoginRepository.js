import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

export default class LoginRepository {
  login () {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  logout () {
    return signOut(auth)
  }

  loginLocal (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  logoutLocal () {
    if (localStorage.getItem('currentUser')) localStorage.removeItem('currentUser')
  }
}
