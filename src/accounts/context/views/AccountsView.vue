<template>
  <div>
    <title-general title="Presupuesto" />
    <div class="l-content l-content--period">
      <select-period />
      <expenses-per-account :account="account" />
    </div>
  </div>
</template>

<script>
import TitleGeneral from '@/shared/components/TitleGeneral.vue'
import { mapMutations, mapState } from 'vuex'
import SelectPeriod from '@/home/context/components/selectPeriod.vue'
import ExpensesPerAccount from '@/home/context/components/ExpensesPerAccount.vue'

export default {
  name: 'AccountsView',

  components: {
    TitleGeneral,
    SelectPeriod,
    ExpensesPerAccount
  },

  computed: {
    totalDebit () {
      let total = 0
      this.accounts.forEach(account => { total += account.getTotal(this.currentPeriod).total })

      return total
    },

    totalBalance () {
      let total = 0
      this.accounts.forEach(account => { total += account.getTotal(this.currentPeriod).balance })

      return total
    },

    account () {
      return this.accounts.length > 0 ? this.accounts[0] : null
    },

    ...mapState('accountsStore', ['accounts']),
    ...mapState('expensesStore', ['currentPeriod'])
  },

  methods: {
    ...mapMutations('accountsStore', ['setAccountSelected'])
  },

  created () {
    this.setAccountSelected(this.account)
  }
}
</script>
