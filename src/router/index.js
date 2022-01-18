import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('views/home/Home')
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: () => import('views/blog/Blog')
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0
  next()
})
export default router
