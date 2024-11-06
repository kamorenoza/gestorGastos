<template>
  <div class="card card--graph">
    <p class="text-medium text-book mb-2">Movimientos por categorías</p>

    <b-tabs content-class="mt-3">
      <b-tab title="Gastos" active @click="setType('credit')"></b-tab>
      <b-tab title="Ingresos" @click="setType('debit')"></b-tab>
    </b-tabs>
    <div>
      <Pie
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
      <div class="mt-2">
        <label-chart
          v-for="(item, index) in categoriesArr"
          :key="index"
          :color="item.backgroundColor"
          :label="item.label"
          :value="item.total"
          :total="totalArr"
          show-percentage
        />
      </div>
    </div>

  </div>
</template>

<script>
import { Pie } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { mapState } from 'vuex'
import { utils } from '@/shared/utils'
import AccountUc from '@/accounts/usecases/accountUc'
import LabelChart from './LabelChart.vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels)

export default {
  name: 'PieChart',

  components: {
    Pie,
    LabelChart
  },

  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 150
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      chartData: {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || ''
                label = label.split(',')
                const value = parseInt(label[1])

                let sum = 0
                context.dataset.data.forEach(data => { sum += data })
                const percentage = (value * 100 / sum).toFixed(0) + '%'

                return `${label[0]} ${percentage}`
              }
            }
          },

          datalabels: {
            color: '#FFF',
            formatter: (value, ctx) => {
              let sum = 0
              ctx.dataset.data.forEach(data => { sum += data })

              return (value * 100 / sum).toFixed(0) + '%'
            },
            font: { size: 10 }
          }
        }
      },
      categoriesArr: [],
      type: 'credit'
    }
  },

  watch: {
    currentPeriod () {
      this.setGraph()
    }
  },

  computed: {
    expenses () {
      return this.accounts[0].getExpenses(this.currentPeriod)
    },

    totalArr () {
      let sum = 0
      this.categoriesArr.forEach(data => { sum += parseInt(data.total) })

      return sum
    },

    ...mapState('accountsStore', ['accounts']),
    ...mapState('expensesStore', ['currentPeriod'])
  },

  methods: {
    async setGraph () {
      const accounts = await new AccountUc().getAccounts()
      const expenses = accounts[0].getExpenses(this.currentPeriod)
      const firstDatePeriod = utils.getFirstDay(this.currentPeriod)
      const lastDatePeriod = utils.getLastDay(this.currentPeriod)
      const categories = []

      expenses.forEach(expense => {
        if (expense.type === this.type) {
          const category = expense.category

          if (!categories[category.detail]) {
            categories[category.detail] = { total: 0, backgroundColor: category.backgroundColor, label: category.detail }
          }

          const totalExpense = accounts[0].totalExpense(expense, firstDatePeriod, lastDatePeriod)
          categories[category.detail].total = parseInt(categories[category.detail].total) + parseInt(totalExpense.totalAll)
        }
      })
      this.categoriesArr = Object.values(categories)
      this.setChartData(categories)
    },

    setChartData (categories) {
      const backgroundColor = []
      const data = []
      const categoriesIt = Object.values(categories)
      const labels = Object.keys(categories)

      categoriesIt.forEach((category, index) => {
        backgroundColor.push(category.backgroundColor)
        data.push(category.total)
        labels[index] = `${labels[index]},${category.total}`
      })

      this.chartData = {
        labels,
        datasets: [{ backgroundColor, data }]
      }
    },

    setType (type) {
      this.type = type
      this.setGraph()
    }
  },

  async created () {
    this.setGraph()
  }
}
</script>
