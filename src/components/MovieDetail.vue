<template>
    <div v-if="item">
        <img v-bind:src="item.Poster" v-bind:alt="item.Title"/>
        <h1>{{ item.Title }}</h1>
        <p>{{ item.Plot }}</p>
    </div>
    <div v-else>
        There is no currently selected item
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

</style>
