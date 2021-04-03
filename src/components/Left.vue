<template>
  <div>
    <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
      <div class="left-head">
        图片
      </div>
      <el-menu-item v-for="(data, i) in list" :key="i" :index="''+i">
        <i class="el-icon-menu"></i>
        <span slot="title">{{data.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import oneDriver from "@/api/oneDriver";
export default {
  name: "Left",
  data() {
    return {
	    list: [],
    }
  },
	async created() {
		await this.getList()
	},
	methods: {
		/**
		 * @description 获取根列表
		 * @returns {Promise<void>}
		 */
		async getList() {
			const {data} = await oneDriver.getAppRoot()
			this.list = data.value
		},
		async handleSelect() {
			const {data} = await oneDriver.getItemChild(id)
			this.list = data.value
		}
	}
}
</script>

<style scoped>
.el-menu {
  border: 0px;
  background-color: #f6f6f6;
}
.left-head {
  height: 120px;
  line-height: 120px;
  font-size: 30px;
  text-align: center;
}
.is-active {
	background-color: #e5e5e5;
}
</style>
