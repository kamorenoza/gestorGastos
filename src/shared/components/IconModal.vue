<template>
  <div>
    <label>Icono</label>
    <b-button class="ml-3 button-rounded button-salmon" v-b-modal.modal-icon>+</b-button>
    <b-modal id="modal-icon" title="Seleccione icono">
      <div class="d-flex flex-wrap justify-content-between">
        <div v-for="icon in icons" :key="icon" @click="selectIcon(icon)" class="mx-3 mb-3 cursor-pointer">
          <b-icon class="h1" :icon="icon" />
        </div>
      </div>
    </b-modal>
  </div>

</template>

<script>
import { ICONS } from '../constants'

export default {
  name: 'IconModal',

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  computed: {
    icons () {
      return ICONS
    }
  },

  data () {
    return {
      iconSelected: this.value
    }
  },

  watch: {
    iconSelected (value) {
      this.$emit('input', value)
    },

    value (value) {
      this.iconSelected = value
    }
  },

  methods: {
    selectIcon (icon) {
      this.iconSelected = icon
      this.$bvModal.hide('modal-icon')
    }
  }
}
</script>
