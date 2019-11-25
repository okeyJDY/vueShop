<template>
  <div class="home">
    <button @click="logout">退出</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scope>
</style>