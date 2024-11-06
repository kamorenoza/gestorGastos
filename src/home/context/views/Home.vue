<template>
  <div>
    Home
  </div>
</template>

<script>

export default {
  name: 'HomeView',

  created () {
    document.body.classList.add('white-body')
  },

  beforeDestroy () {
    document.body.classList.remove('white-body')
  }
}

</script>
