<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
import user from "@/api/user";

export default {
  name: 'Home',
  data(){
    return {

    }
  },
  async created() {
    console.log('aaaaaaaa', this.$route)
    const value =  {
      ...this.$route.params
    }
    console.log(value)
    const data = await user.getToken(value)
    console.log(data)
  }
}
</script>
