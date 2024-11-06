<template>
  <div class="card">
    <div class="card-header cursor-pointer">
      <div @click="goToDetails()" class="d-flex align-items-center">
        <b-icon :icon="account.getIcon()" :style="{ color: account.getColor() }" />
        <p class="ml-3">{{ account.getName() }}</p>
      </div>
      <div>
        <div>
          <b-dropdown size="sm"  variant="link" dropleft toggle-class="text-decoration-none p-0 text-dark"  no-caret>
            <template #button-content>
              <b-icon icon="three-dots-vertical" />
            </template>
            <b-dropdown-item @click="goToEditAccount()">Editar</b-dropdown-item>
            <b-dropdown-item @click="deleteAccount()">Eliminar</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>

    <div @click="goToDetails()" class="card-body">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <p>Saldo actual</p>
        <p class="text-success text-book">$ {{ account.getTotalValue() | formatNumber }}</p>
      </div>

      <div class="d-flex align-items-center justify-content-between">
        <p>Balance</p>
        <p class="text-book">$ {{ account.getBalance() | formatNumber  }}</p>
      </div>
    </div>
    <div class="card-footer justify-content-end text-general">
      <p class="cursor-pointer" @click="openModal()">AGREGAR GASTO</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import AccountUc from '@/accounts/usecases/accountUc'
import Notification from '@/shared/notification'
import { utils } from '@/shared/utils'

export default {
  name: 'AccountRow',

  props: {
    account: {
      type: Object,
      uc: new AccountUc()
    }
  },

  computed: {
    ...mapState('expensesStore', ['currentPeriod'])
  },

  methods: {
    goToEditAccount () {
      // this.setAccountSelected(this.account)
      this.$router.push('/save-account')
    },

    async deleteAccount () {
      const text = 'Se borrará toda la información y movimientos y no se podrán recuperar, Está seguro de eliminar este presupuesto?'
      const confirmation = await new Notification().confirm(text)

      if (confirmation.isConfirmed) {
        utils.startLoading()
        const response = await this.uc.deleteAccount(this.account.getId())
        this.setAccounts(await this.uc.getAccounts())
        utils.stopLoading()
        new Notification().notify(response)
      }
    },

    openModal () {
      // this.setAccountSelected(this.account)
      this.$bvModal.show('add-expense-modal')
    },

    goToDetails () {
      // this.setAccountSelected(this.account)
      this.$router.push('/details-account')
    },

    ...mapMutations('accountsStore', ['setAccountSelected', 'setAccounts'])
  },

  created () {
    this.account.getTotal(this.currentPeriod)
  }
}
</script>
