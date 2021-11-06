<template>
    <div @click="selectItem(item.imdbID)" :class="{ active: item.imdbID === currentItemID }">
        <h1>{{ item.Title}}</h1>
        <p>{{ item.Year }}</p>
    </div>
</template>

<script>
export default {
  name: 'MovieItem',
  props: ['item', 'currentItemID'],
  methods: {
      selectItem(id) {
          this.$emit('itemSelected', id);
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active {
    outline: 2px solid red;
}
</style>