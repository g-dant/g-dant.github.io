<template lang="html">
  <div>
    <nav class="navbar navbar-expand-sm bg-black navbar-dark fixed-top">
      <a class="navbar-brand" href="">G. Dant</a>
      <ul class="navbar-nav">
        <li class="nav-item" :class="{active: this.$route.name == 'index'}">
          <a class="nav-link" href="/">Início</a>
        </li>
        <li class="nav-item" :class="{active: (this.$route.name == 'posts') || 
                                              (this.$route.name == 'post')}">
          <a class="nav-link" href="/posts">Blog</a>
        </li>
        <template v-if="this.$route.name == 'index'">
          <li class="nav-item" :class="{ active: true }">
            <a class="nav-link sublink" @click="scrollTo('begin');">| 1. Apresentação</a>
          </li>
          <li class="nav-item" :class="{ active: true }">
            <a class="nav-link sublink" @click="scrollTo('projects');">2. Projetos</a>
          </li>
          <li class="nav-item" :class="{ active: true }">
            <a class="nav-link sublink" @click="scrollTo('about');">3. Sobre Mim</a>
          </li>
        </template>
      </ul>
    </nav>
    <div class="shift-left">
      <sidebar></sidebar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default { 
  data: function() {
    return { activeSection: 1 }
  },
  methods: {
    scrollTo(elId) {

      const element = document.getElementById(elId);
      const offset = 45;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  },
  components: { 
    sidebar: Sidebar
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
  * {
    font-family: 'Nanum Gothic', sans-serif;
  }

  a {
    cursor: pointer;
  }

  nav {
    background-color: black !important;
    font-size: 15px;
  }

  .sublink {
    font-size: 12px;
  }
  .sublink:hover {
    text-decoration: underline !important;
  }

  .shift-left {
    margin-top: 50px;
  }

  .main-content {
    text-decoration: none;
    text-align: left;
    font-size: 15px;
    margin-left: 450px;
    margin-right: 100px;
    padding-top: 2%;
  }

  @media screen and (max-width: 768px) {
    .main-content {
      margin-left: 5%;
      margin-right: 5%;
      width: 90%;
      padding-top: 40px;
    }
  }
</style>