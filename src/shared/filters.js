import { utils } from '@/shared/utils'

function formatDateDayWeek (dateStr) {
  return utils.formatDateDayWeek(dateStr)
}

function formatDateMonthYear (dateStr) {
  return utils.formatDateMonthYear(dateStr)
}

function formatNumber (number) {
  return utils.formatNumber(number)
}

function formatAllDate (number) {
  return utils.formatAllDate(number)
}

export default {
  install (Vue) {
    Vue.filter('formatDateDayWeek', formatDateDayWeek)
    Vue.filter('formatAllDate', formatAllDate)
    Vue.filter('formatNumber', formatNumber)
    Vue.filter('formatDateMonthYear', formatDateMonthYear)
  }
}
