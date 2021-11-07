<template>
    <div v-bind:class="{ filter: true, error, focus: isFocused}">
        <input v-model="searchTerm" placeholder="Search here" class="filter-input" @focus="setFocus" @blur="removeFocus" />
        <button @click="resetFilter" class="filter-btn">
        <span v-if="this.searchTerm.length"><i class="fas fa-times"></i></span>
        <span v-else><i class="fas fa-search"></i></span>
        </button>
    </div>
</template>
<script>
export default {
    name: 'Filter',
    emits: ['searchText'],
    props: ['error'],
    data() {
        return {
            searchTerm: "",
            isFocused: false
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
        },
        setFocus() {
            this.isFocused = true;
        },
        removeFocus() {
            this.isFocused = false;
        }
    }
}
</script>
<style scoped>
.filter {
    padding: 10px;
    margin: 10px;
    border: 1px solid #111;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
.filter.focus {
    border: 3px solid #091bd5;
}
.filter-btn, .filter-input {
    background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}
.filter.error {
    border: 2px solid red;
}
.filter-btn .fas {
    color: #ccc;
}
.filter-input {
    width: 100%;
}
</style>