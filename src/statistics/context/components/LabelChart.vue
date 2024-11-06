<template>
  <div class="m-label">
    <div class="m-label__point" :style="{ backgroundColor: color }">
      <b-icon icon="circle"></b-icon>
    </div>
    <div class="m-label__body">
      <p class="m-label__title">{{label}} </p>
      <p class="m-label__value">$ {{valueFormat}} </p>
      <p v-if="showPercentage" class="m-label__perc">{{percentage}}</p>
    </div>
  </div>
</template>

<script>
import { utils } from '@/shared/utils'
export default {
  props: {
    color: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    value: {
      type: [String, Number],
      default: ''
    },

    total: {
      type: Number,
      default: 1
    },

    showPercentage: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    percentage () {
      return (this.value * 100 / this.total).toFixed(0) + '%'
    },

    valueFormat () {
      return utils.formatNumber(this.value)
    }
  }
}
</script>
