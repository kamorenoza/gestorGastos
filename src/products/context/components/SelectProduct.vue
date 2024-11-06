<template>
  <div>
    <label>Cuenta</label>

    <div v-click-outside="closeDiv" class="position-relative border-bottom mt-2">
      <p class="cursor-pointer o-select__text text-medium" v-if="!product" @click="changeShow()">¿Está asociado a una cuenta? Seleccionela aquí</p>
      <div v-else class="d-flex align-items-center cursor-pointer" @click="changeShow()">
        <div class="icon-category icon-category--small">
          <b-icon :icon="product.icon" :style="{ color: product.iconColor }" />
        </div>
        <p class="ml-2 text-medium">{{ product.name }}</p>
      </div>

      <div v-if="show" class="o-select">
        <div class="o-select__item" value="" @click="selectProduct('')">
          <p class="ml-2 text-medium">Ninguna</p>
       </div>

        <div
          class="o-select__item"
          v-for="product in products"
          :value="product.getId()"
          :key="product.getId()"
          @click="selectProduct(product)"
        >
          <div class="d-flex align-items-center">
            <div class="icon-category icon-category--small">
              <b-icon :icon="product.icon" :style="{ color: product.iconColor }" />
            </div>
            <p class="ml-2 text-medium">{{ product.name }}</p>
          </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SelectProduct',

  props: {
    value: {
      type: [String, Number, Object],
      default: ''
    }
  },

  data () {
    return {
      product: this.value,
      show: false
    }
  },

  watch: {
    product (value) {
      this.$emit('input', value)
    },

    value (value) {
      this.product = value
    }
  },

  computed: {
    ...mapState('productsStore', ['products'])
  },

  methods: {
    closeDiv () {
      this.show = false
    },

    changeShow () {
      this.show = !this.show
    },

    selectProduct (product) {
      this.product = product
      this.closeDiv()
    }
  }
}
</script>
