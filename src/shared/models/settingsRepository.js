import { setDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

export default class SettingsRepository {
  #user

  constructor () {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    user = user.email

    this.#user = user
  }

  getSettings (user) {
    const docRef = doc(db, 'settings', user)

    return getDoc(docRef)
  }

  addSettings (version, principalAccount, user) {
    const settings = { version, principalAccount }
    const ref = doc(db, 'settings', user)

    return setDoc(ref, settings)
  }

  addSettingsLocal (version, principalAccount = ' ', user) {
    const settings = { version: version, principalAccount: principalAccount, user: user }

    localStorage.setItem('settings' + this.#user, JSON.stringify(settings))
  }
}
