import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'accounts',
    component: () => import(/* webpackChunkName: "accounts" */ './accounts/context/views/AccountsView')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './login/context/views/LoginView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: "categories" */ './categories/context/views/CategoriesView')
  },
  {
    path: '/save-category',
    name: 'save-category',
    component: () => import(/* webpackChunkName: "save-category" */ './categories/context/views/CategoriesForm')
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: () => import(/* webpackChunkName: "accounts" */ './accounts/context/views/AccountsView')
  },
  {
    path: '/save-account',
    name: 'save-account',
    component: () => import(/* webpackChunkName: "save-account" */ './accounts/context/views/SaveAccount')
  },
  {
    path: '/add-expense',
    name: 'add-expense',
    component: () => import(/* webpackChunkName: "add-expense" */ './home/context/components/AddExpense')
  },
  {
    path: '/details-account',
    name: 'details-account',
    component: () => import(/* webpackChunkName: "details-accoun" */ './accounts/context/views/DetailsAccount')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "products" */ './products/context/views/ProductsView')
  },
  {
    path: '/save-product',
    name: 'save-product',
    component: () => import(/* webpackChunkName: "save-product" */ './products/context/views/SaveProduct')
  },
  {
    path: '/details-product',
    name: 'details-product',
    component: () => import(/* webpackChunkName: "details-product" */ './products/context/views/DetailsProduct')
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import(/* webpackChunkName: "statistics" */ './statistics/context/views/StatisticsView')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('currentUser')

  if (to.name !== 'login') {
    if (!user) next('/login')
    else next()
  } else {
    if (user) next('/')
    else next()
  }
})

export default router
