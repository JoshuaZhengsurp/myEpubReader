<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" 
      v-show="props.titleAndMenuShow" 
      :class="{ 'box-shadow-hide': SettingShow || !props.titleAndMenuShow }">
        <div class="icon-wrapper">
          <span class="icon-menu icon"></span>
        </div>
        <div class="icon-wrapper" @click="ifSettingShow(2, showTag === 2)">
          <span class="icon-progress icon"></span>
        </div>
        <div class="icon-wrapper" @click="ifSettingShow(1,showTag === 1)">
          <span class="icon-bright icon"></span>
        </div>
        <div class="icon-wrapper" @click="ifSettingShow(0, showTag === 0)">
          <span class="icon-a icon">A</span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="SettingShow">
        <!-- 字号调节 -->
        <div class="setting-font-size" v-if="showTag === 0">
          <div class="preview" :style="{fontSize:fontSizeList[0].fontSize+'px'}">A</div>
          <div class="select">
            <div class="select-wrapper" 
            v-for="(fontSize,index) in fontSizeList" 
            :key="index"
            @click="setFontSize(fontSize.fontSize)">
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="props.defaultFontSize == fontSize.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="preview" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize+'px'}">A</div>
        </div>
        <!-- 主题调节 -->
        <div class="setting-theme" v-else-if="showTag === 1">
          <div class="setting-theme-item"
          v-for="(item,index) in props.themesList" 
          :key="index"
          @click="setTheme(item.name)"
          >
            <div class="preview" :style="{background:item.style.body.background}"></div>
            <div class="text" :class="{'selected': item.name === props.curThemeName}">{{ item.name }}</div>
          </div>
        </div>
        <!-- 阅读进度 -->
        <div class="setting-progress" v-else-if="showTag === 2">
          <div class="progress-wrapper">
            <input class="progress" type="range"
                                    max="100"
                                    min="0"
                                    step="1"
                                    @change="onOnProgressChange($event.target?.value)"
                                    @input="onOnProgressInput($event.target?.value)"
                                    :value="progress"
                                    :disabled="!props.bookAvailable"
                                    ref="progress_dom"
                                    />
          </div>
          <div class="text-wrapper">
            {{ props.bookAvailable?progress + '%' : '加载中...' }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue';
const progress_dom = ref(null);
const props = defineProps([
  'titleAndMenuShow',
  'fontSizeList',
  'defaultFontSize',
  'themesList',
  'curThemeName',
  'bookAvailable'
]);
const emit = defineEmits([
  'setFontSize',
  'setTheme',
  'onProgressChange'
]);
let SettingShow = ref<boolean>(false);
let showTag = ref<Number>(-1);
let progress = ref(0);
// console.log(props,props.fontSizeList);
watch(props, (newValue) => {
  if (newValue.titleAndMenuShow == false) {
    hideSetting();
  }
})

function ifSettingShow(Tag:Number = -1,flag:boolean) {
  if (props.titleAndMenuShow) {
    if (SettingShow.value&&flag) hideSetting();
    else showSetting(Tag);
  }
}

function showSetting(Tag:Number) {
  SettingShow.value = true;
  showTag.value = Tag;
}
function hideSetting() {
  SettingShow.value = false;
  showTag.value = -1;
}
function setFontSize(x:Number){
  emit('setFontSize',x);
}
function setTheme(themeName:string){
  console.log(themeName)
  emit('setTheme',themeName);
}
function onOnProgressInput(curProgress: number){
  progress.value = curProgress;
  progress_dom.value.style.backgroundSize = `${curProgress}$ 100%`

}
function onOnProgressChange(curProgress: number){
  emit('onProgressChange',curProgress);
}

  // console.log(props,props.titleAndMenuShow);
</script>
  
<style lang="scss" scoped>
@import '../assets/styles/global.scss';

.menu-bar {
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    background-color: #D5BCA8;
    left: 0;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    z-index: 101;
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview{
        flex: 0 0 px2rem(48);
        @include center;
      }
      .select{
        display: flex;
        flex: 1;
        .select-wrapper{
          &:first-child{
            // background-color: red;
            .line{
              &:first-child{
                border-top: none;
              }
            }
          };
          &:last-child{
            .line{
              &:last-child{
                border-top:none;
              }
            }
          }
          flex:1;
          display: flex;
          align-items: center;
          .line{
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid rgb(65, 58, 58)
          }
          .point-wrapper{
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid rgb(65, 58, 58);
            position: relative;
            .point{
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-10);
              height: px2rem(20);
              width: px2rem(20);
              border-radius: 50%;
              background-color: white;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0,0,0,0.15);
              @include center;
              .small-point{
                height: px2rem(6);
                width: px2rem(6);
                border-radius: 50%;
                background-color: black;
              }
            }
          }
        }
      }
    }
    .setting-theme{
      height: px2rem(68);
      display: flex;
      z-index: 101;
      .setting-theme-item{
        flex: 1;
        display: flex;
        flex-direction: column;// 垂直分布
        padding: px2rem(5);
        box-sizing: border-box;
        .preview{
          flex: 1;
        }
        .text{
          flex: 0 0 px2rem(30);
          font-size: px2rem(16);
          color: #999;
          @include center
        }
        .selected{
          color: #333;
        }
      }
    }
    .setting-progress{
      display: flex;
      flex-direction: column;
      height: px2rem(68);
      width: 100%;
      .progress-wrapper{
        z-index: 101;
        height: 100%;
        width: 100%;
        @include center;
        padding: 0 px2rem(25);
        box-sizing: border-box;
        .progress{
          width: 100%;
          appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#999,#999) no-repeat, #ddd;
          background-size: 0 100%;
          &::-webkit-slider-thumb{
            appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background-color: white;
            box-sizing: 0 4px 4px 0 rgba(0,0,0,0.15);
            border: px2rem(1) solid #ddd
          }
        }
      }
      .text-wrapper{
        transform: translateY(-50%);
        flex: 0 0 px2rem(30);
        font-size: px2rem(16);
        @include center;
      }
    }
  }

  .menu-wrapper {
    position: absolute;
    bottom: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(48);
    background-color: #D5BCA8;

    display: flex;
    // 阴影
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);

    &.box-shadow-hide {
      box-shadow: none;
    }

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


  }
}
</style>