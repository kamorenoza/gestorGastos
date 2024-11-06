export default {
  namespaced: true,

  state: {
    accounts: [],
    accountSelected: null
  },

  mutations: {
    setAccounts (state, value) {
      state.accounts = value
    },

    setAccountSelected (state, value) {
      state.accountSelected = value
    }
  }
}
