<template>
    <div class="post-container">
        <hr>
        <h3 @click="gotoPost(post.id)">{{ post.title }}</h3>
        <hr>
        <h5>{{ post.subtitle }}</h5>
        <hr>
        <img :src=post.img_url>
        <p>{{ post.description }}</p>
        <hr>
        <p><b>Postado em: </b>{{ post.date }}</p>
    </div>
</template>

<script>
export default {
    data: function() {
        return {}
    },
    methods: {
        gotoPost: function(postId) {
            this.$router.push('/post/' + postId);
        }
    },
    props: ['post']
}
</script>

<style scoped>

h3 {
    border: 1px solid black;
    border-radius: 8px;
    padding: 3px;    
    cursor: pointer;
    font-size: 20px;
}
h3:hover {
    background-color: black;
    color: white;
}

h5 {
    font-size: 15px;
}

h3, h5 {
    text-align: center;
}

img {
    max-height: 120px;
    margin: 8px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.post-container {
    padding: 8px;
    margin: 5% 4px 5% 4px;
    border: 1px dashed black;
    height: 90%;
}

table {
    border: 1px solid black;
}
</style>