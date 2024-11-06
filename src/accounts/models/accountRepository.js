import { db } from '@/firebase/firebase'
import { collection, query, getDocs, where, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

export default class AccountRepository {
  #user

  constructor () {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    user = user.email

    this.#user = user
  }

  findAccounts (user) {
    const queryAccounts = query(collection(db, 'accounts'), where('user', '==', user))

    return getDocs(queryAccounts)
  }

  addAccount (account) {
    return addDoc(collection(db, 'accounts'), account)
  }

  updateAccount (account, id) {
    const refAccount = doc(db, 'accounts', id)

    return updateDoc(refAccount, account)
  }

  deleteAccount (id) {
    const refAccount = doc(db, 'accounts', id)

    return deleteDoc(refAccount)
  }

  saveAccountsToLocal (response) {
    const accounts = []

    response.forEach((json) => {
      accounts.push({ data: json.data(), id: json.id })
    })
    localStorage.setItem('accounts' + this.#user, JSON.stringify(accounts))
  }

  addAccountToLocal (account, id) {
    const accounts = JSON.parse(localStorage.getItem('accounts' + this.#user))

    accounts.push({ data: account, id: id })
    localStorage.setItem('accounts' + this.#user, JSON.stringify(accounts))
  }

  updateAccountToLocal (updateData, id) {
    const accounts = JSON.parse(localStorage.getItem('accounts' + this.#user))
    const accountsNewArray = []

    accounts.forEach((json) => {
      if (json.id === id) accountsNewArray.push({ data: updateData, id: json.id })
      else accountsNewArray.push({ data: json.data, id: json.id })
    })

    localStorage.setItem('accounts' + this.#user, JSON.stringify(accountsNewArray))
  }

  deleteAccountToLocal (id) {
    const accounts = JSON.parse(localStorage.getItem('accounts' + this.#user))

    const index = accounts.findIndex(filter => filter.id === id)
    if (index !== -1) accounts.splice(index, 1)

    localStorage.setItem('accounts' + this.#user, JSON.stringify(accounts))
  }
}
