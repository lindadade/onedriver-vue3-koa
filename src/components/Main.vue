<template>
  <div>
	  <el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>
			  <span @click="handleSelect()">首页</span>
		  </el-breadcrumb-item>
		  <el-breadcrumb-item v-for="(value, index) in breadcrumbList">
			  <span @click="handleSelect()">{{value}}</span>
		  </el-breadcrumb-item>

	  </el-breadcrumb>
    <el-table
        v-loading="listLoading"
        :data="fileList"
        element-loading-text="Loading"
        fit
    >
      <el-table-column prop="name" label="文件名" min-width="220">
        <template slot-scope="{row}">
          <el-button type="text" @click="row.folder ? handleFolder(row) : handleDownLoad(row)">
            <img :src="row.name | iconFilter" class="item-icon">
            <span class="item-text">
              {{ row.name }}
            </span>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="大小" min-width="80" align="center">
        <template #default="{row}">
          <span>{{ row.size | sizeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" min-width="130px" align="center">
        <template #default="{row}">
          <span>{{ row.createdDateTime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改日期" min-width="130px" align="center">
        <template #default="{row}">
          <span>{{ row.lastModifiedDateTime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="" align="center">
        <template slot-scope="{row,$index}">
          <el-tooltip class="item" effect="dark" content="替换" placement="bottom-start">
            <el-button type="text"><i class="el-icon-download" @click="download(row.name)"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
            <el-button type="text"><i class="el-icon-delete" @click="del(row.name,$index)"></i></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import oneDriver from "@/api/oneDriver";
import {parseTime, fileSize, fileIcon} from '@/utils'

export default {
  name: "Main",
	props: {
		fileList: {
			type: Array,
			default: ()=> {
				return []
			}
		},
		listLoading: {
			type: Boolean,
			default: false
		}
	},
  filters: {
    timeFilter(value) {
      return parseTime(value, '')
    },
    sizeFilter(value) {
    	return fileSize(value)
    },
    iconFilter(value) {
	    return fileIcon(value)
    }
  },
  data() {
    return {
      total: 0,
      file: undefined,
	    breadcrumbList: []
    };
	},
  methods: {
    async handleFolder({id}) {
	    this.breadcrumbList = []
	    this.$emit('update:listLoading', true)
      const {data} = await oneDriver.getItemChild(id)
	    const breadcrumbMap = data.value[0].parentReference.path.split('/')
	    for (let i = 4; i < breadcrumbMap.length; i++) {
	    	this.breadcrumbList.push(decodeURIComponent(breadcrumbMap[i]))
	    }
	    this.$emit('update:fileList', data.value)
      this.total = data['@odata.count']
	    this.$emit('update:listLoading', false)
    },
    async openFile(data, name, fileType) {
      if (!data) {
        return this.$message.error('无文件数据，下载文件失败！');
      }
      let blob = new Blob([data.data], {type: fileType});
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      window.open(href)
    },
    async handleDownLoad({id, name}) {
      const loading = this.$loading({
        lock: true,
        text: `${name} 正在加载中...`,
        spinner: 'el-icon-loading',
        background: 'rgba(154, 190, 175, 0.7)'
      });
      const data = await oneDriver.downLoadItem(id)
      loading.close()
      await this.openFile(data, name, data.headers['content-type'])
    },
	  handleSelect() {
		  this.$emit('handleSelect')
	  }
  }
}
</script>

<style scoped>
.item-icon {
  display: inline-block;
  position: relative;
  top: -2px;
  height: 25px;
  width: 25px;
  margin-right: 8px;
}
.item-text {
  position: relative;
  top: -8px;
}
</style>
