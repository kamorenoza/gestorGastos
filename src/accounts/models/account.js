import { utils } from '@/shared/utils'
import moment from 'moment'

export default class Account {
  /**
   * @type {string}
   */
  id = ''
  name = ''
  icon = ''
  color = ''
  user = ''
  expenses = []
  balance = 0
  total = 0

  constructor (name, icon, color, expenses) {
    this.name = name
    this.icon = icon
    this.color = color
    this.expenses = expenses
  }

  static fromJSONResponse (json, id) {
    const account = new Account(json.name, json.icon, json.color, json.expenses)
    if (id) account.setId(id).setUser(json.user)

    return account
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

  getTotal (period) {
    let credit = 0
    let debit = 0
    let paid = 0
    let debitPaid = 0

    const firstDatePeriod = utils.getFirstDay(period)
    const lastDatePeriod = utils.getLastDay(period)

    this.expenses.forEach(expense => {
      // Si es gasto
      if (expense.type === 'credit') {
        const { paidTotal, totalAll } = this.totalExpense(expense, firstDatePeriod, lastDatePeriod)
        credit += totalAll
        paid += paidTotal
      }
      // Si es ingreso
      if (expense.type === 'debit') {
        const { paidTotal, totalAll } = this.totalExpense(expense, firstDatePeriod, lastDatePeriod)
        debit += totalAll
        debitPaid += paidTotal
      }
    })
    this.balance = parseInt(debit - credit)
    this.total = parseInt(debitPaid - paid)

    return { total: parseInt(debitPaid - paid), balance: parseInt(debit - credit) }
  }

  totalExpense (expense, firstDatePeriod, lastDatePeriod) {
    let paidTotal = 0
    let totalAll = 0

    // Gastos fijos
    if (expense.fixed) {
      const { totalExpense, paidExpense } = this.totalFixed(expense, firstDatePeriod, lastDatePeriod)
      totalAll += totalExpense
      paidTotal += paidExpense
    } else if (expense.repeat) {
      const { totalExpense, paidExpense } = this.totalRepeat(expense, firstDatePeriod, lastDatePeriod)
      totalAll += totalExpense
      paidTotal += paidExpense
    } else {
      const { totalExpense, paidExpense } = this.totalSimple(expense, firstDatePeriod, lastDatePeriod)
      totalAll += totalExpense
      paidTotal += paidExpense
    }

    return { paidTotal, totalAll }
  }

  totalFixed (expense, firstDatePeriod, lastDatePeriod) {
    let totalExpense = 0
    let paidExpense = 0

    if (moment(expense.date).isSameOrBefore(lastDatePeriod)) {
      const editValue = this.getEditValue(expense, firstDatePeriod)

      // Si el gasto fijo sigue vigente
      if (!expense.paid) {
        expense.payments.forEach(payment => {
          if (moment(payment.date).isBetween(firstDatePeriod, lastDatePeriod, undefined, '[]')) {
            if (editValue > 0) paidExpense += parseInt(editValue)
            else paidExpense += parseInt(payment.amount)
          }
        })

        if (editValue > 0) totalExpense += parseInt(editValue)
        else totalExpense += parseInt(expense.amount)
      } else {
        if (moment(expense.paid).isSameOrAfter(lastDatePeriod)) {
          expense.payments.forEach(payment => {
            if (moment(payment.date).isBetween(firstDatePeriod, lastDatePeriod, undefined, '[]')) {
              if (editValue > 0) paidExpense += parseInt(editValue)
              else paidExpense += parseInt(payment.amount)
            }
          })

          if (editValue > 0) totalExpense += parseInt(editValue)
          else totalExpense += parseInt(expense.amount)
        }
      }
    }

    return { totalExpense, paidExpense }
  }

  totalRepeat (expense, firstDatePeriod, lastDatePeriod) {
    let totalExpense = 0
    let paidExpense = 0

    if (moment(expense.date).isSameOrBefore(lastDatePeriod)) {
      const editValue = this.getEditValue(expense, firstDatePeriod)

      expense.payments.forEach(payment => {
        if (moment(payment.date).isBetween(firstDatePeriod, lastDatePeriod, undefined, '[]')) {
          if (payment.paid) {
            if (editValue > 0) paidExpense += parseInt(editValue)
            else paidExpense += parseInt(payment.amount)
          }

          if (editValue > 0) totalExpense += parseInt(editValue)
          else totalExpense += parseInt(payment.amount)
        }
      })
    }

    return { totalExpense, paidExpense }
  }

  totalSimple (expense, firstDatePeriod, lastDatePeriod) {
    let totalExpense = 0
    let paidExpense = 0

    if (moment(expense.date).isBetween(firstDatePeriod, lastDatePeriod, undefined, '[]')) {
      totalExpense += parseInt(expense.amount)
      if (expense.paid) paidExpense += parseInt(expense.amount)
    }

    return { totalExpense, paidExpense }
  }

  getEditValue (expense, firstDatePeriod) {
    let editValue = 0
    if (expense.editList.length > 0) {
      expense.editList.forEach(edit => {
        if (moment(utils.getFirstDay(edit.date)).isSameOrBefore(firstDatePeriod)) editValue = edit.amount
      })
    }

    return editValue
  }

  getBalance () {
    return this.balance
  }

  getTotalValue () {
    return this.total
  }

  getExpenses (period) {
    const expensesToShow = []

    const firstDatePeriod = utils.getFirstDay(period)
    const lastDatePeriod = utils.getLastDay(period)

    this.expenses.forEach(expense => {
      if (expense.fixed) {
        if (moment(expense.date).isSameOrBefore(lastDatePeriod)) {
          if (expense.paid) { if (moment(expense.paid).isSameOrAfter(lastDatePeriod)) expensesToShow.push(expense) } else expensesToShow.push(expense)
        }
      } else if (expense.repeat) {
        const finalDate = utils.sumMonths(expense.date, parseInt(expense.repeatTimes))

        if (moment(finalDate).isSameOrAfter(firstDatePeriod) && moment(expense.date).isSameOrBefore(lastDatePeriod)) expensesToShow.push(expense)
      } else {
        if (moment(expense.date).isBetween(firstDatePeriod, lastDatePeriod, undefined, '[]')) expensesToShow.push(expense)
      }
    })

    expensesToShow.sort((a, b) => {
      const aSplit = a.date.split('-')
      const bSplit = b.date.split('-')
      return aSplit[2] - bSplit[2] || b.type.localeCompare(a.type)
    })

    return expensesToShow
  }

  setExpenses (value) {
    this.expenses = value

    return this
  }

  getObjectData (withId) {
    const accountObject = {
      name: this.name,
      icon: this.icon,
      color: this.color,
      user: this.user,
      expenses: this.expenses
    }

    if (withId) accountObject.id = this.id

    return accountObject
  }
}
