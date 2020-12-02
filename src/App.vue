<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isShow"/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 控制router-view的隐藏与显示
      isShow: true
    }
  },
  provide() { // 提供可注入子组件属性
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() { // 定义加载方式
      // 先取消当前路由的视图展示，待dom重新渲染完毕，再让当前路由视图展示
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    }
  }
}
</script>

<style>
	#app {
		height: 100%;
	}
</style>
