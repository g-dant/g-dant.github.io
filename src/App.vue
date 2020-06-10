<template lang="html">
  <div>
    <nav class="navbar navbar-expand-sm bg-black navbar-dark fixed-top">
      <a class="navbar-brand" href="">G. Dant</a>
      <ul class="navbar-nav">
        <li class="nav-item" :class="{active: this.$route.name == 'index'}" 
          @click="activeSection = 1;">
          <a class="nav-link" href="/">Início</a>
        </li>
        <li class="nav-item" :class="{active: (this.$route.name == 'posts') || 
                                              (this.$route.name == 'post')}" 
          @click="activeSection = 4;">
          <a class="nav-link" href="/posts">Blog</a>
        </li>
        <li class="nav-item" :class="{active: true}" v-if="this.$route.name == 'index'"
          @click="activeSection = 5;">
          <a class="nav-link" @click="scrollTo('begin');">| 1. Apresentação</a>
        </li>
        <li class="nav-item" :class="{active: true}" v-if="this.$route.name == 'index'"  
          @click="activeSection = 2;">
          <a class="nav-link" @click="scrollTo('projects');"> 2. Projetos</a>
        </li>
        <li class="nav-item" :class="{active: true}" v-if="this.$route.name == 'index'" 
          @click="activeSection = 3;">
          <a class="nav-link" @click="scrollTo('about');">3. Sobre Mim</a>
        </li>
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

      if (this.$route.name != 'index') {
        this.$router.push({name: 'index'});
      } else {
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