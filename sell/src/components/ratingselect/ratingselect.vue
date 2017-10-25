<template>
    <div class="ratingselect">
        <!-- 评价类型 -->
        <div class="rating-type border-1px">
            <span @click="select(2)" class="block positve" :class="{'active': sType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0)" class="block positve" :class="{'active': sType === 0}">{{desc.positve}}<span class="count">{{positves.length}}</span></span>
            <span @click="select(1)" class="block negative" :class="{'active': sType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <!--  -->
        <div @click="toggleContent" class="switch" :class="{'on': oContent}">
            <i class="icon-check_circle"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
const POSITVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positve: "满意",
          negative: "不满意"
        };
      }
    }
  },
  data () {
    return {
      sType: this.selectType,
      oContent: this.onlyContent  
    }
  },
  computed: {
    positves(){
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITVE;
      });
    },
    negatives(){
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type){
      this.sType = type;
      this.$emit('select-type', type);
    },
    toggleContent(){
      this.oContent = !this.oContent;
      this.$emit('toogle-content', this.oContent);
    }
  }
};
</script>

<style lang="scss">
@import "../../comnon/css/mixin.scss";
.ratingselect {
  .rating-type {
    margin: 0 18px;
    padding: 18px 0;
    @include border-1px(rgba(7,17,27,0.1));
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      line-height: 16px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      &.active {
        color: #fff;
      }
      .count {
        margin-left: 2px;
        font-size: 8px;
      }
      &.positve {
        background-color: rgba(0, 160, 220, 0.2);
        &.active {
          background-color: rgb(0, 160, 220);
        }
      }
      &.negative {
        background-color: rgba(77, 85, 93, 0.2);
        &.active {
          background-color: rgb(77, 85, 93);
        }
      }
    }
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    font-size: 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }
    .icon-check_circle {
      display: inline-block;
      margin-right: 4px;
      font-size: 24px;
      vertical-align: top;
    }
    .text {
      font-size: 12px;
    }
  }
}
</style>
