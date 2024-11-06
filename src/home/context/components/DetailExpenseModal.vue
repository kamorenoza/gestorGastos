<template>
  <b-modal :id="idModal" centered hide-header hide-footer>
      <div class="text-center mb-3">
        <p class="text-book">{{ expense.description }}</p>
      </div>

      <div class="d-flex align-items-center mb-2 border-bottom pb-2">
        <p class="modal-subtitle text-book text-sm">Fecha</p>
        <p class="text-sm gray-text">{{ date | formatAllDate }}</p>
      </div>

      <div class="d-flex align-items-center mb-2 border-bottom pb-2">
        <p class="modal-subtitle text-book text-sm">Tipo</p>
        <p class="text-sm gray-text">{{ type }}</p>
      </div>

      <div class="d-flex align-items-center mb-2 border-bottom pb-2">
        <p class="modal-subtitle text-book text-sm">Valor</p>
        <p class="text-sm gray-text">$ {{ amount | formatNumber }}</p>
      </div>

      <div class="d-flex align-items-center mb-2 border-bottom pb-2">
        <p class="modal-subtitle text-book text-sm">Categoria</p>
        <div class="d-flex align-items-center">
          <div class="icon-category icon-category--small mr-2" :style="{ backgroundColor: category.backgroundColor }">
            <b-icon :icon="category.icon" :style="{ color: category.iconColor }" />
          </div>
          <p class="text-sm gray-text">{{ category.detail }}</p>
        </div>
      </div>

      <div class="d-flex align-items-center mb-2 border-bottom pb-2">
        <p class="modal-subtitle text-book text-sm">Cuenta</p>
        <p v-if="!expense.product" class="text-sm gray-text">Ninguna asociada</p>
        <div v-else class="d-flex align-items-center">
          <div class="icon-category icon-category--small mr-2">
            <b-icon :icon="expense.product.icon" :style="{ color: expense.product.color }" />
          </div>
          <p class="text-sm gray-text">{{ expense.product.name }}</p>
        </div>
      </div>

      <div class="d-flex align-items-center mb-2 pb-2">
        <p class="modal-subtitle text-book text-sm">Estado pago</p>
        <p class="text-sm gray-text">{{ paid }}</p>
      </div>

      <div class="text-center mt-4">
        <button @click="close()" class="btn button-white btn-sm ml-1 w-50">Cerrar</button>
      </div>

    </b-modal>
</template>

<script>
export default {
  props: {
    expense: {
      type: Object
    },

    id: {
      type: [String, Number]
    },

    date: {
      type: [String, Number]
    },

    amount: {
      type: [String, Number]
    },

    type: {
      type: [String, Number]
    },

    paid: {
      type: [String, Number, Boolean]
    }
  },

  computed: {
    category () {
      return this.expense.category
    },

    idModal () {
      return `id${this.id}`
    }
  },

  methods: {
    close () {
      this.$bvModal.hide(this.idModal)
    }
  }
}
</script>
