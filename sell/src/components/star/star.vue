<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
const LENGTH = 5;
const ClS_ON = 'on';
const ClS_HALF = 'half';
const ClS_OFF = 'off';
export default {
    //  接收传入的参数
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    // 计算属性
    computed: {
        starType() {
            return 'star-' + this.size;
        },
        itemClasses() {
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasDecimal = score % 1 !== 0;
            let integer = Math.floor(score);
            for (let i = 0; i < integer; i++) {
                result.push(ClS_ON);
            }
            if (hasDecimal) {
                result.push(ClS_HALF);
            }
            while (result.length < LENGTH) {
                result.push(ClS_OFF);
            }
            return result;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../comnon/css/mixin.scss";
.star {
    font-size: 0;
    .star-item {
        display: inline-block;
        background-repeat: no-repeat;
    }
    &.star-48 {
        .star-item {
            width: 20px;
            height: 20px;
            margin-right: 22px;
            background-size: 20px 20px;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                @include bg-image('star48_on');
            }
            &.half {
                @include bg-image('star48_half');
            }
            &.off {
                @include bg-image('star48_off');
            }
        }
    }
    &.star-36 {
        .star-item {
            width: 15px;
            height: 15px;
            margin-right: 6px;
            background-size: 15px 15px;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                @include bg-image('star36_on');
            }
            &.half {
                @include bg-image('star36_half');
            }
            &.off {
                @include bg-image('star36_off');
            }
        }
    }
    &.star-24 {
        .star-item {
            width: 10px;
            height: 10px;
            margin-right: 3px;
            background-size: 10px 10px;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                @include bg-image('star24_on');
            }
            &.half {
                @include bg-image('star24_half');
            }
            &.off {
                @include bg-image('star24_off');
            }
        }
    }
    
}
</style>

