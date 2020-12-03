<template>
  <div>
    <el-button plain @click="login('gitee')">Gitee登陆</el-button>
    <el-button plain @click="login('oneDrive')">OneDrive登陆</el-button>
  </div>
</template>

<script>
import user from "@/api/user";

export default {
  name: "index",
  async created() {
    if (window.location.search.includes('token')) {
      await this.$store.dispatch('user/login', window.location.search.replace('?token=', ''))
      window.location.href = `${window.location.origin}#${this.$store.getters.redirect}`
    }
  },
  methods: {
    async login(status) {
      const {data} = await user.login({status})
      location.href = data;
    }
  }
}
</script>

<style scoped>

</style>
