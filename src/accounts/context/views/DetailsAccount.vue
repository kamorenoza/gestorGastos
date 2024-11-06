<template>
  <div class="l-content">
    <title-general :title="accountSelected.getName()" backRoute="/accounts" :addButtonFunction="addExpense" />
    <select-period />
    <expenses-per-account :account="accountSelected" />
    <add-expense />
  </div>
</template>

<script>
import ExpensesPerAccount from '@/home/context/components/ExpensesPerAccount.vue'
import TitleGeneral from '@/shared/components/TitleGeneral.vue'
import { mapMutations, mapState } from 'vuex'
import SelectPeriod from '@/home/context/components/selectPeriod.vue'
import Notification from '@/shared/notification'
import AddExpense from '@/home/context/components/AddExpense.vue'

export default {

  components: {
    ExpensesPerAccount,
    TitleGeneral,
    SelectPeriod,
    AddExpense
  },

  name: 'DetailsAccount',

  computed: {
    ...mapState('accountsStore', ['accountSelected'])
  },

  methods: {
    async addExpense () {
      const confirmation = await new Notification().selectOption('Gasto', 'Ingreso')

      if (confirmation.isConfirmed) this.setType('credit')
      else if (confirmation.isDenied) this.setType('debit')

      if (confirmation.isConfirmed || confirmation.isDenied) this.$bvModal.show('add-expense-modal')
    },

    ...mapMutations('expensesStore', ['setType']),
    ...mapMutations('accountsStore', ['setAccountSelected'])
  },

  created () {
    if (!this.accountSelected) this.$router.push('/')
  }
}
</script>
