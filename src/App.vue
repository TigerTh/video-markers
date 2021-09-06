<!--
 * @Description: 
 * @Author: 
 * @Date: 2021-09-06 19:48:34
 * @LastEditTime: 2021-09-06 20:49:51
 * @LastEditors: Tuohaohu
 * @Usage: 
-->
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <VideoPlayer />
  </div>
</template>

<script>
import VideoPlayer from './components/VideoPlayer.vue'

export default {
  name: 'App',
  components: {
    VideoPlayer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
