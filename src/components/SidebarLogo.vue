<template>
    <img :src="logosrc">
</template>

<script>
export default {
    props: ['logosrc']
}
</script>

<style scoped>
img {
  width: 60%;
  margin: 2px 20% 2px 20%;
  border: 1px solid black;
  border-radius: 5px;
  filter: grayscale(15%);
  transition: filter 0.2s;
}
/* img:hover {
  filter: grayscale(90%);
  cursor: pointer;
} */

@media screen and (max-width: 768px) {
  img {
      display: none;
  }
}
</style>