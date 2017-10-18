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
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 公告栏 -->
    <div class="bulletin-wrapper"  @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 背景图片 -->
    <div class="background"><img :src="seller.avatar" width="100%" height="100%" alt=""></div>
    <!-- 浮层详情 -->
    <div class="detail" v-show="detailShow"  name="fade">
      
      <!-- 内容 -->
      <div class="detail-wrapper cleafix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <!-- 星星 -->
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <!-- 标题 -->
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <!-- 优惠信息列表 -->
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
           <!-- 标题 -->
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <!-- 关闭按钮 -->
      <div class="detail-colse">
        <i class="icon-close" @click="hideDetail"></i>
      </div>
    </div>
  </div>
</template>
<script>
import star from '../star/star'

export default {
  //  子组件获取传入的数据
  props:{
    seller:{
      type: Object
    }
  },
  data () {
    return {
      detailShow: false  
    }
  },
  created () {
    // 设置标签数组
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    // 显示浮层
    showDetail(){
      this.detailShow = true;
    },
    // 关闭浮层
    hideDetail(){
      this.detailShow = false;
    }
  },
  components: {
    star
  }
}
</script>

<style lang="scss">
  @import "../../comnon/css/mixin.scss";

  .header{
    position: relative;
    color:#fff;
    background-color: rgba(7,17,27,.5);
    overflow: hidden;
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
        margin-top: 8px;
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
    .detail{
      z-index: 100;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      transition: all .5s linear;
      -webkit-backdrop-filter: blur(10px);
      background-color: rgba(7,17,27,.8);
      &.fade-transition{
        opacity: 1;
        background-color: rgba(7,17,27,.8);
      }
      &.fade-enter,&.fade-leave{
        opacity:0;
        background-color: rgba(7,17,27,0);
      }
      .detail-wrapper{
        width: 100%;
        min-height: 100%;
        .detail-main{
          margin-top:64px;
          padding-bottom: 64px;
          .name{
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .star-wrapper{
            margin-top: 18px;
            padding: 2px 0;
            text-align:center;
          }
          .title{
            display: flex;
            width:80%;
            margin: 28px auto 24px auto;
            .line{
              flex:1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255,255,255,.2);
            }
            .text{
              padding:0 12px;
              font-size: 14px;
              font-weight: 700;
            }
          }
          .supports{
            width: 80%;
            margin:0 auto;
            .support-item{
              padding:0 12px;
              margin-bottom:12px;
              font-size:0;
              &:last-child{
                margin-bottom: 0;
              }
              .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 6px;
                vertical-align: top;
                background-size: 16px;
                background-repeat: no-repeat;
                &.decrease{
                  @include bg-image('decrease_2');
                }
                &.discount{
                  @include bg-image('discount_2');
                }
                &.guarantee{
                  @include bg-image('guarantee_2');
                }
                &.invoice{
                  @include bg-image('invoice_2');
                }
                &.special{
                  @include bg-image('special_2');
                }
              }
              .text{
                line-height: 16px;
                font-size: 12px;
              } 
            }
          }
          .bulletin{
            width:80%;
            margin: 0 auto;
            .content{
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      }
      .detail-colse{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        font-size: 32px;
        clear: both;
      }
    }
  }
</style>
