<template>
  <div class="mb-3 pb-2">
    <div class="d-flex align-items-center">
      <div class="d-flex align-items-center">
        <div class="icon-category icon-category--small mr-2" :style="{ backgroundColor: category.backgroundColor }">
          <b-icon :icon="category.icon" :style="{ color: category.iconColor }" />
        </div>
      </div>

      <div class="w-100">
        <div class="d-flex align-items-center justify-content-between">
          <p class="text-book text-capitalize text-medium">{{ expense.description }} </p>
          <p class="text-book text-sm" :class="classAmount">$ {{ expense.amount | formatNumber }} </p>
        </div>

        <div class="d-flex align-items-center justify-content-between pt-1">
          <p class="gray-xs-text">{{ expense.date | formatAllDate }} | {{ infoExpense }} </p>
          <div class="d-flex align-items-center justify-content-between">
            <button @click="openModal()" class="button-action button-action--edit ml-3"><b-icon icon="pencil" /></button>
            <button @click="deleteExpense()" class="button-action ml-3 button-action--delete"><b-icon icon="trash" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from '@/shared/utils'
import { mapMutations } from 'vuex'
import Notification from '@/shared/notification'
import ProductsUc from '@/products/usecases/productsUc'

export default {
  name: 'ExpenseRow',

  props: {
    expense: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      uc: new ProductsUc()
    }
  },

  computed: {
    classAmount () {
      return this.expense.type === 'credit' ? 'text-danger' : 'text-success'
    },

    infoExpense () {
      return this.expense.type === 'credit' ? 'Gasto' : 'Ingreso'
    },

    category () {
      return this.expense.category
    }
  },

  methods: {
    async deleteExpense () {
      const type = this.expense.type === 'credit' ? 'gasto' : 'ingreso'
      const msj = `Se eliminará el ${type} ¿Está seguro de realizarla?`
      const confirmation = await new Notification().confirm(msj)

      if (confirmation.isConfirmed) {
        await this.deleteAll(true)
      }
    },

    async deleteAll (all) {
      utils.startLoading()

      try {
        await this.uc.deleteExpense(this.expense)
        utils.stopLoading()
      } catch (error) {
        new Notification().notify('Ocurrió un error!')
        utils.stopLoading()
      }
    },

    openModal () {
      this.setExpenseProductSelected(this.expense)
      this.$bvModal.show('add-expense-product-modal')
    },

    ...mapMutations('productsStore', ['setExpenseProductSelected'])
  }
}
</script>
