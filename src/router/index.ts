import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [

  {
    path: '/',
    name: 'Shorter',
    meta: {
      title: 'Short a URL -URL Shorter',
    },
    component: () => import('../views/Main.vue'),
  },
  {
    path: '/revoke',
    name: 'Revoke',
    meta: {
      title: 'Revoke a URL -URL Shorter',
    },
    component: () => import('../views/Delete.vue'),
  },
  {
    path: '/api',
    name: 'API',
    meta: {
      title: 'API -URL Shorter',
    },
    component: () => import('../views/API.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'About -URL Shorter',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, _from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
export default router;
