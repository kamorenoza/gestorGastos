export default class Product {
  /**
   * @type {string}
   */
  id = ''
  name = ''
  icon = ''
  color = ''
  user = ''
  expenses = []
  totalExpense = 0
  totalIncome = 0

  constructor (name, icon, color, expenses, totalExpense, totalIncome) {
    this.name = name
    this.icon = icon
    this.color = color
    this.expenses = expenses
    this.totalExpense = totalExpense
    this.totalIncome = totalIncome
  }

  static fromJSONResponse (json, id) {
    const product = new Product(json.name, json.icon, json.color, json.expenses, json.totalExpense, json.totalIncome)
    if (id) product.setId(id).setUser(json.user)

    return product
  }

  getId () {
    return this.id
  }

  setId (id) {
    this.id = id

    return this
  }

  getName () {
    return this.name
  }

  getIcon () {
    return this.icon
  }

  getColor () {
    return this.color
  }

  setUser (email) {
    this.user = email

    return this
  }

  getBalance () {
    return parseInt(this.totalIncome) - parseInt(this.totalExpense)
  }

  getTotalExpense () {
    return this.totalExpense
  }

  getTotalIncome () {
    return this.totalIncome
  }

  getExpenses () {
    return this.expenses
  }

  setExpenses (value) {
    this.expenses = value

    return this
  }

  setTotalExpense (value) {
    this.totalExpense = value

    return this
  }

  setTotalIncome (value) {
    this.totalIncome = value

    return this
  }

  getObjectData (withId) {
    const productObject = {
      name: this.name,
      icon: this.icon,
      color: this.color,
      user: this.user,
      expenses: this.expenses,
      totalExpense: this.totalExpense,
      totalIncome: this.totalIncome
    }

    if (withId) productObject.id = this.id

    return productObject
  }
}
