<template>
    <HelloWorld></HelloWorld>
    <span class="icon-back"></span>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
document.addEventListener('DOMContentLoaded',()=>{
    const html:HTMLElement = document.querySelector('html');
    let fontSize = window.innerWidth/10;
    fontSize = fontSize > 40?40:fontSize;
    console.log(fontSize)
    html.style.fontSize = fontSize + 'px';
})
</script>

<style>
</style>