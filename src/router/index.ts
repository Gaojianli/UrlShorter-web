import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Shorter',
    meta: { title: 'Short a URL - URL Shorter' },
    component: () => import('../views/Main.vue'),
  },
  {
    path: '/revoke',
    name: 'Revoke',
    meta: { title: 'Revoke a URL - URL Shorter' },
    component: () => import('../views/Delete.vue'),
  },
  {
    path: '/api',
    name: 'API',
    meta: { title: 'API - URL Shorter' },
    component: () => import('../views/API.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: 'About - URL Shorter' },
    component: () => import('../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
