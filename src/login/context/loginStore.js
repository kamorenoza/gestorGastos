
export default {
  namespaced: true,

  state: {
    user: null,
    settings: null
  },

  mutations: {
    setUser (state, value) {
      state.user = value
    },

    setSettings (state, value) {
      state.settings = value
    }
  }
}
