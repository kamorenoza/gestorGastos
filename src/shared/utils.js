import moment from 'moment'
import { daysWeekToString, monthsToString } from './constants'

function startLoading () {
  document.body.classList.add('loading')
}

function stopLoading () {
  document.body.classList.remove('loading')
}

function onlyNumber (value) {
  const number = value ? value.toString().replace(/[^\d]/g, '') : ''

  return number ? new Intl.NumberFormat('de-DE').format(parseInt(number)) : ''
}

function sumMonths (dateStr, months) {
  if (!months) months = 0

  moment.locale('es-US')
  const date = moment(dateStr)
  const newDate = moment(date).add(parseInt(months), 'M')

  return newDate.format('YYYY-MM-DD')
}

function subtractMonths (dateStr, months) {
  if (!months) months = 0

  moment.locale('es-US')
  const date = moment(dateStr)
  const newDate = moment(date).subtract(parseInt(months), 'M')

  return newDate.format('YYYY-MM-DD')
}

function formatDate (dateStr) {
  moment.locale('es-US')

  const date = moment(dateStr)

  return date.format('DD MMMM YYYY')
}

function getCurrentDate () {
  const date = new Date()
  const day = date.toLocaleDateString('es-US', { day: '2-digit' })
  const month = date.toLocaleDateString('es-US', { month: '2-digit' })
  const year = date.toLocaleDateString('es-US', { year: 'numeric' })

  return year + '-' + month + '-' + day
}

function getLastDay (date) {
  return date ? moment(date).endOf('month').format('YYYY-MM-DD').toString() : moment().endOf('month').format('YYYY-MM-DD').toString()
}

function getFirstDay (date) {
  return date ? moment(date).startOf('month').format('YYYY-MM-DD').toString() : moment().startOf('month').format('YYYY-MM-DD').toString()
}

function formatDateDayWeek (dateStr) {
  moment.locale('es-US')

  const date = moment(dateStr)
  const dayNumber = date.date()

  const day = daysWeekToString(date.day())

  return `${day} ${dayNumber}`
}

function formatNumber (number) {
  return new Intl.NumberFormat('de-DE').format(parseInt(number))
}

function getFixedExpenseDate (dateStr, currentMonth) {
  moment.locale('es-US')

  const date = moment(dateStr)
  const month = moment(currentMonth).format('M')
  const year = moment(currentMonth).format('yyyy')

  date.set({ month: month - 1, year })

  return date.format('YYYY-MM-DD')
}

function formatAllDate (dateStr) {
  moment.locale('es-US')

  const date = moment(dateStr)
  const dayNumber = date.date()
  const month = monthsToString(date.month() + 1)
  const year = date.year()

  return `${dayNumber} ${month} ${year}`
}

function formatDateMonthYear (dateStr) {
  moment.locale('es-US')

  const date = moment(dateStr)
  const month = monthsToString(date.month() + 1)
  const year = date.year()

  return `${month} ${year}`
}

export const utils = {
  startLoading,
  stopLoading,
  onlyNumber,
  sumMonths,
  subtractMonths,
  formatDate,
  getCurrentDate,
  getLastDay,
  getFirstDay,
  formatDateDayWeek,
  formatDateMonthYear,
  formatNumber,
  getFixedExpenseDate,
  formatAllDate
}
