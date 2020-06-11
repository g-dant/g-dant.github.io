<template>
  <div>
    <template v-if="id != 'all'">
      <div class="blog-container main-content fluid-container">
        <component :is="id"></component>
      </div>
    </template>
    <template v-if="id == 'all'">
        <all-blog-posts></all-blog-posts>
    </template>
  </div>
</template>

<script>
  import PostGgplot from '../posts/ggplotpost.md'
  import PostAwsdashboard from '../posts/awsdashboard.md'
  import AllBlogPosts from './AllBlogPosts'

  export default {
    props: ['id'],
    components: {
        ggplotpost: PostGgplot,
        awsdashboard: PostAwsdashboard,
        allBlogPosts: AllBlogPosts
    },
  }
</script>

<style>
    .blog-container {
        max-width: 650px;
    }

    .blog-container table, .blog-container tr, 
    .blog-container th, .blog-container td {
        border: 1px solid black;
    }

    .blog-container table {
        margin: 15px;
    }

    .blog-container th, .blog-container td {
        padding: 5px;
    }

    .blog-container p {
        text-align: justify;
    }

    .blog-container h1, .blog-container h2, 
    .blog-container h3, .blog-container h4, 
    .blog-container h5, .blog-container h6 {
        text-align: left;
    }

    .blog-container h1 {
        font-size: 30px;
    }

    .blog-container h2 {
        font-size: 20px;
    }

    .blog-container img {
        max-width: 80%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .blog-container .small {
        max-width: 40%;
    }
</style>
