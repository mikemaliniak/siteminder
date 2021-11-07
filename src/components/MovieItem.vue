<template>
    <li class="movie-item" @click="selectItem(item.imdbID)" :class="{ active: item.imdbID === currentItemID }">
        <span class="movie-item-title">{{ item.Title}}</span>
        <span class="movie-item-year">{{ item.Year }}</span>
    </li>
</template>

<script>
export default {
  name: 'MovieItem',
  props: ['item', 'currentItemID'],
  emits: ['itemSelected'],
  methods: {
      selectItem(id) {
          this.$emit('itemSelected', id);
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-item {
    border-bottom: 1px solid #ccc;
    list-style-type: none;
}
.movie-item-title {
    display: block;
}
.active {
    outline: 2px solid red;
}
</style>