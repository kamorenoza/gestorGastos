<template>
  <div class="mb-5">
    <div v-if="icon" class="icon-category icon-category--big mx-auto" :style="{backgroundColor: backgroundColor}" v-b-modal.modal-icon>
      <b-icon :icon="icon" :style="{color: iconColor}" />
    </div>
    <p class="gray-text pl-1" v-else v-b-modal.modal-icon>Seleccione icono...</p>
    <valid-alert :data-value="icon" :validate="validate" />
  </div>
</template>

<script>
import validAlert from './validAlert.vue'

export default {
  components: {
    validAlert
  },

  name: 'IconDetail',

  props: {
    icon: {
      type: String,
      default: ''
    },

    iconColor: {
      type: String,
      default: ''
    },

    backgroundColor: {
      type: String,
      default: ''
    },

    validate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
