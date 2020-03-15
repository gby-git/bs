<template>
    <div id="container" class="mymap"></div>
</template>
<script>

import AMap from 'AMap';   //在页面中引入高德地图

export default {
    mounted(){
       this.loadmap();     //加载地图和相关组件
    },
    methods: {
      loadmap(){
        const map = new AMap.Map('container', {
        	resizeEnable: true,
        	center: [116.39,39.9],
          zoom: 9
        });
      }
    }
}
</script>
<style scoped lang="scss">
    .mymap{
      width: 100%;
      height: 100%;
    }
</style>