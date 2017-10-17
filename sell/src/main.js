// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Seller from './components/seller/seller'
import Goods from './components/goods/goods'
import Ratings from './components/ratings/ratings'

import './comnon/css/index.scss'



Vue.use(VueRouter)
Vue.config.productionTip = false

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
const routes = [
  {path: '/', redirect: 'goods'},  // 设置默认路由
  { path: '/seller', component: Seller },
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings }
]


// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active' // 将 router-link-active 用active来代替
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')

