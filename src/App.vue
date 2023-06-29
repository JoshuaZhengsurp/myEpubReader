<template>
    <!-- <HelloWorld></HelloWorld> -->
    <router-view></router-view>
</template>

<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue';
document.addEventListener('DOMContentLoaded',()=>{
    const html:HTMLElement = document.querySelector('html') as HTMLElement;
    let fontSize = window.innerWidth/10;
    fontSize = fontSize > 40?40:fontSize;
    console.log(fontSize)
    html.style.fontSize = fontSize + 'px';
})
</script>

<style>
</style>