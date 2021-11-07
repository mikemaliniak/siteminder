<template>
    <li class="movie-item" @click="selectItem(item.imdbID)" :class="{ active: item.imdbID === currentItemID }">
        <img v-bind:src="item.Poster" v-bind:alt="item.Title" class="movie-item-poster"/>
        <div class="movie-item-details">
            <span class="movie-item-title">{{ item.Title}}</span>
            <span class="movie-item-year">{{ item.Year }}</span>
        </div>
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
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    list-style-type: none;
    max-height: 80px;
    width: 100%;
    display: flex;
    padding: 10px;
    overflow: hidden;
    cursor: pointer;
}

.movie-item-details {
    width: 100%;
    overflow: hidden;
}

.movie-item-poster {
    width: 40px;
    margin-right: 10px;
}
.movie-item-title {
    display: block;
    font-size: 1.25em;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}
.active {
    border: 2px solid #091bd5;
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 53%, rgba(222,240,247,1) 100%);
}
</style>