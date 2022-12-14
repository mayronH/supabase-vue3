import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
  },
  {
    path: '/create',
    name: 'Create',
    component: () =>
      import(/* webpackChunkName: "create" */ '../views/CreateView.vue'),
  },
  {
    path: '/:id',
    name: 'Update',
    component: () =>
      import(/* webpackChunkName: "update" */ '../views/UpdateView.vue'),
  },

  // 404 Page
  {
    path: '/:catchAll(.*)*', // regex, catch any route that doesn't exists
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/404View.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
