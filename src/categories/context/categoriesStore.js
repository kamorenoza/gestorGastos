export default {
  namespaced: true,

  state: {
    categories: null,
    categorySelected: null
  },

  mutations: {
    setCategories (state, value) {
      state.categories = value
    },

    setCategorySelected (state, value) {
      state.categorySelected = value
    }
  }
}
