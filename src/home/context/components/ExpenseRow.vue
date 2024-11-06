<template>
  <div class="mb-3 pb-1">
    <div class="d-flex align-items-center justify-content-between">

      <div class="d-flex align-items-center">
        <div class="text-center">
          <div class="icon-category icon-category--small mr-2" :style="{ backgroundColor: category.backgroundColor }">
            <b-icon :icon="category.icon" :style="{ color: category.iconColor }" />
          </div>
        </div>

        <div @click="openDetailModal(expense.id)">
          <p class="text-capitalize mb3">
            {{ expense.description }}
          </p>
        </div>
      </div>

      <div class="text-right d-flex align-items-center justify-content-between">
        <p class="text-book text-medium pr-2" :class="classAmount">$ {{ amount | formatNumber }} </p>

        <div class="d-flex align-items-center justify-content-between">
          <div class="action mr-2">
            <button :disabled="disabled" @click="changePaid()" class="button-action" :class="classPaid">
              <b-icon :icon="paidIcon" />
            </button>
          </div>

          <div>
            <b-dropdown size="sm"  variant="link" dropleft toggle-class="text-decoration-none p-0 text-dark"  no-caret>
              <template #button-content>
                <b-icon icon="three-dots-vertical" />
              </template>
              <b-dropdown-item class="text-medium mb-2" @click="editExpe()">Editar</b-dropdown-item>
              <b-dropdown-item class="text-medium mb-2" @click="deleteExpense()">Eliminar</b-dropdown-item>
              <b-dropdown-item class="text-medium" @click="openDetailModal(expense.id)">Detalles</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
    <detail-expense-modal
      :expense="expense"
      :id="expense.id"
      :date="dateExpense"
      :amount="amount"
      :type="infoExpense"
      :paid="paidText"
    />
  </div>
</template>

<script>
import { utils } from '@/shared/utils'
import { mapMutations, mapState } from 'vuex'
import moment from 'moment'
import Notification from '@/shared/notification'
import ExpensesUc from '@/home/usecases/expensesUc'
import DetailExpenseModal from './DetailExpenseModal.vue'

const uc = new ExpensesUc()

