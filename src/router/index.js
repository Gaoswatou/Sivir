import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import reportRoutes from './report'
Vue.use(VueRouter)

const constantRoutes = [
  {
    path: '/',
    redirect: () => {
      return { path: '/entrance', query: { index: 1 } }
    },
  },
  {
    path: '/entrance',
    name: 'Entrance',
    meta: {
      title: '',
    },
    component: (resolve) =>
      require.ensure(
        [],
        () => resolve(require('@/views/entrance/index')),
        'constant'
      ),
  },
  {
    path: '/auth',
    name: 'Oauth',
    meta: {
      title: '',
    },
    component: (resolve) =>
      require.ensure(
        [],
        () => resolve(require('@/views/Oauth/Oauth')),
        'constant'
      ),
  },

  {
    path: '/timeout',
    name: 'timeout',
    meta: {
      title: '',
    },
    component: (resolve) =>
      require.ensure(
        [],
        () => resolve(require('@/views/ErrPage/timeout')),
        'constant'
      ),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '',
    },
    component: (resolve) =>
      require.ensure(
        [],
        () => resolve(require('@/views/ErrPage/404')),
        'constant'
      ),
  },
]

let routes = [
  ...constantRoutes,
  ...reportRoutes,
  { path: '*', redirect: '/404' },
]
console.log('routes: ', routes)

const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next) => {
  store.dispatch('setNavTitle', to.meta.title)
  if (to.query.index == '1') {
    store.dispatch('setHiddenBackFlag', true)
  } else {
    store.dispatch('setHiddenBackFlag', false)
  }
  next()

  //根据字段判断是否路由过滤
  // if (to.matched.some(record => record.meta.auth)) {
  //   if (getToken() !== null) {
  //     next();
  //   } else {
  //     //防止无限循环
  //     if (to.name === "login") {
  //       next();
  //       return;
  //     }
  //     next({
  //       path: "/login"
  //     });
  //   }
  // } else {
  //   next(); //若点击的是不需要验证的页面,则进行正常的路由跳转
  // }
})

export default router
