<template>
  <div class="card card--product">
    <div class="card-header cursor-pointer pb-0">
      <div @click="goToDetails()" class="d-flex align-items-center">
        <b-icon :icon="product.getIcon()" :style="{ color: product.getColor() }" />
        <p class="ml-2">{{ product.getName() }}</p>
      </div>
    </div>

    <div @click="goToDetails()" class="card-body">
      <div class="d-flex align-items-center justify-content-between mt-2">
        <p class="mr-3 gray-sm-text">Saldo actual</p>
        <p class="text-book card__value text-medium" :class="classValue">$ {{ product.getBalance() | formatNumber  }}</p>
      </div>
    </div>
    <div class="card-footer justify-content-end text-general">
      <p class="cursor-pointer text-sm mr-4" @click="goToEditProduct()">EDITAR</p>
      <p class="cursor-pointer text-sm mr-4" @click="deleteProduct()">ELIMINAR</p>
      <p class="cursor-pointer text-sm" @click="goToDetails()">DETALLE</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ProductUc from '@/products/usecases/productsUc'
import Notification from '@/shared/notification'
import { utils } from '@/shared/utils'

const uc = new ProductUc()

export default {
  name: 'ProductRow',

  props: {
    product: {
      type: Object
    }
  },

  computed: {
    classValue () {
      return parseInt(this.product.getBalance()) < 0 ? 'text-danger' : parseInt(this.product.getBalance()) > 0 ? 'text-success' : ''
    },

    ...mapState('expensesStore', ['currentPeriod'])
  },

  methods: {
    goToEditProduct () {
      this.setProductSelected(this.product)
      this.$router.push('/save-product')
    },

    async deleteProduct () {
      const text = 'Se borrará toda la información y movimientos de la cuenta y no se podrán recuperar, Está seguro de eliminar la cuenta?'
      const confirmation = await new Notification().confirm(text)

      if (confirmation.isConfirmed) {
        utils.startLoading()
        const response = await uc.deleteProduct(this.product.getId())
        this.setProducts(await uc.getProducts())
        utils.stopLoading()
        new Notification().notify(response)
      }
    },

    goToDetails () {
      this.setProductSelected(this.product)
      this.$router.push('/details-product')
    },

    ...mapMutations('productsStore', ['setProductSelected', 'setProducts', 'setType'])
  },

  created () {

  }
}
</script>
