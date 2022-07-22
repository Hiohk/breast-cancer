import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/views/Login.vue'
import Register from '@/components/views/Register.vue'
import Home from '@/components/views/Home.vue'
import User from '@/components/views/User.vue'
import Questionnaire from '@/components/QuestionNaire.vue'
import CheckQues from '@/components/CheckQues.vue'
import Admin from '@/components/Admin.vue'
import Datas from '@/components/DataStatistics.vue'
import UserMan from '@/components/UserManagement.vue'
import NotFound from '@/components/views/404.vue'
import Agreement from '@/components/agreement/Agreement.vue'
import pathArr from '@/router/pathArr.js'


Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
        role: "admin"
      },
      redirect: '/home/admin',
      children: [{
        path: 'admin',
        name: 'Admin',
        component: Admin,
      },
      {
        path: 'datas',
        name: 'Datas',
        component: Datas
      },
      {
        path: 'userman',
        name: 'UserMan',
        component: UserMan
      }
      ],
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        requiresAuth: true,
        role: "user"
      },
      redirect: '/user/questionnaire',
      children: [{
        path: 'questionnaire',
        name: 'Questionnaire',
        component: Questionnaire
      },
      {
        path: 'checkques',
        name: 'CheckQues',
        component: CheckQues
      }
      ]
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/404',
      name: 'NotFound',
      meta: {
        title: 'Page not found',
      },
      component: NotFound
    },
    // 所有未定义路由，全部重定向到404页
    {
      path: '*',
      redirect: '/404'
    }
  ]
})



// 全局前置守卫
router.beforeEach(function (to, from, next) {
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})



export default router
