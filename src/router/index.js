import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决重复点击菜单报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/front',
      component: () => import('views/Front'),
      children: [
        {
          path: '/home',
          component: () => import('views/home/Home')
        },
        {
          path: '/blog/:id',
          name: 'blog',
          component: () => import('views/blog/Blog')
        },
        {
          path: '/about',
          component: () => import('views/about/About')
        }
      ]
    }

  ]
})
router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0
  next()
})
export default router
