<template>
    <div>
        <div class="main-content fluid-container">
            <div class = "section-title row"><h4>Todos os Posts</h4></div>
            <div class = "row">
                <div v-for="(bh, k) in blogHeaders" :key="k" class="col-md-12 col-lg-6">
                    <blog-posts :post="bh"></blog-posts>
                </div>
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
    blogHeaders: BlogHeaders
  })
}
</script>

<style scoped>
  .main-content {
    max-width: 800px;

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
    padding-top: 15px;
  }

</style>