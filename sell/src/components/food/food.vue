<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="elFood">
      <div class="food-content">
        <!-- 头部图片 -->
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>     
        </div>
        <!-- 内容 -->
        <div class="content">
            <!-- 标题 -->
            <h1 class="title">{{food.name}}</h1>
            <!-- 详情 -->
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <!-- 价格 -->
            <div class="price">
              <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
            </div>
            <!-- 购物车按钮 -->
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </div>
          <!-- 分割线 -->
          <split v-show="food.info"></split>
          <!-- 商品介绍 -->
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <!-- 分割线 -->
          <split v-show="food.info"></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect @select-type="SelectType" @toogle-content="OnlyContent"  :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
            <!-- 评价 -->
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                  <!-- 用户 -->
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                  </div>
                  <!-- 时间 -->
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                  <!-- 评论 -->
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down': rating.rateType ===1}"></span>{{rating.text}}                    
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
    </div>
  </transition>  
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import { formatDate } from "../../comnon/js/date";
import cartcontrol from "../../components/cartcontrol/cartcontrol";
import split from "../../components/split/split";
import ratingselect from "../../components/ratingselect/ratingselect";

const ALL = 2;
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: "全部",
        positve: "推荐",
        negative: "吐槽"
      }
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        this._scroll();
      });
    },
    hide() {
      this.showFlag = false;
    },
    // 添加第一个商品
    addFirst() {
      Vue.set(this.food, "count", 1);
    },
    _scroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.elFood, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    // 绑定到子组件上的方法(切换评论类型)
    SelectType(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    OnlyContent(con) {
      this.onlyContent = con;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    // 切换评论内容
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
};
</script>

<style lang="scss">
@import "../../comnon/css/mixin.scss";

.move-enter-active {
  transition: all 0.5s ease;
}
.move-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.move-enter,
.move-leave-to {
  transform: translateX(100%);
}
.food {
  z-index: 30;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  width: 100%;
  background-color: #fff;
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 0;
      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .content {
    position: relative;
    padding: 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .detail {
      height: 10px;
      margin-bottom: 18px;
      line-height: 10px;
      font-size: 0;
      .sell-count,
      .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
      line-height: 24px;
      font-weight: 700;
      font-size: 0;
      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
    .buy {
      z-index: 10;
      position: absolute;
      right: 18px;
      bottom: 18px;
      height: 24px;
      padding: 0 12px;
      line-height: 24px;
      font-size: 10px;
      color: #fff;
      background-color: rgb(0, 160, 220);
      border-radius: 12px;
      box-sizing: border-box;
    }
  }
  .info {
    padding: 18px;
    .title {
      margin-bottom: 16px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .text {
      padding: 0 8px;
      line-height: 24px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }
  .rating {
    padding-top: 18px;
    .title {
      margin-left: 18px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    .rating-item {
      position: relative;
      padding: 16px 0;
      @include border-1px(rgba(7,17,27,0.1));
      .user {
        position: absolute;
        right: 0;
        top: 16px;
        line-height: 12px;
        font-size: 0;
        .name {
          display: inline-block;
          margin-right: 6px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          vertical-align: top;
        }
        .avatar {
          border-radius: 50%;
        }
      }
      .time {
        margin-bottom: 6px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .text {
        line-height: 16px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        .icon-thumb_up,
        .icon-thumb_down {
          margin-right: 4px;
          line-height: 16px;
          font-size: 12px;
        }
        .icon-thumb_up {
          color: rgb(0, 160, 220);
        }
        .icon-thumb_down {
          color: rgb(147, 153, 159);
        }
      }
    }
    .no-rating {
      padding: 16px 0;
      font-size: 12px;
      color: rgb(147, 153, 159);
    }
  }
}
</style>

