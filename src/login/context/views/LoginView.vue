<template>
  <div class="l-login">
    <div class="o-login text-center">
      <div class="o-login__image m-auto mt-4"></div>
      <p class="fs-4 fw-bold">Gestor de Gastos</p>
      <p class="o-login__subtitle">Iniciar sesión</p>
      <button class="btn o-login__btn mt-5" @click="loginGoogle()">Inicia con Google</button>
    </div>
  </div>
</template>

<script>
import LoginRepository from '@/login/models/LoginRepository'

export default {
  name: 'LoginView',

  methods: {
    loginGoogle () {
      return new LoginRepository().login()
    }
  }
}

</script>
