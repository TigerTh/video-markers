<!--
 * @Description: 
 * @Author: 
 * @Date: 2021-09-06 19:48:34
 * @LastEditTime: 2021-09-09 15:22:04
 * @LastEditors: Tuohaohu
 * @Usage: 
-->
<template>
  <div class="container-wrap">
    <div class="left-region" ref="leftRegion">
      <div class="video-region" ref="videoRegion">
        <video  id="player" ref='playerRef' class="video-js vjs-big-play-centered vjs-16-9" controls playsinline webkit-playsinline x5-playsinline>
        </video>
      </div>
      <div class="control-bar" ref="controlBar">
        <p>
          <button @click="OnGoToPrev" class="btn-primary">上一个</button>&nbsp&nbsp
          <button @click="OnGoToNext" class="btn-primary">下一个</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
          <button @click="OnAddMarker" class="btn-primary">增加标记</button>&nbsp&nbsp
          <button @click="OnEditCurMarker" class="btn-primary"> 编辑当前标记</button>&nbsp&nbsp
          <button @click="OnDeleteCurMarker" class="btn-delete">删除当前标记</button>&nbsp&nbsp
          <button @click="OnDeleteAllMarker" class="btn-delete">删除所有标记</button>
          <span>
            <span class="marker-count-limit">最大限制数量：</span>
            <input type="number" min="0" max="50" v-model="markerCountLimit">
            <span class="marker-count-limit-tips">Tips:最多50个</span>
          </span>
        </p>
      </div>
    </div>
    <div class="right-list"  >
      <p class="list-title"><b>标记列表</b></p>
      <ul class="marker-list">
        <li v-for="(item,index) in markerList" :class="{'curent-marker-li':index==curIndex}" :key="item.time" @click="ClickToGoToSelMarker(item,index)">
          <p class="item-index">{{index+1}}</p>
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
    <!-- 弹窗 -->
    <div id="myModal" class="modal" v-if="dialogShow">

      <!-- 弹窗内容 -->
      <div class="modal-content">
        <div class="dialog-header">        
          <span style="float:left">
            <b>{{opeMode==1?"添加描述":"编辑描述"}}</b>
          </span>
          <span class="close" @click="OnClose">&times;</span>
        </div>
        <div class="content">
          <textarea  class="content-textarea" v-model="markerDes" style="resize: none;" placeholder="请添加描述信息">
          </textarea>
          <div class="des-length-limit">
            <i><span>{{markerDes.length+"/50"}}</span></i>
          </div>
        </div>
        <div class="footer">
          <button  @click="OnClose">取消</button>&nbsp&nbsp
          <button  @click="OnConfirm" class="btn-primary">确定</button>&nbsp&nbsp
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  data:function (){
    return{
      player:null,
      markerList:[],
      dialogShow:false,
      markerDes:'',
      curIndex:null,
      opeMode:1,
      markerCountLimit:5
    }
  },
  mounted(){
    window.onresize = this.resetLayout;
    this.resetLayout()
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
              currentTimeDisplay: false,
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
      //创建标记对象
      var _this =this
      this.player.markers({
          markerTip:{
            display: true,
            text: function(marker) {
              return marker.text;
            },
            time: function(marker) {
              return marker.time;
            }
        },
        markers: [
          {time: 9.5, text: "截至目前，全国高风险地区清零，中风险地区下降到3个。"},
          {time: 26,  text: "要对高风险工作人员严格落实个人防护要求和封闭管理，对高风险环境和物品进行严格消毒，坚决做到闭环管理。"},
          {time: 43.6,text: "截止到9月6号，全国累计报告接种新冠疫苗211308万剂次，覆盖全国总人口的77.6%。"},
          {time: 66,  text: "3款已获得国家药监局Ⅰ、Ⅱ期临床试验批准，进展总体顺利"}
        ],
        onMarkerClick: function(marker) {
        },
        onMarkerReached: function(marker,index) {
          _this.curIndex = index
          var markers= _this.player.markers.getMarkers()
          var newMarkers=[]
          markers.forEach(el=>{
            let tmpObj={}
            tmpObj.time = el.time
            tmpObj.text = el.text
            if(el.class && el.class.indexOf('current-marker-class') && el.time !==marker.time){
              let idx = el.class.indexOf('current-marker-class')
              tmpObj.class = el.class.substr(0,idx);
            }
            else if(el.time ==marker.time ){
              tmpObj.class = el.class?el.class+" current-marker-class": 'current-marker-class'
            }
            newMarkers.push(tmpObj)
          })
          console.log(`--------${this.curIndex}`);
           _this.player.markers.removeAll();
           _this.player.markers.add(newMarkers)
        },
      }),
      this.markerList = this.player.markers.getMarkers()
  },

  computed: {
  },
  watch: {
    markerDes(nVal,oVal){
      if(nVal.length>50){
        this.markerDes=nVal.substring(0,50);
      }
    },
    markerCountLimit(nVal){
      if(nVal>50){
        this.markerCountLimit=50
      }
    }
  },
  methods: {
    // 点击 <span> (x), 关闭弹窗
    OnClose:function() {
      this.markerDes=''
      this.dialogShow=false
      this.player.play()
    },
    OnGoToPrev: function() {
      // this.player.markers.prev();
      if(this.curIndex > 0){
        var markers= this.player.markers.getMarkers()
        let curMarker=markers[this.curIndex-1]
        this.player.currentTime(curMarker.time);
      }
    },
    OnGoToNext: function() {
      this.player.markers.next();
    },
    OnAddMarker: function() {
      this.player.pause()
      if(this.player.markers.getMarkers().length>=this.markerCountLimit){
          alert('标记数已达最大限制，请先删除部分标记再尝试添加')
          this.player.play()
          return
      }
      this.opeMode=1 //2为编辑，1为添加
      this.markerDes=''
      this.dialogShow=true
    },
    OnEditCurMarker: function() {
        this.player.pause()
        if(this.curIndex ==null){
          alert('请先选择要编辑的标记点')
          this.player.play()
          return
        }else {
        this.opeMode=2 //2为编辑，1为添加
        this.dialogShow=true
        let markerList = this.player.markers.getMarkers()
        this.markerDes = markerList[this.curIndex].text
      }
    },
    OnDeleteCurMarker: function() {
        this.player.pause()
        if(this.curIndex ==null){
          alert('请先选择要删除的标记点')
          this.player.play()
          return
        }
      	var r=confirm("删除后将不可恢复，确认删除当前标记吗!");
        if (r==true && this.curIndex !=null && this.curIndex>=0){
          this.player.markers.remove([this.curIndex ]);
        }
        this.player.play()
    },
    OnDeleteAllMarker: function() {
        this.player.pause()
      	var r=confirm("删除后将不可恢复，确认删除所有标记吗!");
        if (r==true){
          this.player.markers.removeAll();
        }
        this.player.play()
    },
    OnConfirm: function(){
      if(this.opeMode ==1){
        this.player.markers.add([{
          time: this.player.currentTime(),
          text: this.markerDes,
        }]);
      }else if(this.opeMode ==2){
        let markerList = this.player.markers.getMarkers()
        markerList[this.curIndex].text=this.markerDes
      }

      this.OnClose()
    },
    ClickToGoToSelMarker(item,index){
      this.player.currentTime(item.time);
    },
    resetLayout(){
      var w = this.$refs.leftRegion.offsetWidth;
      var h = this.$refs.leftRegion.offsetHeight - 57; //48为底部固定高度
      if (w / h <= 16 / 9) {
        // video 默认宽高比例 16:9
        h = (w / 16) * 9;
      } else {
        w = (h / 9) * 16;
      }
      // 重置宽度
      this.$refs.videoRegion.style.width=w +'px';
      this.$refs.videoRegion.style.height=h +'px' ;
    }
  }
};
</script>

