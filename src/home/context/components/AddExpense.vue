<template>
  <div>
    <title-general :title="title" backRoute="/" />
    <div class="l-content px-3">
      <div class="l-list l-list--form">
        <input-general label="Valor*" v-model="amount" :validate="validate" :isNumber="true" :max="11" pattern="/d*" />
        <input-general label="Descripción*" v-model="description" :validate="validate" :max="25" />
        <select-category v-model="category" :validate="validate" />
        <select-date v-model="date" />
        <select-product class="mb-4" v-model="product" />
        <switch-checkbox class="mb-3" label="Realizado" v-model="paid" :disabled="!!id" />
        <switch-checkbox class="mb-3" label="Es fijo" v-model="fixedExpense" :disabled="repeat || !!id" />
        <switch-checkbox class="mb-1" label="Repetir" v-model="repeat" :disabled="fixedExpense || !!id" />
        <repeat-expense v-if="repeat && date" :date="date" :validate="validate" v-model="times" />

        <div class="button-container">
          <button @click="save()" class="btn button-color-general mr-1 w-50">Guardar</button>
          <button @click="cancel()" class="btn button-white ml-1 w-50">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputGeneral from '@/shared/components/InputGeneral.vue'
import SelectCategory from './SelectCategory.vue'
import SelectDate from '@/shared/components/SelectDate.vue'
import SwitchCheckbox from '@/shared/components/SwitchCheckbox.vue'
import RepeatExpense from './RepeatExpense.vue'
import { utils } from '@/shared/utils'
import Notification from '@/shared/notification'
import ExpensesUc from '../../usecases/expensesUc'
import AccountRepository from '@/accounts/models/accountRepository'
import { mapMutations, mapState } from 'vuex'
import moment from 'moment'
import SelectProduct from '@/products/context/components/SelectProduct.vue'
import TitleGeneral from '@/shared/components/TitleGeneral.vue'

const uc = new ExpensesUc(new AccountRepository())

export default {
  name: 'AddExpense',

  components: {
    InputGeneral,
    SelectCategory,
    SelectDate,
    SwitchCheckbox,
    RepeatExpense,
    SelectProduct,
    TitleGeneral
  },

  data () {
    return {
      amount: '',
      description: '',
      category: '',
      date: '',
      fixedExpense: false,
      paid: false,
      repeat: false,
      times: 1,
      validate: false,
      id: '',
      product: ''
    }
  },

  watch: {
    currentPeriod (value) {
      this.date = value
    }
  },

  computed: {
    validData () {
      const repeat = this.repeat ? this.repeat && this.times : true

      return this.amount && this.description && this.category && this.date && repeat
    },

    title () {
      const action = this.id ? 'Editar' : 'Agregar'
      return this.type === 'credit' ? `${action} Gasto` : `${action} Ingreso`
    },

    ...mapState('expensesStore', ['type', 'currentPeriod', 'expenseSelected', 'editExpense'])
  },

  methods: {
    async save () {
      this.validate = true
      let response = ''

      if (this.validData) {
        if (this.id) {
          if (this.expenseSelected.fixed || this.expenseSelected.repeat) {
            const confirmation = await new Notification().selectOption('Todos', 'Los próximos', 'El cambio desea aplicarlos para: ')
            if (confirmation.isConfirmed || confirmation.isDenied) response = await this.updateExpense(confirmation.isConfirmed)
          } else response = await this.updateExpense()
        } else {
          utils.startLoading()
          response = await uc.addExpense(
            this.amount,
            this.description,
            this.category,
            this.date,
            this.fixedExpense,
            this.paid,
            this.repeat,
            this.times,
            this.type,
            this.product

          )
          this.clear()
        }

        utils.stopLoading()

        if (response) await new Notification().notify(response)
        this.$router.push('/')
      }
    },

    async updateExpense (allPayments) {
      utils.startLoading()

      const expenseEdited = this.expenseSelected
      expenseEdited.id = this.id

      const response = await uc.editExpense(
        expenseEdited,
        this.indexPayment,
        this.amount,
        this.description,
        this.category,
        this.date,
        this.fixedExpense,
        this.paid,
        this.repeat,
        this.times,
        allPayments,
        this.product
      )

      let edit = this.editExpense
      edit++
      this.setEditExpense(edit)

      return response
    },

    clear () {
      this.amount = ''
      this.description = ''
      this.category = ''
      this.currentDate()
      this.fixedExpense = false
      this.paid = false
      this.repeat = false
      this.times = 1
      this.validate = false
      this.id = ''
      this.product = ''
      this.setExpenseSelected(null)
      this.setIndexPaymentSelected(-1)
    },

    cancel () {
      this.clear()
      this.$router.push('/')
    },

    currentDate () {
      this.date = this.currentPeriod
    },

    fillData () {
      if (this.expenseSelected) {
        this.id = this.expenseSelected.id
        this.amount = this.setAmount(this.expenseSelected)
        this.description = this.expenseSelected.description
        this.category = this.expenseSelected.category
        this.date = this.expenseSelected.date
        this.fixedExpense = this.expenseSelected.fixed
        this.paid = this.expenseSelected.paid
        this.repeat = this.expenseSelected.repeat
        this.times = this.expenseSelected.repeatTimes
        this.product = this.expenseSelected.product
      }
    },

    openModal () {
      this.currentDate()
      this.fillData()
    },

    setAmount (expense) {
      const firstDatePeriod = utils.getFirstDay(this.currentPeriod)
      const lastDatePeriod = utils.getLastDay(this.currentPeriod)
      let indexPayment = -1

      if (expense.repeat || expense.fixed) {
        indexPayment = expense.payments.findIndex(
          payment => { return moment(payment.date).isBetween(firstDatePeriod, lastDatePeriod, undefined, '[]') }
        )
      }

      let amount = expense.amount

      if (expense.repeat) {
        if (indexPayment !== -1) amount = expense.payments[indexPayment].amount

        if (expense.editList.length > 0) {
          expense.editList.forEach(edit => {
            if (moment(utils.getFirstDay(edit.date)).isSameOrBefore(firstDatePeriod)) amount = edit.amount
          })
        }
      }

      if (expense.fixed) {
        if (indexPayment !== -1) amount = expense.payments[indexPayment].amount

        if (expense.editList.length > 0) {
          expense.editList.forEach(edit => {
            if (moment(utils.getFirstDay(edit.date)).isSameOrBefore(firstDatePeriod)) amount = edit.amount
          })
        }
      }

      return amount
    },

    ...mapMutations('expensesStore', ['setExpenseSelected', 'setIndexPaymentSelected', 'setEditExpense'])
  },

  created () {
    this.openModal()
  },

  beforeDestroy () {
    this.cancel()
  }
}
</script>
