<template>
    <div v-if="item !== null">
        <div class="movie-header">
            <h1 class="movie-header-title">{{ item.Title }}</h1>
            <span class="movie-header-year">{{ item.Year}}</span>
        </div>
        <div class="movie-info">
            <aside class="movie-extra-wrapper">
                <img v-bind:src="item.Poster" v-bind:alt="item.Title" class="movie-poster"/>
                <div class="movie-extra">
                    <div class="movie-extra-upper">
                        <div class="movie-extra-container">
                            <span class="movie-extra-heading">LANGUAGE</span>
                            <span class="movie-extra-value" v-html="linebreak(item.Language)"></span>
                        </div>
                        <div class="movie-extra-container remove-border-left">
                            <span class="movie-extra-heading">Duration</span>
                            <span class="movie-extra-value">{{ item.Runtime }}</span>
                        </div>
                    </div>
                    <div class="movie-extra-lower">
                        <div class="movie-extra-container remove-border-top">
                            <span class="movie-extra-heading">CAST</span>
                            <span class="movie-extra-value" v-html="linebreak(item.Actors)"></span>
                        </div>
                    </div>
                </div>
            </aside>
            <section class="movie-description">
                <h2 class="movie-description-heading">Synopsis</h2>
                <p class="movie-description-text">{{ item.Plot }}</p>
            </section>
        </div>
    </div>
    <div v-else class="movie-empty">
        <span>Please select a title from the sidebar</span>
    </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  props: ['item'],
  methods: {
      linebreak: function(text) {
          return text.replaceAll(",", "</br>");
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-empty {
    display: flex;
    height: 80vh;
    width: 80%;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-size: 1.5em;
    font-weight: bold;
    color: #999;
}
.movie-header {
    background: rgb(10,10,10);
    background: linear-gradient(0deg, rgba(10,10,10,1) 45%, rgba(69,67,67,1) 100%);
    color: #ffffff;
    padding: 120px 80px 60px;
    position: relative;
    z-index: 10;
}
.movie-header-title {
    margin-top: 0;
    font-size: 3em;
    margin-bottom: 0.25em;
}
.movie-header-year {
    font-size: 1.5em;
}
.movie-info {
    padding: 40px 80px;
    display: flex;
    position: relative;

}
.movie-poster {
    margin-bottom: 20px;
    width: 100%;
}
.movie-extra-heading {
    display: block;
}

.movie-description {
    padding-left: 40px;
}

.movie-description-heading {
    margin-top: 0;
}

.movie-extra-wrapper {
    max-width: 250px;
}

.movie-extra-container {
    padding: 8px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    flex-basis: 100%;
}

.movie-extra-upper {
    display: flex;
}

.movie-extra-heading {
    font-weight: bold;
    color: #888;
}
.remove-border-top {
    border-top: none;
}
.remove-border-left {
    border-left: none;
}
</style>
