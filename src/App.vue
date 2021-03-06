<template>
  <aside class="app-col-left">
    <div class="app-col-uppper">
      <Filter 
        v-on:searchText="updateFilter"
        v-bind:error="!this.filteredData.length && this.filterTerm"
      />
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="this.filteredData.length && !loading">
        <ul class="movie-item-list">
          <MovieItem 
            v-for="item in limitArray(filteredData)"
            v-bind:item="item"
            v-bind:key="item.imdbID"
            v-bind:currentItemID="currentItemID"
            v-on:itemSelected="getMovieItem"
          />
        </ul>
      </div>
      <div v-else class="no-movie-error">Sorry, there are no results to display</div>
    </div>
    <Pagination 
      v-bind:pages="pages"
      v-bind:currentPage="currentPage"
      v-on:paginate="paginate"
       />
  </aside>
  <section class="app-col-right">
      <MovieDetail v-bind:item="currentItem" />
  </section>
</template>
<script>
const INIT_SEARCH_TERM = 'Good';

import axios from 'axios';
import MovieItem from './components/MovieItem.vue';
import MovieDetail from './components/MovieDetail.vue';
import Pagination from './components/Pagination.vue';
import Filter from './components/Filter.vue';

export default {
  name: 'App',
  components: {
    MovieItem,
    MovieDetail,
    Pagination,
    Filter
  },
  data() {
    return {
      masterData: [],
      currentItem: null,
      currentItemID: "",
      currentPage: 1,
      filterTerm: "",
      totalResults: 0,
      pagesRetrieved: [],
      loading: true
    }
  },
  created() {
    // Initial data on load as per designs
    this.getMasterData(1);
  },
  computed: {
    filteredData() {
      // Filter data then sort by alphabetical order relative to Title property.
      return this.masterData.filter(item => {
        if(item.Title.toLowerCase().includes(this.filterTerm.toLowerCase())) return true;
      }).sort((a, b) => a.Title.localeCompare(b.Title));
    },
    pages() {
      if(this.filterTerm.length === 0) return Math.ceil(this.totalResults/10);
      return Math.ceil(this.filteredData.length/10);
    }
  },
  watch: {
    filterTerm: function() {
      this.currentPage = 1;
    },
    currentPage: function() {
      if(this.filterTerm.length === 0) {
        this.getMasterData(this.currentPage);
      }
    }
  },
  methods: {
    async getMasterData(page) {

      if(this.pagesRetrieved.includes(page)) return;

      this.loading = true;

      const url = `http://www.omdbapi.com/?s=${INIT_SEARCH_TERM}&apikey=${process.env.VUE_APP_API_KEY}&page=${page}`;
      try {
        const { data: { Response, Search, Error, totalResults } } = await axios.get(url);
          if( Response === 'False') {
              throw Error(Error);
          } else {
              // Noticed a duplicate being returned on different pages from OMdb API
              // clean up and remove dupes to avoid duplicate key errors.
              const uniqueArr = Search.filter((v, i, a) => a.findIndex( t => (t.imdbID === v.imdbID)) === i );
              this.masterData.push(...uniqueArr);
              this.totalResults = totalResults;
              this.pagesRetrieved.push(page);
              this.loading = false;
          }
      } catch(err) {
        console.log(err);
      }
    },
    async getMovieItem(id) {
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
    updateFilter(text) {
      this.filterTerm = text;
    },
    paginate(direction) {
      if(direction === 'up' && this.currentPage < this.pages) {
        this.currentPage++;
      }
      if(direction === 'down' && this.currentPage >= 2) {
        this.currentPage--;
      }
    }
  }
}
</script>

<style>
body, html { margin: 0; }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.app-col-left {
  width: 25%;
  min-width: 25%;
  height: 100%;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.app-col-right {
  width: 75%;
  min-width: 75%;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.app-col-right::after {
    content: "";
    display: block;
    width: 10px;
    height: 100%;
    position: absolute;
    z-index: 2;
    top: 0px;
    left: 0px;
    background: rgb(208,204,204);
    background: linear-gradient(90deg, rgb(233, 232, 232) 0%, rgba(255,255,255,1) 80%);
}

.no-movie-error {
  margin-left: 10px;
  margin-top: 20px;
}

.movie-item-list {
  padding-left: 0;
  background-color: #fff;
}

.loading {
  color: #ccc;
  margin-left: 10px;
  margin-top: 20px;
  font-weight: bold;
}
</style>
