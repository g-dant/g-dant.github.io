import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource";
import VueRouter from 'vue-router'
import MainPage from './components/MainPage.vue'
import BlogPostViewer from './components/BlogPostViewer.vue'
import AllBlogPosts from './components/AllBlogPosts.vue'
import VueSimpleMarkdown from 'vue-simple-markdown'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vue-simple-markdown/dist/vue-simple-markdown.css'
 
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSimpleMarkdown);

const routes = [
  { path: '', component: MainPage, name: 'index' },
  { path: '/posts/', component: AllBlogPosts, name: 'posts' },
  { path: '/post/:id', component: BlogPostViewer, name: 'posts', props: true}
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


