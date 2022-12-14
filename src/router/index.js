import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path:'/login',
      name:'login',
      component:() => import('@/views/login')
    },
    {
      path:'/',
      // name:'layout',
      component:() => import('@/views/layout'),
      children:[
        {
          path:'/',
          redirect:'/home'//重定向
        },
        {
          path:'home',
          name:'home',
          component:() => import('@/views/home/index.vue')
        },
        {
          path:'qa',
          name:'qa',
          component:() => import('@/views/qa/index.vue')
        },
        {
          path:'video',
          name:'video',
          component:() => import('@/views/video/index.vue')
        },
        {
          path:'my',
          name:'my',
          component:() => import('@/views/my/index.vue')
        },
      ]
    }

]

const router = new VueRouter({
  routes
})

export default router
