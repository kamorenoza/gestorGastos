<template>
  <div class="mb-1">
    <label>{{ label }}</label>
    <input class="form-control" type="text" :class="customClass" :maxlength="max" v-model="text" :pattern="pattern" />
    <valid-alert :data-value="text" :validate="validate" />
  </div>
</template>

<script>
import { utils } from '../utils'
import validAlert from './validAlert.vue'

export default {
  name: 'InputGeneral',

  components: {
    validAlert
  },

  props: {
    label: {
      type: String,
      default: ''
    },

    value: {
      type: [String, Number],
      default: ''
    },

    customClass: {
      type: String,
      default: ''
    },

    max: {
      type: Number,
      default: 100
    },

    isNumber: {
      type: Boolean,
      default: false
    },

    pattern: {
      type: String,
      default: ''
    },

    validate: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      text: this.value
    }
  },

  watch: {
    text (value) {
      if (this.isNumber) this.text = utils.onlyNumber(value)
      this.$emit('input', this.text)
    },

    value (value) {
      this.text = value
    }
  }
}
</script>
