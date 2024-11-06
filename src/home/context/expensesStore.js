import { utils } from '@/shared/utils'

export default {
  namespaced: true,

  state: {
    expenses: [],
    currentPeriod: utils.getCurrentDate(),
    type: 'credit',
    expenseSelected: null,
    indexPaymentSelected: -1,
    editExpense: 1
  },

  mutations: {
    setExpenses (state, value) {
      state.expenses = value
    },

    setCurrentPeriod (state, value) {
      state.currentPeriod = value
    },

    setType (state, value) {
      state.type = value
    },

    setExpenseSelected (state, value) {
      state.expenseSelected = value
    },

    setIndexPaymentSelected (state, value) {
      state.indexPaymentSelected = value
    },

    setEditExpense (state, value) {
      state.editExpense = value
    }
  }
}
