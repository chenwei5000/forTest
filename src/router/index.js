import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import ProList from '../components/proList/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    redirect: '/prolist',
    component: Home,
    children: [
      {
        path: '/prolist',
        component: ProList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
