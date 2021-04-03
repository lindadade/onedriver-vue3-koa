<template>
  <div style="height: 100%;">
    <div class="title-container">
      <span>林大大 - OneDriver网盘 ✨</span>
    </div>

    <div class="main-container">
      <el-card shadow="hover">
        <el-container>
          <el-aside >
            <div class="left-container">
	            <el-menu :default-active="firstIndex" class="el-menu-vertical-demo" @select="handleSelect" :loading="listLoading">
		            <div class="left-head">
			            图片
		            </div>
		            <el-menu-item v-for="(data, i) in list" :key="i" :index="data.id">
			            <i class="el-icon-menu"></i>
			            <span slot="title">{{data.name}}</span>
		            </el-menu-item>
	            </el-menu>
            </div>
          </el-aside>
          <el-container>
            <el-header>
	            <Header/>
            </el-header>
            <el-divider/>
            <el-main>
              <Main :listLoading.sync="listLoading" :fileList.sync="fileList" @handleSelect="handleSelect(activeIndex)"/>
            </el-main>
          </el-container>
        </el-container>
      </el-card>
    </div>
  </div>
</template>

<script>
import oneDriver from "@/api/oneDriver";
import Main from "@/components/Main"
import Header from "@/components/Header";

export default {
  components: {
    Main,
	  Header
  },
  data() {
    return {
    	firstIndex: '',
	    activeIndex: '',
	    list: [],
	    listLoading: false,
	    fileList: []
    };
  },
	async created() {
		await this.getList()
		await this.handleSelect(this.firstIndex)
	},
	methods: {
		/**
		 * @description 获取根列表
		 * @returns {Promise<void>}
		 */
		async getList() {
			const {data} = await oneDriver.getAppRoot()
			this.list = data.value
			this.firstIndex = this.list[0].id
		},
		async handleSelect(index) {
			this.activeIndex = index
			this.listLoading = true
			const {data} = await oneDriver.getItemChild(this.activeIndex)
			this.fileList = data.value
			this.listLoading = false
		}
	}
}
</script>

<style>
.title-container {
  padding-bottom: 1%;
  width: 100%;
  height: 100px;
  font-size: 34px;
  text-align: center;
  line-height: 100px;
  background: linear-gradient(90deg, #405B55, #ddd);
  -webkit-text-fill-color: white;
  -webkit-background-clip: text;
  -webkit-text-stroke: 5px transparent;
}

@keyframes text-blink-effect {
  50% {
    text-shadow: 0 0 .1em, 0 0 .3em;
  }
  to {
    text-shadow: 0 0 .1em;
  }
}

.main-container {
	height: 80%;
  padding: 0 13%;
}

.el-card {
	height: 100%;
	border: none;
}
.el-card__body {
  padding: 0;
	height: 100%;
}
.el-container {
	height: 100%;
}

.el-aside {
  background-color: #f6f6f6;
  max-width: 19%;
  height: 100%;
}

.el-main {
  height: calc(100% - 62px);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-divider--horizontal {
	margin: 10px 0;
}
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
