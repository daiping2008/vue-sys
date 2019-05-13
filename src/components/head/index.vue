<template>
  <header class="header">
    <el-row>
      <el-col :span='12'>
        <img class="logo" alt='' src='../../assets/img/logo.png' />
        <span class="title">在线后台管理系统</span>
      </el-col>
      <el-col :span='12'>
        <div class="userinfo">
          <img class="avatar" src='' alt=''/>
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class='name avatarname'>Susan</p>
          </div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">用户信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'head-nav',
  methods: {
    ...mapActions(['setIsAutnenticated', 'setUser']),
    handleCommand (command) {
      if (command === 'logout') {
        window.localStorage.removeItem('token')
        this.setIsAutnenticated(false)
        this.setUser({})
        this.$router.push({ name: 'login' })
      }

      if (command === 'userinfo') {}
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: 60px;
  line-height: 60px;
  min-width: 600px;
  padding: 5px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo{
  width: 50px;
  height: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title{
  font-size: 22px;
  vertical-align: middle;
  letter-spacing: 3px;
}
.userinfo{
  float: right;
  padding-right: 10px;
}
.welcome{
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
  .name{
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .comename{
    font-size: 12px;
  }
  .avatarname{
    color: #409eff;
    font-weight: bold;
  }
}
.el-dropdown-link{
  color:#fff;
  cursor: pointer;
}
</style>
