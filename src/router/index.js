import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mycar from '@/components/Mycar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Mycar',
      name: 'Mycar',
      component: Mycar
    }
  ]
})
