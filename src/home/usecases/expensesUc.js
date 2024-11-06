import Expense from '../models/expense'
import store from '@/store'
import { utils } from '@/shared/utils'
import AccountRepository from '@/accounts/models/accountRepository'
import SettingsUc from '@/shared/usecases/settings'
import moment from 'moment'
import ProductsUc from '@/products/usecases/productsUc'

export default class ExpensesUc {
  #accountRepository
  #settingsUc
  #user
  #productsUc

  constructor () {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    user = user.email

    this.#accountRepository = new AccountRepository(user)
    this.#settingsUc = new SettingsUc(user)
    this.#productsUc = new ProductsUc()
    this.#user = user
  }

  async addExpense (amountStr, description, category, date, fixedExpense, paid, repeat, times, type, product) {
    const amount = amountStr.replaceAll('.', '')
    const account = store.state.accountsStore.accountSelected
    const accountExpenses = account.expenses
    if (paid) paid = utils.getCurrentDate()

    const expense = new Expense(amount, description, category, date, fixedExpense, paid, repeat, times, type, product)
    expense.setUser(this.#user)

    if (repeat) expense.setPayments(this.calculatePayments(amount, paid, date, times)).setpaid(false)
    if (paid && fixedExpense) {
      expense.setpaid(false)
        .setPayments([{ number: 1, amount, date, paid: true }])
    }
    expense.setId(Date.now())

    accountExpenses.unshift(expense.getObjectData(true))
    account.setExpenses(accountExpenses)

    try {
      await this.#accountRepository.updateAccount(account.getObjectData(), account.getId())
      this.#accountRepository.updateAccountToLocal(account.getObjectData(), account.getId())

      this.#settingsUc.updateVersion()

      return 'Agregado correctamente'
    } catch (error) {
      console.error(error)
    }
  }

  async paidExpense (editedExpense, indexPayment, paid, products) {
    if (paid) paid = utils.getCurrentDate()
    const account = store.state.accountsStore.accountSelected
    const period = store.state.expensesStore.currentPeriod
    const expenses = account.expenses

    expenses.forEach((expense, index) => {
      if (expense.id === editedExpense.id) {
        if (editedExpense.fixed) {
          if (paid) expenses[index].payments.push({ date: period, paid: true, amount: expense.amount })
          else expenses[index].payments.splice(indexPayment, 1)
        } else if (editedExpense.repeat) expenses[index].payments[indexPayment].paid = paid

        else expenses[index].paid = paid
      }
    })

    if (editedExpense.product) {
      const indexProduct = products.findIndex(product => product.id === editedExpense.product.id)
      if (indexProduct !== -1) {
        const productAdd = products[indexProduct]
        const productType = editedExpense.type === 'credit' ? 'debit' : 'credit'

        if (paid) {
          this.#productsUc.addExpense(
            editedExpense.amount,
            editedExpense.description,
            editedExpense.category,
            period,
            productType,
            productAdd,
            editedExpense.id
          )
        } else {
          const index2 = productAdd.expenses.findIndex(product => product.idAccount === editedExpense.id)
          if (index2 !== -1) {
            this.#productsUc.deleteExpense(productAdd.expenses[index2], productAdd)
          }
        }
      }
    }

    account.setExpenses(expenses)

    try {
      await this.#accountRepository.updateAccount(account.getObjectData(), account.getId())
      this.#accountRepository.updateAccountToLocal(account.getObjectData(), account.getId())

      this.#settingsUc.updateVersion()

      return true
    } catch (error) {
      console.error(error)
    }
  }

  async editExpense (editedExpense, indexPayment, amountStr, description, category, date, fixedExpense, paid, repeat, times, allPayments, product) {
    const amount = amountStr.replaceAll('.', '')
    const account = store.state.accountsStore.accountSelected
    const period = store.state.expensesStore.currentPeriod
    const expenses = account.expenses

    expenses.forEach((expense, index) => {
      if (expense.id === editedExpense.id) {
        editedExpense.description = description
        editedExpense.category = category.getObjectData ? category.getObjectData(true) : category
        editedExpense.date = date
        editedExpense.product = product && product.getObjectData ? product.getObjectData(true) : null

        if (fixedExpense || repeat) {
          let editList = editedExpense.editList

          let editDate = utils.getFirstDay(period)
          if (allPayments) editDate = utils.getFirstDay(date)

          const editElement = { date: editDate, amount }

          if (allPayments) {
            editList = []
            editList.push(editElement)
          } else {
            const index = editList.findIndex(edit => edit.date === editDate)
            if (index !== -1) editList[index] = editElement
            else editList.push(editElement)
          }

          const newEditList = []
          editList.forEach(editItem => {
            if (moment(editItem.date).isSameOrBefore(editDate)) newEditList.push(editItem)
          })

          editedExpense.editList = newEditList
        }

        if (repeat && times !== editedExpense.times) {
          const payments = editedExpense.payments

          editedExpense.repeatTimes = times
          const editedPayments = this.calculatePayments(amount, false, date, times)

          editedPayments.forEach((payment, indexEdited) => {
            const firstDay = utils.getFirstDay(payment.date)
            const lastDay = utils.getLastDay(payment.date)

            const index = payments.findIndex(pay => moment(pay.date).isBetween(firstDay, lastDay, undefined, '[]'))
            if (index !== -1) editedPayments[indexEdited].paid = payments[index].paid
          })

          editedExpense.payments = editedPayments
        }

        if (!repeat && !fixedExpense) {
          editedExpense.amount = amount
        }

        expenses[index] = editedExpense
      }
    })

    account.setExpenses(expenses)

    try {
      await this.#accountRepository.updateAccount(account.getObjectData(), account.getId())
      this.#accountRepository.updateAccountToLocal(account.getObjectData(), account.getId())

      this.#settingsUc.updateVersion()
    } catch (error) {
      console.error(error)
    }
  }

  async deleteExpense (deleteExpense, all) {
    const account = store.state.accountsStore.accountSelected
    const period = store.state.expensesStore.currentPeriod
    const expenses = account.expenses

    const index = expenses.findIndex(expense => expense.id === deleteExpense.id)

    if (all) {
      expenses.splice(index, 1)
    } else {
      deleteExpense.paid = period
      expenses[index] = deleteExpense
    }

    account.setExpenses(expenses)

    try {
      await this.#accountRepository.updateAccount(account.getObjectData(), account.getId())
      this.#accountRepository.updateAccountToLocal(account.getObjectData(), account.getId())

      this.#settingsUc.updateVersion()

      return true
    } catch (error) {
      console.error(error)
    }
  }

  calculatePayments (amount, paid, initialDate, times) {
    const payments = [{ number: 0, amount, date: initialDate, paid }]
    let date = initialDate

    for (let index = 0; index < times; index++) {
      const newDate = utils.sumMonths(date, 1)
      payments.push({
        number: index + 1,
        amount,
        date: newDate,
        paid: false
      })

      date = newDate
    }

    return payments
  }
}
