import Vue from 'vue'

export default class Notification {
  notify (message) {
    return Vue.swal(message)
  }

  confirm (message, title = 'Confirmación!') {
    return Vue.swal({
      title: title,
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      reverseButtons: true
    })
  }

  selectOption (option1, option2, title = 'Seleccione una opción', color1 = '#d51212', color2 = '#4caf50') {
    return Vue.swal({
      title: title,
      type: '',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: color1,
      confirmButtonText: option1,
      denyButtonText: option2,
      denyButtonColor: color2,
      cancelButtonText: 'Cancelar'
    })
  }
}
