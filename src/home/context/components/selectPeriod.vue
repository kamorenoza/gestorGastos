<template>
  <div class="m-select-period">
    <b-icon @click="changePeriod()" icon="chevron-left" />

    <div class="m-select-period__calendar">
       <b-form-datepicker
        id="datepicker-2"
        locale="es"
        v-model="date"
        button-only
        today-button
        label-today-button="Seleccionar hoy"
      />
      <p>{{ currentPeriod | formatDateMonthYear }} </p>
    </div>

    <b-icon @click="changePeriod(true)" icon="chevron-right" />
  </div>
</template>

<script>
import { utils } from '@/shared/utils'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'SelectPeriod',

  data () {
    return {
      date: this.currentPeriod
    }
  },

  watch: {
    date (value) {
      if (value !== this.currentPeriod) this.setCurrentPeriod(value)
    },

    currentPeriod (value) {
      if (value !== this.date) this.date = value
    }
  },

  computed: {
    ...mapState('expensesStore', ['currentPeriod'])
  },

  methods: {
    changePeriod (next) {
      if (next) this.setCurrentPeriod(utils.sumMonths(this.currentPeriod, 1))
      else this.setCurrentPeriod(utils.subtractMonths(this.currentPeriod, 1))
    },

    ...mapMutations('expensesStore', ['setCurrentPeriod'])
  }
}
</script>
