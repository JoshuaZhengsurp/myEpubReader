<template>
    <!-- <div>1111</div> -->
    <transition name="slide-down">
        <!-- 标题栏 -->
        <div class="title-wrapper" v-show="props.titleAndMenuShow">
            <div class="left">
                <span class="icon-back icon"></span>
            </div>
            <div class="right">
                <div class="icon-wrapper">
                    <span class="icon-cart icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-person icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-more icon"></span>
                </div>
            </div>
        </div>
    </transition>
</template>
  
<script setup lang="ts">
const props = defineProps(['titleAndMenuShow',]);
</script>
  
<style lang="scss" scoped>
@import '../assets/styles/global.scss';

.title-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
        width: 100%;
        height: px2rem(48);
        background-color: #D5BCA8;

        display: flex;
        // 阴影
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);

        .left {
            flex: 0 0 px2rem(60);
            // sass 语法
            @include center;
        }

        .right {
            flex: 1;
            display: flex;
            justify-content: flex-end;

            .icon-wrapper {
                flex: 0 0 px2rem(40);
                @include center;

                .icon-cart {
                    font-size: px2rem(22);
                }
            }
        }


    }
</style>