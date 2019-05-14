<template>
  <div class="index">
    <v-head></v-head>
    <left-menu></left-menu>
    <div class="rightContainer">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import LeftMenu from '@/components/left-menu'
import VHead from '@/components/head'
export default {
  name: 'index',
  components: {
    VHead,
    LeftMenu
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 201px;
  width: calc(100% - 201px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>
