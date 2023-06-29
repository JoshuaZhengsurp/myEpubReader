<template>
  <!-- <div>1111</div> -->
  <div class="ebook">
    <div class="read-wrapper">
      <div id="read">
        <div class="mask">
          <div class="left" @click="prevPage"></div>
          <div class="center"></div>
          <div class="right" @click="nextPage"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Epub from 'epubjs';
const DOWNLOAD_URL = '../../static/倦怠社会_韩炳哲.epub';
import { onMounted } from 'vue';

let book:any = new (Epub as any)(DOWNLOAD_URL);
let rendition = book.renderTo('read',{
    width: window.innerWidth,
    height: window.innerHeight,
})

onMounted(() => {
  // 生成Book对象
  // console.log(book);
  // Redition
  // display 直接操作dom的形式挂上电子书
  rendition.display();
})

function prevPage(){
  if(rendition)
  {
    rendition.prev();
  }
}
function nextPage(){
  if(rendition)
  {
    rendition.next();
  }
}

</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';

.ebook{
  position: relative;
  .read-wrapper{
    #read{
      .mask{
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        height: 100%;
        width: 100%;
        .left{
          flex:0 0 px2rem(100);       // 要应用flex，模型必须是display: flex;
          // background-color: yellow;
        }
        .center{
          flex: 1;
          // background-color: pink;
        }
        .right{
          flex:0 0 px2rem(100);
          // background-color: orange;
        }
        // background-color: pink;
      }
    }
  }
}
</style>