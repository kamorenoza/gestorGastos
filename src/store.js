import Vue from 'vue'
import Vuex from 'vuex'
import loginStore from '@/login/context/loginStore'
import categoriesStore from '@/categories/context/categoriesStore'
import accountsStore from '@/accounts/context/accountsStore'
import expensesStore from '@/home/context/expensesStore'
import productsStore from '@/products/context/productsStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginStore,
    categoriesStore,
    accountsStore,
    expensesStore,
    productsStore
  }
})
