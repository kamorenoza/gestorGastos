<template>
  <div>
    <label for="datepicker">Fecha*</label>
    <div class="border-bottom">
      <b-form-datepicker
        id="datepicker"
        locale="es"
        v-model="date"
        placeholder="Seleccione fecha"
        :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit' }"
      />
    </div>

    <valid-alert :dataValue="date" :validate="validate" />
  </div>
</template>

<script>
import validAlert from './validAlert.vue'

export default {
  name: 'SelectDate',

  components: {
    validAlert
  },

  props: {
    value: {
      type: [String, Number],
      default: ''
    },

    validate: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      date: this.value
    }
  },

  watch: {
    date (value) {
      this.$emit('input', value)
    },

    value (value) {
      this.date = value
    }
  }
}
</script>
