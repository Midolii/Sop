import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
// import company from '../views/company.vue'
// import review from '../views/review.vue'
// import admin from '../views/admin.vue'
import Approval from '../views/Approval.vue'
import Dashboard from '../views/Dashboard.vue'
import Apply from '../views/Apply.vue'

Vue.use(VueRouter)

const routes = [
  {
	  path:'/',
	  name:'index',
    component: index,
  },
  {
    path:'/Approval',
    name:'Approval',
    component: Approval
  },
  {
    path:'/Dashboard',
    name:'Dashboard',
    component: Dashboard
  },
  {
    path:'/Apply',
    name:'Apply',
    component: Apply
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
