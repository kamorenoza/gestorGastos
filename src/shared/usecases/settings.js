import SettingsRepository from '../models/settingsRepository'
export default class SettingsUc {
  #repository
  #user

  constructor () {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    user = user.email

    this.#repository = new SettingsRepository()
    this.#user = user
  }

  async updateVersion () {
    try {
      const settings = JSON.parse(localStorage.getItem('settings' + this.#user))
      const newVersion = parseInt(settings.version) + 1

      await this.#repository.addSettings(newVersion, settings.principalAccount, this.#user)
      this.#repository.addSettingsLocal(newVersion, settings.principalAccoun, this.#user)
    } catch (error) {
      console.error(error)
    }
  }

  async createSettings (version, principalAccount) {
    try {
      await this.#repository.addSettings(version, principalAccount, this.#user)
      this.#repository.addSettingsLocal(version, principalAccount, this.#user)

      return 'Configuración guardada correctamente'
    } catch (error) {
      console.error(error)
      return 'Error guardando configuración'
    }
  }
}
