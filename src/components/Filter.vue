<template>
    <input v-model="searchTerm" placeholder="filter" />
    <button @click="resetFilter">
      <span v-if="this.searchTerm.length"><i class="fas fa-times"></i></span>
      <span v-else><i class="fas fa-search"></i></span>
    </button>
</template>

<script>
export default {
    name: 'Filter',
    emits: ['searchText'],
    data() {
        return {
            searchTerm: ""
        }
    },
    watch: {
        searchTerm: function() {
            this.$emit('searchText', this.searchTerm);
        }
    },
    methods: {
        resetFilter() {
            this.searchTerm = "";
        }
    }
}
</script>
<style scoped>

</style>