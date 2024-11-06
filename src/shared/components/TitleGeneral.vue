<template>
  <div class="l-title" :class="addClass">
      <h2 class="main-title">{{ title }}</h2>

      <button v-if="backRoute" @click="goToRoute(backRoute)" class="btn back-arrow">
        <b-icon icon="arrow-left"></b-icon>
      </button>

      <button
        v-if="addButtonRoute"
        @click="goToRoute(addButtonRoute)"
        class="btn btn-block button-rounded button-big button-outline-color-general"
      >+</button>

      <button
        v-if="addButtonFunction"
        @click="addButtonFunction()"
        class="btn btn-block button-rounded button-big button-outline-color-general"
      >+</button>
    </div>
</template>

<script>
export default {
  name: 'TitleGeneral',

  props: {
    title: {
      type: String,
      default: ''
    },

    backRoute: {
      type: String,
      default: ''
    },

    addButtonRoute: {
      type: String,
      default: ''
    },

    addButtonFunction: {
      type: Function
    }
  },

  computed: {
    addClass () {
      return this.backRoute ? 'l-title-back' : ''
    }
  },

  methods: {
    goToRoute (route) {
      this.$router.push(route)
    }
  }
}
</script>
