<template>
  <div class="info-show">
    <el-row class="row-bg" justify="center">
      <el-col :span="12">头像该功能暂时没实现</el-col>
      <el-col class="userinfo" :span="12">
        <div>
          <i class="el-icon-user-solid"></i>
          {{user.username}}
        </div>
        <div>
          <i class="el-icon-info"></i>
          {{user.identity===1?'管理员':'普通员工'}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'info-show',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss" scoped>
.info-show {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.userinfo{
  height: 100%;
  background-color: #eee;
  font-size: 28px;
  color: #444;
  & > div {
    position: relative;
    top: 30%;
    padding: 28px;
  }
}
</style>
