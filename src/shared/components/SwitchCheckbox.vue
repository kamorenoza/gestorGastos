<template>
  <div class="d-flex align-items-center justify-content-between border-bottom pb-2">
    <label>{{ label }}</label>
    <b-form-checkbox size="lg" v-model="checked" name="check-button" switch :disabled="disabled" />
  </div>
</template>

<script>
export default {
  name: 'SwitchCheckbox',

  props: {
    label: {
      type: String,
      default: ''
    },

    value: {
      type: [Boolean, String],
      default: false
    },

    validate: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      checked: this.value
    }
  },

  watch: {
    checked (value) {
      this.$emit('input', value)
    },

    value (value) {
      this.checked = value
    }
  }
}
</script>
