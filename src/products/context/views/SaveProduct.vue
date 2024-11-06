<template>
  <div>
    <title-general :title="title" backRoute="/products" />
    <div class="l-content">
      <div class="l-list">
        <input-general v-model="name" label="Nombre" :validate="validate" />
        <icon-modal v-model="icon" />
        <icon-detail :icon="icon" :iconColor="iconColor" :validate="validate" />
        <color-modal v-if="icon" v-model="iconColor" idModal="color-modal" />

        <div>
          <button @click="save()" class="btn button-color-general btn-block">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsUc from '@/products/usecases/productsUc'
import Notification from '@/shared/notification'
import { mapMutations, mapState } from 'vuex'
import TitleGeneral from '@/shared/components/TitleGeneral.vue'
import { utils } from '@/shared/utils'
import InputGeneral from '@/shared/components/InputGeneral.vue'
import IconModal from '@/shared/components/IconModal.vue'
import ColorModal from '@/shared/components/ColorModal.vue'
import IconDetail from '@/shared/components/IconDetail.vue'

const uc = new ProductsUc()

export default {
  name: 'SaveProduct',

  components: {
    TitleGeneral,
    InputGeneral,
    IconModal,
    ColorModal,
    IconDetail
  },

  data () {
    return {
      name: '',
      icon: '',
      iconColor: '',
      validate: false,
      id: '',
      expenses: [],
      totalExpense: 0,
      totalIncome: 0
    }
  },

  watch: {
    icon () {
      if (!this.iconColor) this.iconColor = '#000000'
    }
  },

  computed: {
    validData () {
      return this.icon.trim() !== '' && this.name.trim() !== ''
    },

    title () {
      return this.id ? 'Editar cuenta' : 'Nueva cuenta'
    },

    ...mapState('productsStore', ['productSelected'])
  },

  methods: {
    clear (all) {
      if (all || !this.id) {
        this.name = this.iconColor = this.icon = this.id = ''
        this.expenses = []
        this.setProductSelected(null)
      }
      this.validate = false
    },

    async save () {
      this.validate = true
      if (this.validData) {
        utils.startLoading()
        const response = await uc.saveProduct(this.name, this.icon, this.iconColor, this.id, this.expenses, this.totalExpense, this.totalIncome)
        await this.setProducts(await uc.getProducts())
        this.clear()

        utils.stopLoading()
        await new Notification().notify(response)
        this.clear(true)
        this.$router.push('/products')
      }
    },

    loadData () {
      if (this.productSelected !== null) {
        this.name = this.productSelected.getName()
        this.icon = this.productSelected?.getIcon()
        this.iconColor = this.productSelected.getColor()
        this.id = this.productSelected.getId()
        this.expenses = this.productSelected.getExpenses()
        this.totalExpense = this.productSelected.getTotalExpense()
        this.totalIncome = this.productSelected.getTotalIncome()
      }
    },

    ...mapMutations('productsStore', ['setProducts', 'setProductSelected'])
  },

  created () {
    this.loadData()
  },

  beforeDestroy () {
    this.clear(true)
  }
}
</script>
