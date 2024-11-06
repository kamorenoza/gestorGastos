import AccountUc from '@/accounts/usecases/accountUc'
import CategoryUc from '@/categories/usecases/categoryUc'
import ProductsRepository from '@/products/models/productsRepository'
import SettingsRepository from '@/shared/models/settingsRepository'
import { utils } from '@/shared/utils'

export default class LoginUc {
  #accountUc
  #categoryUc
  #settingsRepository
  #user
  #productRepository

  constructor () {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    user = user.email

    this.#user = user
    this.#accountUc = new AccountUc(user)
    this.#categoryUc = new CategoryUc(user)
    this.#settingsRepository = new SettingsRepository(user)
    this.#productRepository = new ProductsRepository(user)
  }

  async validateDBVersion () {
    try {
      const settings = await this.#settingsRepository.getSettings(this.#user)
      const localSettings = localStorage.getItem('settings' + this.#user)

      if (!settings.exists()) {
        await this.#settingsRepository.addSettings(1, '', this.#user)
        this.#settingsRepository.addSettingsLocal(1, '', this.#user)
      } else {
        const dbVersion = parseInt(settings.data().version)
        const localVersion = localSettings ? parseInt(JSON.parse(localSettings).version) : 0

        if (!localSettings) {
          this.updateLocalStorage(settings.data())
        } else {
          if (localVersion !== dbVersion) this.updateLocalStorage(settings.data())
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  async updateLocalStorage (settings) {
    utils.startLoading()

    try {
      await this.#categoryUc.updateCategoriesToLocal()
      await this.#accountUc.updateAccountsToLocal()
      await this.#productRepository.updateProductToLocal()
      this.#settingsRepository.addSettingsLocal(settings.version, settings.principalAccount)

      utils.stopLoading()
    } catch (error) {
      console.error(error)
      utils.stopLoading()
    }
  }
}
