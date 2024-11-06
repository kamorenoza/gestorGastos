<template>
  <b-modal @show="openModal" @hide="clear" id="add-expense-product-modal" hide-footer hide-header centered no-close-on-backdrop no-close-on-esc>
    <p class="text-center text-book">{{ title }} </p>

    <input-general label="Valor" v-model="amount" :validate="validate" :isNumber="true" />
    <input-general label="Descripción" v-model="description" :validate="validate" />
    <select-category v-model="category" :validate="validate" />
    <select-date v-model="date" />

    <div class="mt-3 d-flex align-items-center justify-content-between">
      <button @click="save()" class="btn button-color-general mr-1 w-50">Guardar</button>
      <button @click="closeModal()" class="btn button-white ml-1 w-50">Cancelar</button>
    </div>
  </b-modal>
</template>

<script>
import InputGeneral from '@/shared/components/InputGeneral.vue'
import SelectDate from '@/shared/components/SelectDate.vue'
import { utils } from '@/shared/utils'
import Notification from '@/shared/notification'
import { mapMutations, mapState } from 'vuex'
import ProductsUc from '@/products/usecases/productsUc'
import SelectCategory from '@/home/context/components/SelectCategory.vue'

export default {
  name: 'AddProductExpense',

  components: {
    InputGeneral,
    SelectCategory,
    SelectDate
  },

  data () {
    return {
      amount: '',
      description: '',
      category: '',
      date: utils.getCurrentDate(),
      validate: false,
      id: '',
      uc: new ProductsUc()
    }
  },

  computed: {
    validData () {
      return this.amount && this.description && this.category && this.date
    },

    title () {
      const action = this.id ? 'Editar' : 'Agregar'
      return this.type === 'credit' ? `${action} Gasto` : `${action} Ingreso`
    },

    ...mapState('productsStore', ['type', 'productSelected', 'expenseProductSelected'])
  },

  methods: {
    async save () {
      this.validate = true
      let response = ''

      if (this.validData) {
        utils.startLoading()

        if (!this.id) {
          response = await this.uc.addExpense(
            this.amount,
            this.description,
            this.category,
            this.date,
            this.type
          )
        } else {
          response = await this.uc.editExpense(
            this.expenseProductSelected,
            this.amount,
            this.description,
            this.category,
            this.date
          )
        }

        utils.stopLoading()

        if (response) await new Notification().notify(response)
        this.closeModal()
      }
    },

    async updateExpense () {
      utils.startLoading()

      const expenseEdited = this.expenseProductSelected
      expenseEdited.id = this.id

      const response = await this.uc.editExpense(
        expenseEdited,
        this.amount,
        this.description,
        this.category,
        this.date
      )

      return response
    },

    clear () {
      this.amount = ''
      this.description = ''
      this.category = ''
      this.validate = false
      this.id = ''
      this.date = utils.getCurrentDate()
      this.setExpenseProductSelected(null)
    },

    closeModal () {
      this.clear()
      this.$bvModal.hide('add-expense-product-modal')
    },

    fillData () {
      if (this.expenseProductSelected) {
        this.id = this.expenseProductSelected.id
        this.amount = this.expenseProductSelected.amount
        this.description = this.expenseProductSelected.description
        this.category = this.expenseProductSelected.category
        this.date = this.expenseProductSelected.date
      }
    },

    openModal () {
      this.fillData()
    },

    ...mapMutations('productsStore', ['setExpenseProductSelected'])
  },

  mounted () {
    this.openModal()
  }
}
</script>
