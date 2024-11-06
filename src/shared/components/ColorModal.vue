<template>
  <div class="mb-3">
    <label>{{ title }}</label>
    <b-button class="ml-3 button-color-picked" v-b-modal="idModal" :style="{backgroundColor: colorSelected}"></b-button>
    <b-modal :id="idModal" title="Seleccione color">
      <chrome-picker v-model="colorSelected" />
    </b-modal>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'ColorModal',

  components: {
    'chrome-picker': Chrome
  },

  props: {
    value: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: 'Color del icono'
    },

    idModal: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      colorSelected: this.value
    }
  },

  watch: {
    colorSelected (value) {
      this.iconColor = value.hex ? value.hex : value
      this.$emit('input', this.iconColor)
    },

    value (value) {
      this.colorSelected = value
    }
  }
}
</script>
