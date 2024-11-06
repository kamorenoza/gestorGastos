import Category from '../models/category'
import CategoryRepository from '../models/categoryRepository'
import SettingsUc from '@/shared/usecases/settings'

export default class CategoryUc {
  #repository
  #settingsUc
  #user

  constructor () {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    user = user.email

    this.#repository = new CategoryRepository(user)
    this.#settingsUc = new SettingsUc(user)
    this.#user = user
  }

  async getCategories () {
    const categories = []
    const categoriesLocal = localStorage.getItem('categories' + this.#user)
    let response = []

    try {
      if (!categoriesLocal) {
        response = await this.#repository.findCategories(this.#user)
        response.forEach((json) => { categories.push(Category.fromJSONResponse(json.data(), json.id)) })

        this.#repository.saveCategoriesToLocal(response)
      } else {
        response = JSON.parse(categoriesLocal)
        response.forEach((json) => { categories.push(Category.fromJSONResponse(json.data, json.id)) })
      }

      return categories
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async updateCategoriesToLocal () {
    try {
      const response = await this.#repository.findCategories(this.#user)
      this.#repository.saveCategoriesToLocal(response)
    } catch (error) {
      console.error(error)
    }
  }

  async saveCategory (detail, icon, colorIcon, backgroundIcon, id) {
    const category = new Category(detail, icon, colorIcon, backgroundIcon).setUser(this.#user)

    try {
      if (id) {
        // await this.#repository.updateCategory(category.getObjectData(), id)
        this.#repository.updateCategoryToLocal(category.getObjectData(), id)
      } else {
        const docRef = await this.#repository.addCategory(category.getObjectData())
        this.#repository.addCategoryToLocal(category.getObjectData(), docRef.id)
      }
      this.#settingsUc.updateVersion()

      return 'Categoría guardada correctamente'
    } catch (error) {
      console.error(error)
      return 'Error: Guardando categoría'
    }
  }

  async deleteCategory (id) {
    try {
      await this.#repository.deleteCategory(id)
      this.#repository.deleteCategoryToLocal(id)

      this.#settingsUc.updateVersion()

      return 'Categoría eliminada correctamente'
    } catch (error) {
      console.error(error)
      return 'Error: Eliminando categoría'
    }
  }
}
