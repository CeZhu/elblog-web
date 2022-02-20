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
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/login',
      component: () => import('components/login/Login')
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
    },
    {
      path: '/admin',
      component: () => import('views/admin/Admin'),
      children: [
        {
          path: '/admin/blog',
          component: () => import('views/admin/blog/BlogAdmin')
        },
        {
          path: '/admin/writeBlog',
          name: 'writeBlog',
          component: () => import('views/admin/blog/WriteBlog')
        },
        {
          path: '/admin/blank',
          component: () => import('views/admin/Blank')
        },
        {
          path: '/admin/blogType',
          component: () => import('views/admin/blogType/BlogTypeAdmin')
        }
      ]
    }

  ]
})

router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem('username')
  if (to.path === '/login') {
    if (username) {
      next('/admin')
    }
    next()
  } else if (to.path.includes('/admin')) {
    if (username) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})
export default router
