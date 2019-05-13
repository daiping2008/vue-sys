<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import jwtDecode from 'jwt-decode'
import { isEmpty } from '@/utils/tools'
export default {
  name: 'app',
  created () {
    const token = window.localStorage.getItem('token')
    const user = jwtDecode(token)
    this.setIsAutnenticated(!isEmpty(user))
    this.setUser(user)
  },
  methods: {
    ...mapActions(['setIsAutnenticated', 'setUser'])
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
