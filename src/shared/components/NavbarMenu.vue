<template>
  <div class="o-menu">
    <div class="menu-item" >
      <router-link :class="addClass('/statistics')" to="/statistics">
        <div><b-icon icon="pie-chart-fill" /></div>
        <p>Estadísticas</p>
      </router-link>
    </div>

    <div class="menu-item" >
      <router-link :class="addClass('/')" to="/">
        <div><b-icon icon="bank" /></div>
        <p>Presupuesto</p>
      </router-link>
    </div>

    <div class="menu-item-main" v-click-outside="closeContainer">
      <button class="button" @click="changeShow()">
        <b-icon icon="plus" />
      </button>

      <div class="menu-item-main__container animate__animated" :class="classMenuContainer">
        <div class="action action--light">
          <button @click="addExpense('credit')" class="button-action">
            <b-icon class="text-danger" icon="graph-down" />
          </button>
          <p class="action__label">Gasto</p>
        </div>

        <div class="action action--light">
          <button @click="addExpense('debit')" class="button-action">
            <b-icon class="text-success" icon="graph-up" />
          </button>
          <p class="action__label">Ingreso</p>
        </div>
      </div>

    </div>

    <div class="menu-item" >
      <router-link :class="addClass('/products')" to="/products">
        <div><b-icon icon="piggy-bank" /></div>
        <p>Cuentas</p>
      </router-link>
    </div>

    <div class="menu-item" >
      <router-link :class="addClass('/categories')" to="/categories">
        <div><b-icon icon="list-ul" /></div>
        <p>Categorías</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import LoginRepository from '@/login/models/LoginRepository'
import { mapMutations } from 'vuex'

const repo = new LoginRepository()

export default {
  name: 'NavbarMenu',

  data () {
    return {
      show: false
    }
  },

  watch: {
    show () {
      if (this.show) document.body.classList.add('dark-back')
      else document.body.classList.remove('dark-back')
    }
  },

  computed: {
    classMenuContainer () {
      return this.show ? 'animate__backInUp' : 'animate__backOutDown'
    }
  },

  methods: {
    addClass (menu) {
      let route = ''
      if (!this.$route.path) route = window.location.pathname
      else route = this.$route.path

      return route === menu ? 'selected' : ''
    },

    logout () {
      try {
        repo.logout()
        repo.logoutLocal()
      } catch (error) {
        console.error(error)
      }
    },

    changeShow () {
      this.show = !this.show
      if (this.$route.name !== 'accounts') this.$router.push('/accounts')
    },

    closeContainer () {
      this.show = false
    },

    addExpense (type) {
      this.show = false
      this.setType(type)
      this.$router.push('/add-expense')
    },

    ...mapMutations('expensesStore', ['setType'])
  }
}

</script>
