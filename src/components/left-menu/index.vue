<template>
  <nav class="left-menu">
    <el-row>
      <el-col :span="12">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <router-link to='/home'>
            <el-menu-item
              index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
          <template v-for="v in leftMenu">
            <el-submenu
              :index="v.path"
              :key="v.path"
            >
              <template slot="title">
                <i :class="v.icon"></i>
                <span>{{v.name}}</span>
              </template>
              <router-link v-for="i in v.children" :key="i.path" :to="i.path">
                <el-menu-item-group>
                  <el-menu-item index="1-1">{{i.name}}</el-menu-item>
                </el-menu-item-group>
              </router-link>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </nav>
</template>

<script>
export default {
  name: 'left-menu',
  data () {
    return {
      leftMenu: [
        {
          icon: 'el-icon-s-order',
          name: '资金管理',
          path: 'fund',
          children: [{ path: 'fundlist', name: '资金流水' }]
        },
        {
          icon: 'el-icon-s-custom',
          name: '信息管理',
          path: 'info',
          children: [{ path: 'infoshow', name: '个人信息' }]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.left-menu{
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu-vertical-demo{
  min-width: 201px;
}
.el-menu-vertical-demo.el-menu {
  border: none;
}
</style>
