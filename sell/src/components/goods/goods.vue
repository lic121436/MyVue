<template>
  <div class="goods">
    <!-- 左侧菜单 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
        </li>
      </ul>
    </div>
    <!-- 右侧商品 -->
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <!-- 商品列表 -->
        <li v-for="item in goods" class="food-list food-list-hook">
          <!-- 标题 -->
          <h1 class="title">{{item.name}}</h1>
          <!-- 分类列表 -->
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <!-- 图标 -->
              <div class="icon">
                <img width="57" height="64" :src="food.icon" alt="">
              </div>
              <!-- 内容 -->
              <div class="content">
                <!-- 商品名称 -->
                <h2 class="name">{{food.name}}</h2>
                <!-- 商品描述 -->
                <p class="desc">{{food.description}}</p>
                <!-- 属性 -->
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <!-- 价格 -->
                <div class="price">
                  <!-- 现价 -->
                  <span class="now">¥{{food.price}}</span>
                  <!-- 原价 -->
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <!-- 引入cartcontrol控件 -->
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import shopcart from "../../components/shopcart/shopcart";
import cartcontrol from "../../components/cartcontrol/cartcontrol";

const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeiht: [],
      scrollY: 0
    };
  },
  computed:{
    // 左侧当前索引所在位置
    currentIndex(){
      for(let i = 0; i < this.listHeiht.length; i++){
        let height1 = this.listHeiht[i];
        let height2 = this.listHeiht[i + 1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return i;
        }
      }
      return 0;
    },
    // cartcontrol组件改变food数量
    selectFoods(){
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count){
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    // 获取goods数据
    this.axios.get("/api/goods").then(res => {
      res = res.data;
      if (res.errno === ERR_OK) {
        this.goods = res.data;
        // vue DOM的变化是在this.$nextTick()这个回调函数后
        this.$nextTick(() => {
          this._initScroll();
          // 计算右侧每个区间的高度
          this._calulateHeight();
        });
      }
    });
    // 设置标签数组
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    _drop(target){
      this.$refs.shopcart.drop(target);
    },
    // 初始化滚动
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY =Math.abs(Math.round(pos.y));  // pos.y滚动是一个负值
      });
    },
    // 计算右侧每个区间的高度
    _calulateHeight(){
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeiht.push(height);
      for(let i = 0; i < foodList.length; i++){
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeiht.push(height);
      }
    },
    // 点击选中左侧菜单
    selectMenu(index, event){
      // 新版本的better-scroll已经解决了这个在pc端点击触发两次的bug可以不用写下面的if代码
      if(!event._constructed){
        return;
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      // 调用better-scroll scrollToElement接口
      this.foodsScroll.scrollToElement(el, 300);
    }
  },
  components: {
    shopcart,
    cartcontrol
  },
  // events:{
  //   'cart.add'(target){
  //     this._drop(target);
  //   }
  // }
};
</script>

<style lang="scss">
@import "../../comnon/css/mixin.scss";

.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;
      &.current{
        z-index: 2;
        position: relative;
        margin-top:-1px;
        font-weight: 700;
        background-color: #fff;
        .text{
          @include border-none();
        }
      }
      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 2;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        vertical-align: top;
        &.decrease {
          @include bg-image("decrease_3");
        }
        &.discount {
          @include bg-image("discount_3");
        }
        &.guarantee {
          @include bg-image("guarantee_3");
        }
        &.invoice {
          @include bg-image("invoice_3");
        }
        &.special {
          @include bg-image("special_3");
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        font-size: 12px;
        vertical-align: middle;
        @include border-1px(rgba(7,17,27,0.2));
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      height: 26px;
      padding-left: 14px;
      line-height: 26px;
      font-size: 12px;
      color: rgb(147, 153, 159);
      border-left: 2px solid #d9dde1;
      background-color: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include border-1px(rgba(7,17,27,0.2));
      &:last-child {
        @include border-none();
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          height: 14px;
          margin: 2px 0 8px 0;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          line-height: 10px;
          .count {
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
        .cartcontrol-wrapper{
          position: absolute;
          right: 0;
          bottom:12px;
        }
      }
    }
  }
}
</style>


