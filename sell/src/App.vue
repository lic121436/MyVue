<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <router-link to="/seller">商家</router-link>
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评论</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import vHeader from './components/header/header'

export default {
  name: 'app',
  components: {
    vHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