export default {
  components: { DetailExpenseModal },
  name: 'ExpenseRow',

  props: {
    expense: {
      type: Object,
      required: true
    },

    calculatePaids: {
      type: Function
    }
  },

  data () {
    return {
      indexPayment: 0,
      paid: false,
      amount: 0,
      disabled: false
    }
  },

  watch: {
    currentPeriod () {
      this.initAction()
    },

    editExpense () {
      this.initAction()
    }
  },

  computed: {
    classAmount () {
      return this.expense.type === 'credit' ? 'text-danger' : 'text-success'
    },

    dateExpense () {
      if (this.expense.repeat) return this.indexPayment !== -1 ? this.expense.payments[this.indexPayment].date : 0
      else if (this.expense.fixed) return utils.getFixedExpenseDate(this.expense.date, utils.getFirstDay(this.currentPeriod))
      else return this.expense.date
    },

    infoExpense () {
      const type = this.expense.type === 'credit' ? 'Gasto' : 'Ingreso'

      if (this.expense.repeat) {
        const dateFormat = utils.sumMonths(this.expense.date, this.expense.repeatTimes)
        return `${type} hasta ${utils.formatAllDate(dateFormat)}`
      }
      if (this.expense.fixed) return `${type} fijo`

      return type
    },

    paidIcon () {
      if (this.paid) return 'check2-circle'
      else return moment(this.dateExpense).isBefore(utils.getCurrentDate()) ? 'exclamation' : 'clock-history'
    },

    classPaid () {
      if (this.paid) return 'button-action--success'
      else return moment(this.dateExpense).isBefore(utils.getCurrentDate()) ? 'button-action--warning' : ''
    },

    paidText () {
      if (this.paid) return 'Pagado'
      else return moment(this.dateExpense).isBefore(utils.getCurrentDate()) ? 'Vencido' : 'Pendiente'
    },

    paidTextClass () {
      if (this.paid) return 'text-success'
      else return moment(this.dateExpense).isBefore(utils.getCurrentDate()) ? 'text-warn' : ''
    },

    category () {
      return this.expense.category
    },

    ...mapState('expensesStore', ['currentPeriod', 'editExpense']),
    ...mapState('productsStore', ['products'])
  },

  methods: {
    getPaymentIndex () {
      const firstDatePeriod = utils.getFirstDay(this.currentPeriod)
      const lastDatePeriod = utils.getLastDay(this.currentPeriod)

      this.indexPayment = this.expense.payments.findIndex(
        payment => { return moment(payment.date).isBetween(firstDatePeriod, lastDatePeriod, undefined, '[]') }
      )
    },

    setPaid () {
      if (this.expense.repeat) {
        if (this.indexPayment !== -1) this.paid = this.expense.payments[this.indexPayment].paid
        else this.paid = false
      } else if (this.expense.fixed) {
        if (this.indexPayment !== -1) this.paid = this.expense.payments[this.indexPayment].paid
        else this.paid = false
      } else this.paid = this.expense.paid
    },

    setAmount () {
      if (this.expense.repeat) {
        if (this.indexPayment !== -1) this.amount = this.expense.payments[this.indexPayment].amount
        else this.amount = this.expense.amount

        if (this.expense.editList.length > 0) {
          this.expense.editList.forEach(edit => {
            if (moment(utils.getFirstDay(edit.date)).isSameOrBefore(utils.getFirstDay(this.currentPeriod))) this.amount = edit.amount
          })
        }
      } else if (this.expense.fixed) {
        this.amount = this.indexPayment !== -1 ? this.expense.payments[this.indexPayment].amount : this.expense.amount

        if (this.expense.editList.length > 0) {
          this.expense.editList.forEach(edit => {
            if (moment(utils.getFirstDay(edit.date)).isSameOrBefore(utils.getFirstDay(this.currentPeriod))) this.amount = edit.amount
          })
        }
      } else this.amount = this.expense.amount
    },

    async changePaid () {
      const type = this.expense.type === 'credit' ? 'gasto' : 'ingreso'
      const status = this.paid ? 'NO PAGADO' : 'PAGADO'

      const confirmation = await new Notification().confirm(`Se marcará el ${type} como ${status}`)

      if (confirmation.isConfirmed) {
        this.disabled = true
        if (this.paid) this.paid = false
        else this.paid = utils.getCurrentDate()

        await uc.paidExpense(this.expense, this.indexPayment, this.paid, this.products)
        this.initAction()

        this.disabled = false
      }
    },

    async deleteExpense () {
      if (this.expense.fixed) this.deleteFixed()
      else {
        const type = this.expense.type === 'credit' ? 'gasto' : 'ingreso'
        const msj = `Esta acción es IRREVERSIBLE, se eliminará todo el ${type} y cualquier registro de él ¿Está seguro de realizarla?`
        const confirmation = await new Notification().confirm(msj)

        if (confirmation.isConfirmed) {
          await this.deleteAll(true)
        }
      }
    },

    async deleteFixed () {
      const msj = 'Esta acción es IRREVERSIBLE, ¿Está seguro de realizarla?, Por favor seleccione cuales desea eliminar: '
      const confirmation = await new Notification().selectOption('Todos', 'Los próximos', msj)
      if (confirmation.isConfirmed || confirmation.isDenied) {
        await this.deleteAll(confirmation.isConfirmed)
      }
    },

    async deleteAll (all) {
      utils.startLoading()

      try {
        await uc.deleteExpense(this.expense, all)
        utils.stopLoading()
      } catch (error) {
        new Notification().notify('Ocurrió un error!')
        utils.stopLoading()
      }
    },

    editExpe () {
      this.setExpenseSelected(this.expense)
      this.setIndexPaymentSelected(this.indexPayment)
      this.$router.push('/add-expense')
    },

    initAction () {
      if (this.expense.repeat || this.expense.fixed) this.getPaymentIndex()
      this.setPaid()
      this.setAmount()
      this.calculatePaids(this.paidText)
    },

    openDetailModal (id) {
      const modalId = `id${id}`
      this.$bvModal.show(modalId)
    },

    ...mapMutations('expensesStore', ['setExpenseSelected', 'setIndexPaymentSelected'])
  },

  created () {
    this.initAction()
  }
}
</script>
