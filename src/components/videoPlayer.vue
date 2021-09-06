<!--
 * @Description: 
 * @Author: 
 * @Date: 2021-09-06 19:48:34
 * @LastEditTime: 2021-09-06 21:14:11
 * @LastEditors: Tuohaohu
 * @Usage: 
-->
<template>
  <div class="container-wrap">
    <div class="left-region">
      <div class="video-region">
        <video  id="player" ref='playerRef' class="video-js vjs-big-play-centered vjs-16-9" controls playsinline webkit-playsinline x5-playsinline>
        </video>
      </div>
      <div class="control-bar">
        <button>增加打点</button>
        <button>删除打点</button>
        <p>描述信息</p>
      </div>
    </div>
    <div class="right-list"  >
      <ul class="marker-list">
        <li v-for="item in markerList" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  data:function (){
    return{
      player:null,
      markerList:[]
    }
  },
  mounted(){
    
    this.player=videojs( this.$refs.playerRef,{
        autoplay: true,
        controls: true,
        playbackRates: [1, 1.25, 1.5, 2, 3],
        children: {
          mediaLoader: true,
          posterImage: true,
          loadingSpinner: true,
          bigPlayButton: true,
          controlBar: {
            children: {
              playToggle: true,
              currentTimeDisplay: true,
              timeDivider: true,
              durationDisplay: true,
              progressControl: true,
              liveDisplay: true,
              customControlSpacer: true,
              volumePanel: { inline: false },
              playbackRateMenuButton: true,
              fullscreenToggle: true
            }
          },
          errorDisplay: false
        },
        sources: [
          {
            src:
              'https://1255382607.vod2.myqcloud.com/34dfe629vodcq1255382607/f1b27cee5285890814404920668/f0.mp4',
            type: 'video/mp4'
          }
        ]
        },
         function onPlayerReady () {
      })
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
};
</script>

<style scoped>
.container-wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: dimgray;
}
.left-region{
  flex:auto;
}
.video-region{
  min-width: 640px;
  min-height: 480px;
}
.right-list{
  width: 300px;
  height: 100%;
  background-color: bisque;
}
</style>
