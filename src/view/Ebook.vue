<template>
  <!-- <div>1111</div> -->
  <div class="ebook" tabindex="0" v-on:keydown="handleKeyDown" >
    <!-- 标题栏 -->
    <TitleBar :titleAndMenuShow="titleAndMenuShow"></TitleBar>
    
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
    <MenuBar 
      :fontSizeList="fontSizeList"
      :titleAndMenuShow="titleAndMenuShow"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      :themesList="themesList"
      :curThemeName="curThemeName"
      @setTheme="setTheme"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange">
    </MenuBar>
  </div>
</template>

<script setup lang="ts">
import Epub from 'epubjs';
import MenuBar from '../components/MenuBar.vue';
import TitleBar from '../components/TitleBar.vue';
// const DOWNLOAD_URL = '../../static/倦怠社会_韩炳哲.epub'
const epubName = "[奈须きのこ].空之境界〈上〉（简）";
// const epubName = "我的青春恋爱物语果然有问题01";
const DOWNLOAD_URL = `http://localhost:5173/${epubName}.epub`;
// const DOWNLOAD_URL = 'E:\\360MoveData\\Users\\DELL\\Desktop\\myEpubReader\\public\\[奈须きのこ].空之境界〈上〉（简）.epub'
import { onMounted, ref, reactive, } from 'vue';

// document.addEventListener('keydown', )

let titleAndMenuShow = ref<boolean>(false);
let book: any = new (Epub as any)(DOWNLOAD_URL);
let rendition = book.renderTo('read', {
  width: window.innerWidth,
  height: window.innerHeight,
  allowScriptedContent: true
})
let themes = rendition.themes;
let defaultFontSize = ref<Number>(16);
let bookAvailable = ref<boolean>(false)


let fontSizeList = reactive([
  {fontSize:12},
  {fontSize:14},
  {fontSize:16},
  {fontSize:18},
  {fontSize:20},
  {fontSize:22},
  {fontSize:24}
]);
let themesList = [
  {
    name: 'default',
    style: {
      body:{
        'color': '#000',
        'background': '#fff',
      }
    }
  },
  {
    name: 'eye',
    style: {
      body:{
        'color': '#000',
        'background': '#ceeaba',
      }
    }
  },
  {
    name: 'night',
    style: {
      body:{
        'color': '#9e9e9e',
        'background': '#121212',
      }
    }
  },
  {
    name: 'gold',
    style: {
      body:{
        'color': '#000',
        'background': 'rgb(241, 236, 226)',
      }
    }
  },
];
let curThemeName = ref<string>('eye');
let location:any;

onMounted(() => {
  // 生成Book对象
  // console.log(book);
  // Redition
  // display 直接操作dom的形式挂上电子书
  rendition.display();
  // 初始化字体大小
  setFontSize(defaultFontSize.value);
  // themes.register(name, styles);
  // themes.select(name);
  // 注册主题
  registerThemes();
  setTheme(curThemeName.value);
  // 获取locations对象,locations包含着页面信息
  // 通过epubjs的钩子函数实现
  book.ready.then(()=>{
    return book.locations.generate();
  }).then(() =>{
    location = book.locations;
    bookAvailable.value = true;
    // console.log(location)
    // onProgressChange(50);
  })
})

function handleKeyDown(event:KeyboardEvent)
{
  // console.log(event);
  let keyCode = event.code;
  switch(keyCode)
  {
    case "ArrowLeft":  // left
      titleAndMenuShow.value = false;
      prevPage(); 
      break;
    case "ArrowUp":  // up
      break;  
    case "ArrowRight":  // right
      titleAndMenuShow.value = false;
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
  // console.log(menuBar.value);
  // if(!titleAndMenuShow.value)menuBar.value.hideSetting();
}
function setFontSize(x:Number){
  defaultFontSize.value = x;
  console.log(x);
  if(themes){themes.fontSize(x+'px');}
  else {throw Error('themes do not exit;');}
}
function registerThemes(){
   themesList.forEach(themesItem => {
    themes.register(themesItem.name, themesItem.style);
   });
}
function setTheme(themeName:string){
  curThemeName.value = themeName;
  themes.select(themeName);
}
function onProgressChange(progress:number){
  const percentage = progress/100;
  const pageNo = percentage > 0 ? (location).cfiFromPercentage(percentage) : 0;
  rendition.display(pageNo);
}
</script>

<style lang="scss">
@import '../assets/styles/global.scss';

.ebook {
  position: relative;
  height: 100%;
  width: 100%;


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


}
</style>