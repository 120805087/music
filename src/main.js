import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'

import fastclick from 'fastclick'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
    loading: require('common/image/default.png')
    //require  webpack  可以解析
})

import 'common/stylus/index.styl'

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
