<template>
  <div>
    <b-button class="ml-3 button-rounded button-salmon" v-b-modal="modalId">+</b-button>
    <b-modal :id="modalId" :title="title">
      <slot></slot>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'CategoryModal',

  props: {
    title: {
      type: String,
      default: ''
    },

    modalId: {
      type: String,
      default: 'modal-id'
    }
  }
}
</script>
