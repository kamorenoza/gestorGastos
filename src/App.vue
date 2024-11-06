<template>
  <div id="app">
    <navbar-menu v-if="showNavbar" />
    <router-view/>
  </div>
</template>

<script>
import User from '@/login/models/user'
import { mapMutations, mapState } from 'vuex'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import NavbarMenu from '@/shared/components/NavbarMenu.vue'
import CategoryUc from '@/categories/usecases/categoryUc'
import AccountUc from './accounts/usecases/accountUc'
import LoginUc from './login/usecases/LoginUc'
import LoginRepository from './login/models/LoginRepository'
import ProductsUc from './products/usecases/productsUc'

let repoLogin
let ucCategories
let ucAccounts
let ucSettings
let ucProducts

export default {
  name: 'App',

  components: {
    NavbarMenu
  },

  computed: {
    showNavbar () {
      return this.$route.name !== 'login'
    },

    ...mapState('loginStore', ['user']),
    ...mapState('accountsStore', ['accounts'])
  },

  methods: {
    async whenUserLogin () {
      this.setCategories(await ucCategories.getCategories())
      this.setAccounts(await ucAccounts.getAccounts())
      this.setProducts(await ucProducts.getProducts())

      try {
        await ucSettings.validateDBVersion()
        this.setCategories(await ucCategories.getCategories())
        this.setAccounts(await ucAccounts.getAccounts())
        this.setAccountSelected(this.accounts[0])
        this.setProducts(await ucProducts.getProducts())
      } catch (error) {
        console.error(error)
      }
    },

    async loginUserSuccess (currentUser) {
      this.setUser(User.fromJSONResponse(currentUser))

      repoLogin = new LoginRepository()
      repoLogin.loginLocal(currentUser)

      ucCategories = new CategoryUc()
      ucAccounts = new AccountUc()
      ucSettings = new LoginUc()
      ucProducts = new ProductsUc()

      if (this.$route.name === 'login') this.$router.push('/')
      await this.whenUserLogin()
    },

    logoutUser () {
      this.setUser(null)
      repoLogin = new LoginRepository()
      repoLogin.logoutLocal()
      if (this.$route.name !== 'login') this.$router.push('/login')
    },

    ...mapMutations('loginStore', ['setUser']),
    ...mapMutations('categoriesStore', ['setCategories']),
    ...mapMutations('accountsStore', ['setAccounts', 'setAccountSelected']),
    ...mapMutations('productsStore', ['setProducts'])
  },

  created () {
    if (!localStorage.getItem('currentUser')) {
      onAuthStateChanged(auth, currentUser => {
        if (!localStorage.getItem('currentUser')) {
          currentUser ? this.loginUserSuccess(currentUser) : this.logoutUser()
        }
      })
    } else {
      this.loginUserSuccess(JSON.parse(localStorage.getItem('currentUser')))
    }
  }
}

</script>
