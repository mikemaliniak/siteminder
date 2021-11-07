<template>
    <div v-if="pages > 1" class="pagination">
        <button @click="paginate('down')"><i class="fas fa-caret-left"></i></button>
        <span>Page: {{currentPage}}/{{pages}}</span>
        <button @click="paginate('up')"><i class="fas fa-caret-right"></i></button>
    </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pages', 'currentPage'],
  emits: ['paginate'],
  methods: {
      paginate(dir) {
        this.$emit('paginate', dir);
      }
  }
}
</script>
<style scoped>
.pagination {
    box-sizing: border-box;
    position: absolute;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px;
}
</style>