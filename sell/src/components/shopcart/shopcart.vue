<template>
  <div class="shopcart">
      <div class="content" @click="toggleList">
          <!-- 购物车右侧 -->
          <div class="content-left">
              <!-- 购物车logo -->
              <div class="logo-wrapper">
                  <div class="logo" :class="{'heihgtlight': totalCount > 0}">
                      <i class="icon-shopping_cart" :class="{'heihgtlight': totalCount > 0}"></i>
                  </div>
                  <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
              </div>
              <!-- 购物金额 -->
              <div class="price" :class="{'heihgtlight': totalPrice > 0}">¥{{totalPrice}}</div>
              <!-- 配送费 -->
              <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
          </div>
          <!-- 购物车右侧 -->
          <div class="content-right">
              <div class="pay" :class="payClass">{{payDesc}}</div>
            </div>
      </div>
      <!-- 小球 -->
      <!-- <div class="ball-container" name="drop">
        <div v-for="ball in balls" v-show="ball.show" class="ball"></div>
        <div class="inner"></div>
      </div> -->
      <!-- 购物车列表 -->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
            <!-- 列表头部 -->
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <div class="empty">清空</div>
            </div>
            <!-- 列表内容 -->
            <div class="list-content">
                <ul>
                    <li class="food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>¥{{food.price * food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </transition>
  </div>
</template>

<script>
import cartcontrol from "../../components/cartcontrol/cartcontrol";
export default {
  // 接收传入组件的信息
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      fold: true
    };
  },
  computed: {
    //   计算总价格
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    //   计算所选项目的总和
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    // 右侧描述（起送价，还差多少起送，结算）
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差¥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    // 根据价格来计算，判断显示pay class
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    // 叠起，展开列表
    listShow() {
      if (!this.totalCount) {
        this.flod = true;
        return false;
      }
      let show = !this.fold;
      return show;
    }
  },
  methods: {
    // drop(el) {
    //   console.log(el);
    // }
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    }
  },
  components: {
    cartcontrol
  }
};
</script>

<style lang="scss">
.shopcart {
  z-index: 2;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  background-color: #000;
  .content {
    display: flex;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    background-color: #141427;
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background-color: #141427;
        .logo {
          width: 100%;
          height: 100%;
          text-align: center;
          background-color: #2b343c;
          border-radius: 50%;
          &.heihgtlight {
            background-color: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            display: inline-block;
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.heihgtlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          background-color: rgb(240, 20, 20);
          border-radius: 16px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        padding-right: 12px;
        margin-top: 12px;
        line-height: 24px;
        font-size: 16px;
        font-weight: 700;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        box-sizing: border-box;
        vertical-align: top;
        &.heihgtlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 12px;
        vertical-align: top;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        &.not-enough {
          background-color: #2b343c;
        }
        &.enough {
          color: #fff;
          background-color: #00b43c;
        }
      }
    }
  }
  .ball-wrapper {
    .ball {
      z-index: 3;
      position: fixed;
      left: 32px;
      bottom: 22px;
      &.drop-transition {
        transition: all 0.4s;
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgb(0, 160, 220);
          transition: all 0.4s;
        }
      }
    }
  }

  .fold-enter-active,
  .fold-leave-active {
     transition: all 0.3s linear;
 transform: translateY(-100%);
  }


  .fold-enter,
  .fold-leave-to {
   
    opacity: 0;

  }

 

  .shopcart-list {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .list-header {
      height: 40px;
      padding: 0 18px;
      line-height: 40px;
      background-color: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }
  }
}
</style>


