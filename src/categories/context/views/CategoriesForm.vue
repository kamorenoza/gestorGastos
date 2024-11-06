<template>
  <div>
    <title-general :title="title" backRoute="/categories" />
    <div class="l-content">
      <div class="l-list">
        <input-general v-model="detail" label="Nombre de la categoría" :validate="validate" :max="15" />
        <icon-modal v-model="icon" />
        <icon-detail :icon="icon" :iconColor="iconColor" :validate="validate" :backgroundColor="backgroundColor" />
        <color-modal v-if="icon" v-model="iconColor" idModal="color-modal" />
        <color-modal v-if="icon" v-model="backgroundColor" idModal="background-modal" title="Colo del fondo" />

        <div>
          <button @click="save()" class="btn button-color-general btn-block">Guardar</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import CategoryUc from '@/categories/usecases/categoryUc'
import Notification from '@/shared/notification'
import { mapMutations, mapState } from 'vuex'
import TitleGeneral from '@/shared/components/TitleGeneral.vue'
import { utils } from '@/shared/utils'
import InputGeneral from '@/shared/components/InputGeneral.vue'
import IconModal from '@/shared/components/IconModal.vue'
import ColorModal from '@/shared/components/ColorModal.vue'
import IconDetail from '@/shared/components/IconDetail.vue'

const uc = new CategoryUc()

export default {
  name: 'CategoriesForm',

  components: {
    TitleGeneral,
    InputGeneral,
    IconModal,
    ColorModal,
    IconDetail
  },

  data () {
    return {
      detail: '',
      icon: '',
      backgroundColor: '',
      iconColor: '',
      validate: false,
      id: ''
    }
  },

  watch: {
    icon () {
      if (!this.iconColor || !this.backgroundColor) {
        this.backgroundColor = '#FFFFFF'
        this.iconColor = '#000000'
      }
    }
  },

  computed: {
    validData () {
      return this.icon.trim() !== '' && this.detail.trim() !== ''
    },

    title () {
      return this.id ? 'Editar categoría' : 'Nueva categoría'
    },

    ...mapState('categoriesStore', ['categorySelected'])
  },

  methods: {
    clear (all) {
      if (all || !this.id) {
        this.detail = this.iconColor = this.icon = this.backgroundColor = this.id = ''
        this.setCategorySelected(null)
      }
      this.validate = false
    },

    async save () {
      this.validate = true

      if (this.validData) {
        utils.startLoading()
        const response = await uc.saveCategory(this.detail, this.icon, this.iconColor, this.backgroundColor, this.id)
        await this.setCategories(await uc.getCategories())
        this.clear()
        utils.stopLoading()

        await new Notification().notify(response)
        this.$router.push('/categories')
      }
    },

    loadData () {
      if (this.categorySelected !== null) {
        this.detail = this.categorySelected.getDetail()
        this.icon = this.categorySelected?.getIcon()
        this.iconColor = this.categorySelected.getIconColor()
        this.backgroundColor = this.categorySelected.getBackgroundColor()
        this.id = this.categorySelected.getId()
      }
    },

    ...mapMutations('categoriesStore', ['setCategories', 'setCategorySelected'])
  },

  created () {
    this.loadData()
  },

  beforeDestroy () {
    this.clear(true)
  }
}
</script>
