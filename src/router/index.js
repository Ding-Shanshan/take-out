import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/Login'

const routes = [
  //首页路由
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/Home')
  },
  //登陆页面路由
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/Login'),
    //只有访问login页面之前才会执行下面的函数
    beforeEnter(to,from,next){
      const isLogin=localStorage.isLogin;
      if(isLogin)
      {
         next({name:'Home'})
      }else{
        next();
      }
    }
  },
  //注册页面路由
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/register/Register'),
    //只有访问login页面之前才会执行下面的函数
    beforeEnter(to,from,next){
      const isLogin=localStorage.isLogin;
      if(isLogin)
      {
         next({name:'Login'})
      }else{
        next();
      }
    }
  },
  //商家详情页面路由
  {
    path:'/shop/:id',
    name:'Shop',
    component: () => import(/* webpackChunkName: "Shop" */ '../views/shop/Shop')
  },
  //购物车页面路由
  {
    path:'/CartList',
    name:'CartList',
    component: () => import(/* webpackChunkName: "CartList" */ '../views/CartList/CartList')
  },
  //提交订单页面路由
  {
    path:'/orderConfirmation/:id',
    name:'OrderConfirmation',
    component: () => import(/* webpackChunkName: "OrderConfirmation" */ '../views/OrderConfirmation/OrderConfirmation')
  },
  //订单列表页面路由
  {
    path:'/orderList',
    name:'OrderList',
    component: () => import(/* webpackChunkName: "OrderList" */ '../views/orderList/OrderList')
  },
  //我的 页面路由
  {
    path:'/myself',
    name:'Myself',
    component: () => import(/* webpackChunkName: "Myself" */ '../views/myself/Myself')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 每次做路由跳转之前需要执行的内容,使用beforEach方法
router.beforeEach((to,from,next)=>{
  // next可以理解为中间件继续执行的方法
  // to当路由要跳转的时候，要跳转的页面信息
  // from是从哪里跳过来的页面信息
  const {isLogin}=localStorage;
  const {name}=to;
  const isLoginOrRegister=(name==='Login'||name==='Register')
  if(isLogin || isLoginOrRegister)
  {
    next();
  }else{
    //如果没有登录则访问login页面
    next({name:'Login'})
  }
  next();
})

//

export default router
