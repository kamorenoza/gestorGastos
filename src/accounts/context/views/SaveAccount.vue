<template>
  <div class="l-content">
    <title-general :title="title" backRoute="/accounts" />

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
</template>

<script>
import AccountUc from '@/accounts/usecases/accountUc'
import Notification from '@/shared/notification'
import { mapMutations, mapState } from 'vuex'
import TitleGeneral from '@/shared/components/TitleGeneral.vue'
import { utils } from '@/shared/utils'
import InputGeneral from '@/shared/components/InputGeneral.vue'
import IconModal from '@/shared/components/IconModal.vue'
import ColorModal from '@/shared/components/ColorModal.vue'
import IconDetail from '@/shared/components/IconDetail.vue'

export default {
  name: 'SaveAccount',

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
      uc: new AccountUc()
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
      return this.id ? 'Editar presupuesto' : 'Nuevo presupuesto'
    },

    ...mapState('accountsStore', ['accountSelected']),
    ...mapState('expensesStore', ['currentPeriod'])
  },

  methods: {
    clear (all) {
      if (all || !this.id) {
        this.name = this.iconColor = this.icon = this.id = ''
        this.expenses = []
      }
      this.validate = false
    },

    async save () {
      this.validate = true
      if (this.validData) {
        utils.startLoading()
        const response = await this.uc.saveAccount(this.name, this.icon, this.iconColor, this.id, this.expenses)
        await this.setAccounts(await this.uc.getAccounts())
        this.clear()

        utils.stopLoading()
        await new Notification().notify(response)
        this.$router.push('/')
      }
    },

    loadData () {
      if (this.accountSelected !== null) {
        this.name = this.accountSelected.getName()
        this.icon = this.accountSelected?.getIcon()
        this.iconColor = this.accountSelected.getColor()
        this.id = this.accountSelected.getId()
        this.expenses = this.accountSelected.getExpenses(this.currentPeriod)
      }
    },

    ...mapMutations('accountsStore', ['setAccounts'])
  },

  created () {
    this.loadData()
  },

  beforeDestroy () {
    this.clear(true)
  }
}
</script>
