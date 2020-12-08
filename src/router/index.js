import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: () => {
      return { path: '/test', query: { index: 1 } }
    },
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
        'oauth'
      ),
  },
  {
    path: '/test',
    name: 'Test',
    meta: {
      title: '',
    },
    component: (resolve) =>
      require.ensure(
        [],
        () => resolve(require('@/views/TestPage/index')),
        'test'
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
        'errPage'
      ),
  },
]

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
