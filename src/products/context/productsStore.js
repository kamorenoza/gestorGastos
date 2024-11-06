export default {
  namespaced: true,

  state: {
    products: [],
    productSelected: null,
    type: 'credit',
    expenseProductSelected: null
  },

  mutations: {
    setProducts (state, value) {
      state.products = value
    },

    setProductSelected (state, value) {
      state.productSelected = value
    },

    setType (state, value) {
      state.type = value
    },

    setExpenseProductSelected (state, value) {
      state.expenseProductSelected = value
    }
  }
}
