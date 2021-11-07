<template>
    <div v-if="item">
        <img v-bind:src="item.Poster" v-bind:alt="item.Title"/>
        <h1>{{ item.Title }}</h1>
        <p>{{ item.Plot }}</p>
    </div>
    <div v-else class="movie-empty">
        <span>Please select a title from the sidebar</span>
    </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  props: ['item']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-empty {
    display: flex;
    width: 100%;
    align-content: center;
    align-items: center;
}
</style>
