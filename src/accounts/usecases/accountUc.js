import Account from '../models/account'
import AccountRepository from '../models/accountRepository'
import SettingsUc from '@/shared/usecases/settings'

export default class AccountUc {
  #repository
  #settingsUc
  #user

  constructor () {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    user = user.email

    this.#repository = new AccountRepository(user)
    this.#settingsUc = new SettingsUc(user)
    this.#user = user
  }

  async getAccounts () {
    const accounts = []
    const accountsLocal = localStorage.getItem('accounts' + this.#user)
    let response = []

    try {
      if (!accountsLocal || JSON.parse(accountsLocal).length === 0) {
        response = await this.#repository.findAccounts(this.#user)

        if (response.size === 0) {
          await this.saveAccount('Presupuesto', 'bank', 'green', '', [])
          response = await this.#repository.findAccounts(this.#user)
        }

        response.forEach((json) => { accounts.push(Account.fromJSONResponse(json.data(), json.id)) })

        this.#repository.saveAccountsToLocal(response)
      } else {
        response = JSON.parse(accountsLocal)
        response.forEach((json) => { accounts.push(Account.fromJSONResponse(json.data, json.id)) })
      }

      return accounts
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async updateAccountsToLocal () {
    try {
      const response = await this.#repository.findAccounts(this.#user)
      this.#repository.saveAccountsToLocal(response)
    } catch (error) {
      console.error(error)
    }
  }

  async saveAccount (detail, icon, color, id, expenses) {
    const category = new Account(detail, icon, color, expenses).setUser(this.#user)

    try {
      if (id) {
        await this.#repository.updateAccount(category.getObjectData(), id)
        this.#repository.updateAccountToLocal(category.getObjectData(), id)
      } else {
        const docRef = await this.#repository.addAccount(category.getObjectData())
        this.#repository.addAccountToLocal(category.getObjectData(), docRef.id)
      }
      this.#settingsUc.updateVersion()

      return 'Presupuesto guardado correctamente'
    } catch (error) {
      console.error(error)
      return 'Error: Guardando presupuesto'
    }
  }

  async deleteAccount (id) {
    try {
      await this.#repository.deleteAccount(id)
      this.#repository.deleteAccountToLocal(id)

      this.#settingsUc.updateVersion()

      return 'Presupuesto eliminado correctamente'
    } catch (error) {
      console.error(error)
      return 'Error: Eliminando Presupuesto'
    }
  }
}
