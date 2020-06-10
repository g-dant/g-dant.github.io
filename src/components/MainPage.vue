<template>
  <div>
    <div class="main-content fluid-container">
      <div class = "anchor section-title">
        <h4 id="begin">
          <i class="fa fa-home"></i>
          G. Dant - Página Pessoal
        </h4>
      </div>
      <div class="row">
        <div class="full-col">
          <p>
            Olá a todos! Sejam bem-vindos à minha página pessoal! Nela pretendo compartilhar
            meus estudos e projetos pessoais nas áreas de informática, data science e ciência em geral!
            Acredito muito na força transformadora da tecnologia e quero compartilhar com todo mundo
            que quiser participar. <b>Minhas áreas de interesse são:</b>
          </p>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="topic-block col-md-12 col-lg-4">
          <img src="https://image.flaticon.com/icons/svg/2867/2867308.svg" alt="" class="icon-img" >
          Ciência de Dados
        </div>
        <div class="topic-block col-md-12 col-lg-4">
          <img src="https://image.flaticon.com/icons/svg/2452/2452659.svg" alt="" class="icon-img">
            Programação
          </div>
          <div class="topic-block col-md-12 col-lg-4">
            <img src="https://image.flaticon.com/icons/svg/2972/2972222.svg" alt="" class="icon-img">
            Matemática / Estatística
          </div>
        </div>
    </div>
    <div class="main-content fluid-container">
      <div class = "anchor section-title row" id="main-posts">
        <h4 id="main_posts">
          <i class="fa fa-star"></i>
          Posts Principais
        </h4>
      </div>
      <div class = "row">
        <div v-for="(bh, k) in blogHeaders.slice(0, 2)" :key="k" class="blogpost-col">
          <blog-posts :post="bh"></blog-posts>
        </div>
      </div>
    </div>
    <div class="main-content fluid-container">
      <div class = "anchor section-title row">
        <h4 id="projects">
          <i class="fa fa-github" aria-hidden="true"></i> 
          Projetos (Github)
        </h4>
      </div>
      <div class="row">
        <table class="table">
          <tr>
            <th>Projeto</th>
            <th>Descrição</th>
          </tr>
          <tr v-for="(repo, k) in githubRepos" :key="k">
            <td><a :href="repo.html_url">{{ repo.name }}</a></td>
            <td>{{ repo.description }}</td>
          </tr>
        </table>
      </div>    
    </div>
    <div class="main-content fluid-container">
      <div class = "anchor section-title row">
        <h4 id="about">
          <i class="fa fa-address-card" aria-hidden="true"></i> 
          Sobre Mim
        </h4>
      </div>
      <div class="row">
        <p>
          Tenho experiência como consultor na área de T.I e atualmente desenvolvo sistemas.
          Sou formado em:
        </p>
        <table class="table table-bordered">
          <tr>
            <th>Engenharia Eletrônica e de Computação</th>
            <th>Matemática Aplicada (Ênfase em Computação Científica)</th>
            <th>Engenharia Generalista</th>
          </tr>
          <tr>
            <td>Universidade Federal do Rio de Janeiro (UFRJ)</td>
            <td>Universidade Federal do Rio de Janeiro (UFRJ)</td>
            <td>École Centrale de Lyon</td>
          </tr>
        </table>
        <p>
          Sou entusiasta em tecnologia e tenho o objetivo de usar este espaço como local onde
          anoto meus estudos e compartilho meu aprendizado
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPostsIndex from './BlogPostsIndex.vue';
import BlogHeaders from '../assets/BlogHeaders.json'

export default {
  components: {
    blogPosts: BlogPostsIndex
  },
  data: () => ({
    blogHeaders: BlogHeaders,
    githubRepos: []
  }),
  mounted: function() {
    this.$http.get('https://api.github.com/users/g-dant/repos').then(
        response => { return response.json(); },
        error => { return []; }).then(
        response => { this.githubRepos = response; }
      );
  }
}
</script>

<style scoped>
  * {
    z-index: 0;
  }

  .main-content {
    max-width: 800px;
  }

  .icon-img {
    max-width: 50px;
    float: left;
    margin-right: 15px;
  }

  .full-col > p {
    padding-left: 25px;
    padding-right: 25px;
    text-align: justify;
  }
  
  .topic-block {
    padding: 8px;
    text-align: center;
  }

  h1, h2, h3, h4, h5, h6 {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-bottom: 15px;
    text-transform: uppercase;
  }

  .section-title {
    border: 1px solid black;
    border-radius: 7px;
    padding-top: 15px;
    margin-bottom: 15px;
  }

  .blogpost-col {
    width: 50%;
  }
  @media screen and (max-width: 1150px) {
    .blogpost-col {
      width: 100%;
    }
  }

</style>