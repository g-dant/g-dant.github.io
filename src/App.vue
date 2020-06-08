<template lang="html">
  <div>
    <nav class="navbar navbar-expand-sm bg-black navbar-dark fixed-top">
      <a class="navbar-brand" href="#">G. Dant</a>
      <ul class="navbar-nav">
        <li class="nav-item" 
          :class="{active: this.$route.name == 'index'}" 
          @click="activeSection = 1;">
          <a class="nav-link" href="/">Início</a>
        </li>
        <li class="nav-item" 
          :class="{active: this.$route.name == 'projects'}" 
          @click="activeSection = 2;">
          <a class="nav-link" href="/projects">Projetos</a>
        </li>
        <li class="nav-item" 
          :class="{active: this.$route.name == 'posts'}" 
          @click="activeSection = 3;">
          <a class="nav-link" href="/posts">Blog</a>
        </li>
        <li class="nav-item" 
          :class="{active: this.$route.name == 'about'}" 
          @click="activeSection = 4;">
          <a class="nav-link" href="/about">Sobre Mim</a>
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