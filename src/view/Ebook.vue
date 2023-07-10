<template>
  <!-- <div>1111</div> -->
  <div class="ebook" tabindex="0" v-on:keydown="handleKeyDown" >
    <transition name="slide-down">
      <!-- 标题栏 -->
      <div class="title-wrapper" v-show="titleAndMenuShow">
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
    <!-- 文本 -->
    <div class="read-wrapper">
      <div id="read">
        <div class="mask">
          <div class="left" @click="prevPage"></div>
          <div class="center" @click="toggleTitleAndMenu"></div>
          <div class="right" @click="nextPage"></div>
          <!-- <div v-focus>
            <div @keydown.left="prevPage"></div>
            <div @keydown.enter="nextPage"></div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 菜单栏 -->

    <transition name="slide-up">
      <div class="menu-wrapper" v-show="titleAndMenuShow">
        <div class="icon-wrapper">
          <span class="icon-menu icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a icon">A</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Epub from 'epubjs';
// const DOWNLOAD_URL = '../../static/倦怠社会_韩炳哲.epub'
// const epubName = "[奈须きのこ].空之境界〈上〉（简）";
const epubName = "我的青春恋爱物语果然有问题01";
const DOWNLOAD_URL = `http://localhost:5173/${epubName}.epub`;
import { onMounted, ref } from 'vue';

// document.addEventListener('keydown', )

let titleAndMenuShow = ref<boolean>(false);
let book: any = new (Epub as any)(DOWNLOAD_URL);
let rendition = book.renderTo('read', {
  width: window.innerWidth,
  height: window.innerHeight,
})

onMounted(() => {
  // 生成Book对象
  // console.log(book);
  // Redition
  // display 直接操作dom的形式挂上电子书
  rendition.display();
  console.log(book);
  console.log(rendition);
})

function handleKeyDown(event:KeyboardEvent)
{
  // console.log(event);
  let keyCode = event.code;
  switch(keyCode)
  {
    case "ArrowLeft":  // left
      prevPage(); 
      break;
    case "ArrowUp":  // up
      break;  
    case "ArrowRight":  // right
      nextPage();
      break;
    case "ArrowDown":
      break;
    default:
      break;
  }
}
function prevPage() {
  if (rendition) {
    rendition.prev();
  }
}
function nextPage() {
  // console.log('right');
  if (rendition) {
    rendition.next();
  }
}
function toggleTitleAndMenu() {
  titleAndMenuShow.value = !titleAndMenuShow.value;
}

</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';

.ebook {
  position: relative;
  height: 100%;
  width: 100%;

  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(48);
    background-color: pink;

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

    &.slide-down-enter,
    &.slide-down-leave-to {
      transform: translate3d(0, -100%, 0)
    }

    &.slide-down-enter-to,
    &.slide-down-leave {
      transform: translate3d(0, 0, 0);
    }

    &.slide-down-enter-active,
    &.slide-down-leave-active {
      transition: all 0.3s linear;
    }
  }

  .read-wrapper {
    #read {
      .mask {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        height: 100%;
        width: 100%;

        .left {
          flex: 0 0 px2rem(100); // 要应用flex，模型必须是display: flex;
          // background-color: yellow;
        }

        .center {
          flex: 1;
          // background-color: pink;
        }

        .right {
          flex: 0 0 px2rem(100);
          // background-color: orange;
        }

        // background-color: pink;
      }
    }
  }

  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(48);
    background-color: pink;

    display: flex;
    // 阴影
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);

    .icon-wrapper {
      flex: 1;
      @include center;

      .icon-progress {
        font-size: px2rem(27);
      }

      .icon-bright {
        font-size: px2rem(24);
      }
    }

    &.slide-up-enter,
    &.slide-up-leave-to {
      transform: translate3d(0, 100%, 0)
    }

    &.slide-up-enter-to,
    &.slide-up-leave {
      transform: translate3d(0, 0, 0);
    }

    &.slide-up-enter-active,
    &.slide-up-leave-active {
      transition: all 0.3s linear;
    }
  }
}
</style>