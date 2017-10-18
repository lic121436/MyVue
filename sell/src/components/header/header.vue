<template>
  <div class="header">
    <div class="content-wrapper">
      <!-- 图片 -->
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 标题 -->
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <!-- 描述 -->
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 优惠活动 -->
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 公告栏 -->
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 背景图片 -->
    <div class="background"><img :src="seller.avatar" width="100%" height="100%" alt=""></div>
  </div>
</template>
<script>
export default {
  props:{
    seller:{
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
}
</script>

<style lang="scss">
  @import "../../comnon/css/mixin.scss";

  .header{
    position: relative;
    color:#fff;
    background-color: rgba(7,17,27,.5);
    .content-wrapper{
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar{
        display: inline-block;
        vertical-align:top;
        img{
          border-radius: 2px;
        }
      }
      .content{
        display: inline-block;
        margin-left: 16px;
        .title{
          margin: 2px 0 8px 0;
          .brand{
            display: inline-block;
            width:30px;
            height: 18px;
            @include bg-image('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
            vertical-align: top;
          }
          .name{
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description{
          margin-bottom:10px;
          line-height: 12px;;
          font-size: 12px;
        }
        .support{
          .icon{
            display: inline-block;
            width: 12px;
            height: 12px;;
            margin-right: 4;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease{
              @include bg-image('decrease_1');
            }
            &.discount{
               @include bg-image('discount_1');
            }
            &.guarantee{
               @include bg-image('guarantee_1');
            }
            &.invoice{
              @include bg-image('invoice_1');
            }
            &.special{
              @include bg-image('special_1');
            }
          }
          .text{
            margin-left: 4px;
            line-height: 12px;
            font-size: 10px;
          }
        }
      }
      .support-count{
        position: absolute;
        right: 12px;
        bottom:18px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        text-align:center;
        border-radius: 14px;
        background-color: rgba(0,0,0,.2);
        .count{
          font-size: 10px;
          vertical-align: top;
        }
        .icon-keyboard_arrow_right{
          margin-left: 2px;
          line-height: 24px;
          font-size: 10px;
        }
      }
    }
    .bulletin-wrapper{
      position: relative;
      height: 28px;
      padding: 0 22px 0 12px;
      line-height: 28px;
      font-size: 0;
      background-color: rgba(7,17,27,.2);
      .bulletin-title{
        display: inline-block;
        width: 22px;
        height: 12px;
        margin-top: 7px;
        @include bg-image('bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
        vertical-align: top;
      }
      .bulletin-text{
        display: inline-block;
        width: calc(100% - 30px);
        margin-left: 4px;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        top:8px;
        right: 12px;
        font-size: 10px;
      }
    }
    .background{
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(10px);
    }
  }
</style>
