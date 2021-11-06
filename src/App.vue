<template>
  <aside class="main-col-left">
    <div v-if="this.pagination > 1">
      <button @click="pageDown" v-if="this.currentPage !== 1"><i class="fas fa-minus"></i></button>
      <span>page: {{this.currentPage}}/{{this.pagination}}</span>
      <button @click="pageUp" v-if="this.currentPage !== this.pagination"><i class="fas fa-plus"></i></button>
    </div>
    <input v-model="filterTerm" placeholder="filter" />
    <button @click="resetFilter">
      <span v-if="this.filterTerm.length"><i class="fas fa-times"></i></span>
      <span v-else><i class="fas fa-search"></i></span>
    </button>
    <div v-if="this.filteredData.length">
      <ul>
        <MovieItem 
          v-for="item in limitArray(filteredData)"
          v-bind:item="item"
          v-bind:key="item.imdbID"
          v-bind:currentItemID="currentItemID"
          v-on:itemSelected="updateItem"
        />
      </ul>
    </div>
    <div v-else>Sorry, there are no results to display</div>
  </aside>
  <section class="main-col-right">
      <MovieDetail v-bind:item="currentItem" />
  </section>
</template>

<script>
const INIT_SEARCH_TERM = 'Good';

import axios from 'axios';
import MovieItem from './components/MovieItem.vue';
import MovieDetail from './components/MovieDetail.vue';

export default {
  name: 'App',
  components: {
    MovieItem,
    MovieDetail
  },
  data() {
    return {
      masterData: [],
      currentItem: null,
      currentItemID: "",
      currentPage: 1,
      filterTerm: "",
    }
  },
  created() {
    for(let i = 1; i < 6; i++) {
      this.getDataRequest(i);
    }
  },
  computed: {
    filteredData() {
      // Filter data then sort by alphabetical order relative to Title property.
      return this.masterData.filter(item => {
        if(item.Title.toLowerCase().includes(this.filterTerm.toLowerCase())) return true;
      }).sort((a, b) => a.Title.localeCompare(b.Title));
    },
    pagination() {
      return Math.ceil(this.filteredData.length/10);
    }
  },
  watch: {
    filterTerm: function() {
      this.currentPage = 1;
    }
  },
  methods: {
    async getDataRequest(page) {
      const url = `http://www.omdbapi.com/?s=${INIT_SEARCH_TERM}&apikey=${process.env.VUE_APP_API_KEY}&page=${page}`;
      try {
        const { data: { Response, Search, Error } } = await axios.get(url);
          if( Response === 'False') {
              throw Error(Error);
          } else {
              // Noticed a duplicate being returned on different pages from OMdb API
              // clean up and remove dupes to avoid duplicate key errors.
              const uniqueArr = Search.filter((v, i, a) => a.findIndex( t => (t.imdbID === v.imdbID)) === i );
              this.masterData.push(...uniqueArr);
          }
      } catch(err) {
        console.log(err);
      }
    },
    async updateItem(id) {

      const url = `http://www.omdbapi.com/?i=${id}&apikey=${process.env.VUE_APP_API_KEY}&plot=full`;
      try {
        const { data } = await axios.get(url);
          if( data?.Response === 'False') {
            throw Error(data.Error);
          } else {
            this.currentItemID = id;
            this.currentItem = data;
          }
      } catch(err) {
        console.log(err);
      }
    },
    limitArray(arr) {
      const newArray = [...arr];
      const start = (this.currentPage - 1) * 10;
      return newArray.splice(start, 10);
    },
    pageUp() {
      if(this.currentPage < this.pagination) {
        this.currentPage++;
      }
    },
    pageDown() {
      if(this.currentPage >= 2) {
        this.currentPage--;
      }
    },
    resetFilter() {
      this.filterTerm = "";
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  width: 100%;
  height: 100vh;
}

.main-col-left {
  width: 25vw;
  min-width: 25vw;
}
</style>
