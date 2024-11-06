<template>
  <div>
    <title-general title="Categorias"  addButtonRoute="/save-category" />
    <div class="l-content">
      <div v-if="categories" class="l-list">
        <table class="table o-table">
          <tbody>
            <category-row v-for="(cat, index) in categories" :key="index" :category="cat" />
          </tbody>
        </table>

      </div>
      <div class="ml-3" v-else>Cargando categorias...</div>
    </div>
  </div>
</template>

<script>
import CategoryRow from '@/categories/context/components/CategoryRow.vue'
import { mapState } from 'vuex'
import TitleGeneral from '@/shared/components/TitleGeneral.vue'

export default {
  components: {
    CategoryRow,
    TitleGeneral
  },

  name: 'CategoriesView',

  computed: {
    ...mapState('categoriesStore', ['categories'])
  }
}
</script>
