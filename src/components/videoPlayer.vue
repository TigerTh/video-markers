<!--
 * @Description: 
 * @Author: 
 * @Date: 2021-09-06 19:27:54
 * @LastEditTime: 2021-09-06 19:32:11
 * @LastEditors: Tuohaohu
 * @Usage: 
-->
<template>
  <div id="player-wrap">
    <div id="player-vjs-wrap" :class="playerOffset ? 'offset' : ''">
      <video id="player" class="video-js vjs-big-play-centered vjs-16-9" controls playsinline webkit-playsinline x5-playsinline poster=""></video>
    </div>
    <div id="player-dialog" ref="playerDialog" :class="playerOffset ? 'flex' : ''" :style="liveCover">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerWrap',
  computed: {
  },
  watch: {
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