<style  scoped>
.container-wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height:100%;
  min-width: 1467px;
  min-height: 600px;
  position: relative;
  /* background-color: rgb(255, 255, 255); */
  border:2px dashed #252525;
  border-radius:5px ;
  padding: 20px;
}
.left-region{
  flex:auto;
  display: flex;
  justify-self: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}
.video-region{
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 640px;
  min-height: 480px;
  /* width: 1280px;
  height: 960px; */
}

/* 弹窗 (background) */
.modal {
    position: fixed; /* 固定定位 */
    z-index: 1; /* 设置在顶层 */
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%;
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
}

/* 弹窗内容 */
.modal-content {
  position: relative;
  top: 50%;
  left: 45%;
  transform: translate(-50%,-50%);
  background-color: #fefefe; 
  border: 1px solid #888;
  width: 600px; 
  display: flex;
  flex-direction: column;
}

/* 关闭按钮 */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.dialog-header{
   height: 30px; 
   padding:10px ;
}
.content{
   padding:10px ;
}
.content-textarea{
    width:   500px;
    height:   100px;
    max-width:   500px;
    max-height:   100px;
    padding: 20px;
}
.footer{
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding:10px ;
}
.des-length-limit{
  position: absolute;
  top: 180px;
  right:40px
}

.right-list{
  min-width: 300px;
  width: 300px;
  height: 100%;
  background-color: #4b4b4b;
  border: 1px solid #252525;
  border-radius:5px ;
}
.list-title{
  color: white;
}
.marker-list{
  list-style-type: none;
  text-align: left;
  padding: 0px 5px 20px;
  border-radius:5px ;
}
.marker-list li{
  padding: 10px 10px;
  background-color: rgb(255, 255, 255);
  border-radius:8px ;
  /* border:2px solid rgb(4, 57, 61); */
  cursor: pointer;
  display: flex;
  align-items: center;
}
.item-index{
  flex: none;
  background-color: #06c48a;
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: #ffffff;
  text-align: center;
  border-radius: 50%;
  margin-right: 10px;
}
.marker-list li:hover{
  background-color: rgb(185, 185, 185);
  cursor: pointer;
}
.curent-marker-li{
    /* border:2px solid rgb(236, 10, 10) !important; */
    background-color: #9d9c9d !important;
    color: rgb(255, 255, 255);
}

button{
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
}
.btn-primary{
  background-color: #009265;
  color: #fefefe;
}
.btn-delete{
  background-color: #f51010;
  color: #fefefe;
}
input{                 
   border: 1px solid #ccc;                  
   padding: 4px 0px;                 
   border-radius: 3px; /*css3属性IE不支持*/                 
   padding-left:5px; 
}
input:focus{ 
  outline: none;
}
.marker-count-limit{
  margin-left: 200px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]{
  -moz-appearance: textfield;
}
.marker-count-limit-tips{
  font-size: 12px;
  color: #d5b20f;
}
.control-bar p{
  margin:20px 0 0 0;

}
</style>
