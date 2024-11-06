<template>
  <div v-if="account" class="l-list px-3">
    <accounts-summary :total="account.getTotal(currentPeriod).total" :balance="account.getBalance()" class="mb-2"  />
    <summary-expenses nameValue1="Pagados" :value1="paid" nameValue2="Vencidos" :value2="expired" nameValue3="Pendientes" :value3="pending" />

    <div v-if="expensesByDate.length > 0">
      <div class="mt-4" v-for="(item, index) in expensesByDate" :key="index">
        <p class="text-sm text-book mb-3"> {{ item.date | formatDateDayWeek }} </p>
        <expense-row v-for="expense in item.expenses" :key="expense.id" :expense="expense" :calculatePaids="calculatePaids" />
      </div>
    </div>
  </div>
</template>

<script>
import AccountsSummary from '@/accounts/context/components/AccountsSummary.vue'
import ExpenseRow from './ExpenseRow.vue'
import { mapState } from 'vuex'
import moment from 'moment'
import SummaryExpenses from '@/shared/components/SummaryExpenses.vue'
import { utils } from '@/shared/utils'

export default {

  components: { ExpenseRow, AccountsSummary, SummaryExpenses },

  name: 'ExpensesPerAccount',

  props: {
    account: {
      type: Object
    }
  },

  data () {
    return {
      paid: 0,
      expired: 0,
      pending: 0
    }
  },

  watch: {
    currentPeriod () {
      this.paid = this.expired = this.pending = 0
    }
  },

  computed: {
    expensesByDate () {
      let expenses = []
      const dates = []
      let cDate = ''
      const accountExpenses = this.account.getExpenses(this.currentPeriod)

      accountExpenses.forEach((expense, index) => {
        if (index === 0) {
          cDate = utils.getFixedExpenseDate(expense.date, this.currentPeriod)
        }

        if (moment(utils.getFixedExpenseDate(expense.date, this.currentPeriod)).isSame(cDate)) {
          expenses.push(expense)
        } else {
          dates.push({ date: cDate, expenses })

          cDate = utils.getFixedExpenseDate(expense.date, this.currentPeriod)
          expenses = []

          expenses.push(expense)
        }
      })

      dates.push({ date: cDate, expenses })

      return accountExpenses.length > 0 ? dates : []
    },

    ...mapState('expensesStore', ['currentPeriod'])
  },

  methods: {
    calculatePaids (typePaid) {
      if (typePaid === 'Vencido') this.expired += 1
      if (typePaid === 'Pagado') this.paid += 1
      if (typePaid === 'Pendiente') this.pending += 1
    }
  }
}
</script>
