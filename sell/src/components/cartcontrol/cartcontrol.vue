<template>
  <div class="cartcontrol">
       <transition name="slide-fade">
        <div class="cart-decrease" v-show="food.count > 0"  @click="decreaseCart">
                <span class="inner icon-remove_circle_outline"></span>
        </div>
       </transition>
      <div class="cart-count"  v-show="food.count > 0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
// 引入Vue接口
import Vue from "vue";
export default {
  // 从父组件获取数据
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    //   增加商品
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      //   子组件向父组件传值
    //   this.$emit("cart.add", event.target);
    },
    // 减少商品
    decreaseCart() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="scss">
.cartcontrol {
  font-size: 0;
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(24px);
    opacity: 0;
  }
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
  .cart-count {
    display: inline-block;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
    vertical-align: top;
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
