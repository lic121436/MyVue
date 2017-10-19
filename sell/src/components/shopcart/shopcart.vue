<template>
  <div class="shopcart">
      <div class="content">
          <!-- 购物车右侧 -->
          <div class="content-left">
              <!-- 购物车logo -->
              <div class="logo-wrapper">
                  <div class="logo">
                      <i class="icon-shopping_cart"></i>
                  </div>
              </div>
              <!-- 购物金额 -->
              <div class="price">¥0</div>
              <!-- 配送费 -->
              <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
          </div>
          <!-- 购物车右侧 -->
          <div class="content-right"></div>
      </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
    .shopcart{
        z-index: 2;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 48px;
        background-color: #000;
        .content{
            display: flex;
            font-size: 0;
            background-color: #141427;
            .content-left{
                flex:1;
                .logo-wrapper{
                    display: inline-block;
                    position: relative;
                    top:-10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background-color: #141427;
                    .logo{
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        background-color: #2b343c;
                        border-radius: 50%;
                       .icon-shopping_cart{
                           display: inline-block;
                            line-height: 44px;
                           font-size: 24px;
                           color: #80858a;
                       }
                    }
                }
                .price{
                    display: inline-block;
                    padding-right: 12px;
                    margin-top: 12px;
                    line-height: 24px;
                    font-size: 16px;
                    font-weight: 700;
                    color: rgba(255,255,255,.4);
                    border-right: 1px solid rgba(255,255,255,.1);
                    box-sizing: border-box;
                    vertical-align: top;
                }
                .desc{
                    display: inline-block;
                    margin: 12px 0 0 12px;
                    line-height: 24px;
                    font-size: 12px;
                    color: rgba(255,255,255,.4);
                    vertical-align: top;
                }
            }
            .content-right{
                flex: 0 0 105px;
                width: 105px;
            }
        }
    }
</style>


