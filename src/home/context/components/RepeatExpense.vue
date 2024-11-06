<template>
  <div class="ml-3">
    <div class="d-flex align-items-center">
      <p class="text-medium mr-2 mb-0">Durante</p>
      <input type="text" class="form-control input-sm" maxlength="2" v-model="times">
      <p class="text-medium ml-2 mb-0">Meses</p>
    </div>
    <p class="gray-sm-text pt-2">Se repite hasta: {{ finishDate }} </p>
    <valid-alert :dataValue="times" :validate="validate" />
  </div>
</template>

<script>
import { utils } from '@/shared/utils'
import validAlert from '@/shared/components/validAlert.vue'

export default {
  components: { validAlert },
  name: 'RepeatExpense',

  props: {
    date: {
      type: String
    },

    validate: {
      type: Boolean,
      default: false
    },

    value: {
      type: [String, Number],
      default: ''
    }
  },

  data () {
    return {
      times: this.value,
      dateFisnish: ''
    }
  },

  watch: {
    times (value) {
      this.dateFisnish = utils.sumMonths(this.date, value)
      this.$emit('input', value)
    },

    date () {
      this.dateFisnish = utils.sumMonths(this.date, this.times)
    },

    value (value) {
      this.times = value
    }
  },

  computed: {
    finishDate () {
      return utils.formatDate(this.dateFisnish)
    }
  },

  created () {
    this.dateFisnish = utils.sumMonths(this.date, this.times)
  }
}
</script>
