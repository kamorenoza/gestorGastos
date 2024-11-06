<template>
  <div>
    <label>Categoría*</label>

    <div v-click-outside="closeDiv" class="position-relative border-bottom mt-2">
      <p class="cursor-pointer o-select__text text-medium" v-if="!category" @click="changeShow()">Seleccione aqui una categoría...</p>
      <div v-else class="d-flex align-items-center cursor-pointer" @click="changeShow()">
        <div class="icon-category icon-category--small" :style="{ backgroundColor: category.backgroundColor }">
          <b-icon :icon="category.icon" :style="{ color: category.iconColor }" />
        </div>
        <p class="ml-2 text-medium">{{ category.detail }}</p>
      </div>

      <div v-if="show" class="o-select">
        <div
          class="o-select__item"
          v-for="category in categories"
          :value="category.getId()"
          :key="category.getId()"
          @click="selectCategory(category)"
        >
          <div class="d-flex align-items-center">
            <div class="icon-category icon-category--small" :style="{ backgroundColor: category.backgroundColor }">
              <b-icon :icon="category.icon" :style="{ color: category.iconColor }" />
            </div>
            <p class="ml-2 text-medium">{{ category.detail }}</p>
          </div>
       </div>
     </div>
   </div>

    <valid-alert :data-value="category" :validate="validate" />
  </div>
</template>

<script>
import validAlert from '@/shared/components/validAlert.vue'
import { mapState } from 'vuex'

export default {
  name: 'SelectCategory',

  components: {
    validAlert
  },

  props: {
    validate: {
      type: Boolean,
      default: false
    },

    value: {
      type: [String, Number, Object],
      default: ''
    }
  },

  data () {
    return {
      category: this.value,
      show: false
    }
  },

  watch: {
    category (value) {
      this.$emit('input', value)
    },

    value (value) {
      this.category = value
    }
  },

  computed: {
    ...mapState('categoriesStore', ['categories'])
  },

  methods: {
    closeDiv () {
      this.show = false
    },

    changeShow () {
      this.show = !this.show
    },

    selectCategory (category) {
      this.category = category
      this.closeDiv()
    }
  }
}
</script>
