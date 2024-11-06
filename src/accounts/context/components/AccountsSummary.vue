<template>
  <div class="summary d-flex align-items-center">
    <div class="d-flex align-items-center w-50">
      <b-icon class="mx-2" :font-scale="1.4"  icon="piggy-bank" />
      <div>
        <p class="gray-xs-text">Saldo actual</p>
        <p class="text-book text-big" :class="classTotal">$ {{ total | formatNumber }}</p>
      </div>
    </div>

    <div class="d-flex align-items-center border-left w-50 pl-2">
      <b-icon class="mx-2" :font-scale="1.3" icon="coin" />
      <div>
        <p class="gray-xs-text"> Balance total</p>
        <p class="text-book text-big">$ {{ balance | formatNumber }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountsSummary',

  props: {
    total: {
      type: Number,
      default: 0
    },

    balance: {
      type: Number,
      default: 0
    }
  },

  computed: {
    classTotal () {
      if (this.total === 0) return ''

      return this.total < 0 ? 'text-danger' : 'text-success'
    }
  }
}
</script>
