export default class Expense {
  id = ''
  amount = 0
  description = ''
  category = {}
  date = ''
  paid = false
  fixed = false
  repeat = false
  repeatTimes = false
  payments = []
  type = 'credit'
  editList = []
  product = null

  constructor (amount, description, category, date, fixed, paid, repeat, repeatTimes, type, product) {
    this.amount = amount.replace('.', '')
    this.description = description
    this.category = category
    this.date = date
    this.paid = paid
    this.fixed = fixed
    this.repeat = repeat
    this.repeatTimes = repeatTimes
    this.type = type
    this.product = product
  }

  static fromJSONResponse (json, id) {
    const expense = new Expense(json.amount, json.description, json.category, json.date, json.fixed, json.paid, json.repeat, json.repeatTimes, json.type, json.product)
    if (id) expense.setId(id)

    return expense
  }

  getId () {
    return this.id
  }

  setId (id) {
    this.id = id

    return this
  }

  getAmount () {
    return this.amount
  }

  getDescription () {
    return this.description
  }

  getCategory () {
    return this.category
  }

  getDate () {
    return this.date
  }

  isCredit () {
    return this.type === 'credit'
  }

  isPaid () {
    return this.paid
  }

  setpaid (paid) {
    this.paid = paid

    return this
  }

  isFixed () {
    return this.fixed
  }

  isRepeat () {
    return this.repeat
  }

  getRepeatTimes () {
    return this.repeatTimes
  }

  setUser (email) {
    this.user = email

    return this
  }

  getPayments () {
    return this.payments
  }

  setPayments (value) {
    this.payments = value

    return this
  }

  getObjectData (withId) {
    const expenseObject = {
      amount: this.amount.toString().replace('.', ''),
      description: this.description,
      category: this.category.getObjectData(true),
      date: this.date,
      paid: this.paid,
      fixed: this.fixed,
      repeat: this.repeat,
      user: this.user,
      type: this.type,
      product: null
    }

    if (this.product) {
      expenseObject.product = this.product.getObjectData(true)
    }

    if (this.repeat) {
      expenseObject.repeatTimes = this.repeatTimes
    }
    if (this.fixed || this.repeat) {
      expenseObject.payments = this.payments
      expenseObject.editList = this.editList
    }
    if (withId) expenseObject.id = this.id

    return expenseObject
  }
}
