<template>
  <div class="fund-list">fund-list</div>
</template>

<script>
import ProfileServer from '@/server/profile'
const profileServer = new ProfileServer()
export default {
  name: 'fund-list',
  mounted () {
    this.loadFundList()
  },
  methods: {
    loadFundList () {
      profileServer.getProfileList()
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style>

</style>
