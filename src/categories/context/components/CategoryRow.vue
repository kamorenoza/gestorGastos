<template>
  <tr>
    <td>
      <div class="d-flex align-items-center">
        <div class="icon-category" :style="{ backgroundColor: category.backgroundColor }">
          <b-icon :icon="category.icon" :style="{ color: category.iconColor }" />
        </div>
      </div>
    </td>
    <td>
      <div class="d-flex align-items-center">
        <p>{{ category.detail }}</p>
      </div>
    </td>
    <td class="actions-column">
      <div class="d-flex align-items-center justify-content-around">
        <div @click="deleteCategory()" class="icon-button text-center">
          <b-icon icon="trash" />
          <p>Eliminar</p>
        </div>
        <div @click="goToEditCategory()" class="icon-button text-center">
          <b-icon icon="pencil" />
          <p>Editar</p>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapMutations } from 'vuex'
import CategoryUc from '@/categories/usecases/categoryUc'
import Notification from '@/shared/notification'
import { utils } from '@/shared/utils'

const uc = new CategoryUc()

export default {
  name: 'CategoryRow',

  props: {
    category: {
      type: Object,
      required: true
    }
  },

  methods: {
    goToEditCategory () {
      this.setCategorySelected(this.category)
      this.$router.push('/save-category')
    },

    async deleteCategory () {
      const confirmation = await new Notification().confirm('Está seguro de eliminar la categoría?')

      if (confirmation.isConfirmed) {
        utils.startLoading()
        const response = await uc.deleteCategory(this.category.getId())
        this.setCategories(await uc.getCategories())
        utils.stopLoading()
        new Notification().notify(response)
      }
    },

    ...mapMutations('categoriesStore', ['setCategorySelected', 'setCategories'])
  }
}
</script>
