import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import NoteAddChange from '../views/NoteAddChange'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/NoteAddChange/:id',
    name: 'NoteAddChange',
    component: NoteAddChange
  }
]

const router = new VueRouter({
  routes
})

export default router
