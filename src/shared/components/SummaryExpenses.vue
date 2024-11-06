<template>
  <div class="summary d-flex align-items-center justify-content-between px-2">
    <div class="d-flex align-items-center">
      <div class="action action--sm mr-2">
        <button disabled class="button-action button-action--success">
          <b-icon icon="check2-circle" />
        </button>
      </div>
      <div class="d-flex align-items-center">
        <p class="gray-xs-text mr-1">{{ nameValue1 }}</p>
        <p class="text-book text-medium">{{ value1 }}</p>
      </div>
    </div>

     <div class="d-flex align-items-center">
      <div class="action action--sm mr-2">
        <button disabled class="button-action button-action--danger">
          <b-icon icon="clock-history" />
        </button>
      </div>
      <div class="d-flex align-items-center">
        <p class="gray-xs-text mr-1">{{ nameValue3 }}</p>
        <p class="text-book text-medium">{{ value3 }}</p>
      </div>
    </div>

     <div class="d-flex align-items-center">
      <div class="action action--sm mr-2">
        <button disabled class="button-action button-action--warning">
          <b-icon icon="exclamation" />
        </button>
      </div>
      <div class="d-flex align-items-center">
        <p class="gray-xs-text mr-1">{{ nameValue2 }}</p>
        <p class="text-book text-medium">{{ value2 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nameValue1: {
      type: String,
      default: ''
    },

    nameValue2: {
      type: String,
      default: ''
    },

    nameValue3: {
      type: String,
      default: ''
    },

    value1: {
      type: [String, Number],
      default: ''
    },

    value2: {
      type: [String, Number],
      default: ''
    },

    value3: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
