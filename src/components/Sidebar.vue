<template>
<div class="sidebar">
  <sidebar-main-title>Follow the Nerd</sidebar-main-title>
  <sidebar-logo logosrc="https://storage.googleapis.com/kaggle-avatars/images/2991660-kg.jpeg"></sidebar-logo>
  <p><b>G.Dant: </b>
    Matemática Aplicada - Ênfase em Computação Científica (UFRJ), Engenharia Eletrônica e de Computação (UFRJ),
    Engenharia Generalista (École Centrale de Lyon - França)
  </p>
</div>
</template>

<script>
import SidebarMainTitle from './SidebarMainTitle.vue'
import SidebarLogo from './SidebarLogo.vue'

export default {
  components: {
    sidebarMainTitle: SidebarMainTitle,
    sidebarLogo: SidebarLogo
  }
}
</script>

<style scoped>

/* The side navigation menu */
.sidebar {
  margin: 30px 5px 5px 90px;
  padding: 0;
  width: 300px;
  background-color: #ffffff;
  position: absolute;
  height: 480px;
  overflow: auto;
  border: 1px solid black;
  border-radius: 7px;
}

p {
    font-size: 12px;
    padding: 25px 8% 0px 8%;
    text-align: justify;
}

/* Page content. The value of the margin-left property should match the value of the sidebar's width property */
div.content {
  margin-left: 100px;
  padding: 1px 16px;
  height: 1000px;
}

/* On screens that are less than 768px wide, make the sidebar into a topbar */
@media screen and (max-width: 768px) {
  .sidebar {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 80px;
    height: auto;
    position: relative;
  }
  div.content { margin-left: 0; }
}
</style>