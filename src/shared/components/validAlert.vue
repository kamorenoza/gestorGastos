<template>
  <div class="valid-alert">
    <p v-if="validate && (!dataValue.toString().trim() || dataValue === 0)" class="text-danger">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'validAlert',

  props: {
    message: {
      type: String,
      default: 'Campo obligatorio'
    },

    dataValue: {
      type: [String, Number, Object],
      default: ''
    },

    validate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
