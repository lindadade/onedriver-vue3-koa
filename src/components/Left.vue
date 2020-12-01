<template>
  <div>
    <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect" >
      <div class="left-head">
        图片
      </div>
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">全部</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Left",
  data() {
    return {

    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>

<style scoped>
.el-menu {
  border: 0px;
  background-color: #f7f7f7;
}
.left-head {
  height: 120px;
  line-height: 120px;
  font-size: 30px;
  text-align: center;
}
</style>
