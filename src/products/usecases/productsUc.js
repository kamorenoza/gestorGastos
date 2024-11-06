import Product from '../models/product'
import store from '@/store'
import SettingsUc from '@/shared/usecases/settings'
import ProductsRepository from '../models/productsRepository'

export default class ProductsUc {
  #repository
  #settingsUc
  #user

  constructor () {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    user = user.email

    this.#repository = new ProductsRepository(user)
    this.#settingsUc = new SettingsUc(user)
    this.#user = user
  }

  async getProducts () {
    const products = []
    const productsLocal = localStorage.getItem('products' + this.#user)
    let response = []

    try {
      if (!productsLocal) {
        response = await this.#repository.findProducts(this.#user)
        response.forEach((json) => { products.push(Product.fromJSONResponse(json.data(), json.id)) })

        this.#repository.saveProductsToLocal(response)
      } else {
        response = JSON.parse(productsLocal)
        response.forEach((json) => { products.push(Product.fromJSONResponse(json.data, json.id)) })
      }

      return products
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async updateProductsToLocal () {
    try {
      const response = await this.#repository.findProducts(this.#user)
      this.#repository.saveProductsToLocal(response)
    } catch (error) {
      console.error(error)
    }
  }

  async saveProduct (detail, icon, color, id, expenses, totalExpense, totalIncome) {
    const category = new Product(detail, icon, color, expenses, totalExpense, totalIncome).setUser(this.#user)

    try {
      if (id) {
        await this.#repository.updateProduct(category.getObjectData(), id)
        this.#repository.updateProductToLocal(category.getObjectData(), id)
      } else {
        const docRef = await this.#repository.addProduct(category.getObjectData())
        this.#repository.addProductToLocal(category.getObjectData(), docRef.id)
      }
      this.#settingsUc.updateVersion()

      return 'Cuenta guardada correctamente'
    } catch (error) {
      console.error(error)
      return 'Error: Guardando cuenta'
    }
  }

  async deleteProduct (id) {
    try {
      await this.#repository.deleteProduct(id)
      this.#repository.deleteProductToLocal(id)

      this.#settingsUc.updateVersion()

      return 'Cuenta eliminada correctamente'
    } catch (error) {
      console.error(error)
      return 'Error: Eliminando cuenta'
    }
  }

  async addExpense (amountStr, description, category, date, type, product, idAccount) {
    const amount = amountStr.replaceAll('.', '')
    product = product || store.state.productsStore.productSelected
    const productExpenses = product.expenses

    let totalExpense = parseInt(product.totalExpense)
    let totalIncome = parseInt(product.totalIncome)

    const expense = {
      amount: amount,
      description: description,
      category: typeof category.getObjectData === 'function' ? category.getObjectData(true) : category,
      date: date,
      user: store.state.loginStore.user.email,
      type: type,
      id: Date.now()
    }

    if (idAccount) expense.idAccount = idAccount

    if (type === 'credit') totalExpense += parseInt(amount)
    if (type === 'debit') totalIncome += parseInt(amount)

    productExpenses.unshift(expense)
    product.setExpenses(productExpenses).setTotalExpense(totalExpense).setTotalIncome(totalIncome)

    try {
      await this.#repository.updateProduct(product.getObjectData(), product.getId())
      this.#repository.updateProductToLocal(product.getObjectData(), product.getId())

      this.#settingsUc.updateVersion()

      return 'Agregado correctamente'
    } catch (error) {
      console.error(error)
    }
  }

  async editExpense (editedExpense, amountStr, description, category, date) {
    const amount = amountStr.replaceAll('.', '')
    const product = store.state.productsStore.productSelected
    const productExpenses = product.expenses

    let totalExpense = parseInt(product.totalExpense)
    let totalIncome = parseInt(product.totalIncome)

    if (editedExpense.type === 'credit') {
      totalExpense -= parseInt(editedExpense.amount)
      totalExpense += parseInt(amount)
    }

    if (editedExpense.type === 'debit') {
      totalIncome -= parseInt(editedExpense.amount)
      totalIncome += parseInt(amount)
    }

    productExpenses.forEach((expense, index) => {
      if (expense.id === editedExpense.id) {
        editedExpense.description = description
        editedExpense.category = category
        editedExpense.date = date
        editedExpense.amount = amount

        productExpenses[index] = editedExpense
      }
    })

    product.setExpenses(productExpenses).setTotalExpense(totalExpense).setTotalIncome(totalIncome)

    try {
      await this.#repository.updateProduct(product.getObjectData(), product.getId())
      this.#repository.updateProductToLocal(product.getObjectData(), product.getId())

      this.#settingsUc.updateVersion()
    } catch (error) {
      console.error(error)
    }
  }

  async deleteExpense (deleteExpense, product) {
    product = product || store.state.productsStore.productSelected
    const productExpenses = product.expenses
    const type = deleteExpense.type

    let totalExpense = parseInt(product.totalExpense)
    let totalIncome = parseInt(product.totalIncome)

    const index = productExpenses.findIndex(expense => expense.id === deleteExpense.id)

    productExpenses.splice(index, 1)

    if (type === 'credit') totalExpense -= parseInt(deleteExpense.amount)
    if (type === 'debit') totalIncome -= parseInt(deleteExpense.amount)

    product.setExpenses(productExpenses).setTotalExpense(totalExpense).setTotalIncome(totalIncome)

    try {
      await this.#repository.updateProduct(product.getObjectData(), product.getId())
      this.#repository.updateProductToLocal(product.getObjectData(), product.getId())

      this.#settingsUc.updateVersion()

      return true
    } catch (error) {
      console.error(error)
    }
  }
}
