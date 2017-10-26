<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vHeader from "./components/header/header";
import { urlParse } from "./comnon/js/util";

const ERR_OK = 0;
export default {
  name: "app",
  data() {
    return {
      seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
    };
  },
  created() {
    
    this.axios.get("/api/seller?id=" + this.seller.id).then(res => {
      var res = res.data;
      if (res.errno === ERR_OK) {
        // this.seller = res.data;
        this.seller = Object.assign({}, this.seller, res.data);
      }
    });
  },
  components: {
    vHeader
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .tab {
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
