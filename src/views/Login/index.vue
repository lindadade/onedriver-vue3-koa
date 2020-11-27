<template>
  <div>
    <el-button plain @click="login">Gitee登陆</el-button>
  </div>
</template>

<script>
import user from "@/api/user";

export default {
  name: "index",
  created() {
    if (window.location.search.includes('token')) {
      console.log(window.location.search.replace('?token=', ''))
      this.$store.dispatch('user/login', window.location.search.replace('?token=', ''))
    }
  },
  methods: {
    async login() {
      const path = 'http://localhost:2020' + this.$route.fullPath
      const {path: data} = await user.login({path})
      console.log(data)
      window.location.href = data;
    }
  }
}
</script>

<style scoped>

</style>
