<template>
  <div>
    <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        fit
    >
      <el-table-column prop="name" label="文件名" min-width="220">
        <template slot-scope="{row}">
          <!-- :disabled="row.folder && !row.folder.childCount"-->
          <el-button type="text" @click="row.folder ? handleFolder(row) : handleDownLoad(row)">
            <img src="../assets/itemLogo/folder.svg" class="item-icon">
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
      <el-table-column label="创建日期" min-width="105" align="center">
        <template #default="{row}">
          <span>{{ row.createdDateTime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改日期" min-width="105" align="center">
        <template #default="{row}">
          <span>{{ row.lastModifiedDateTime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="" align="center">
        <template slot-scope="{row,$index}">
          <el-tooltip class="item" effect="dark" content="下载" placement="bottom-start">
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
import {parseTime} from '@/utils'

export default {
  name: "Main",
  filters: {
    timeFilter(value) {
      return parseTime(value, '')
    },
    sizeFilter(limit) {
      let size = "";
      if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
        size = limit.toFixed(2) + " B"
      }else if(limit < 0.1 * 1024 * 1024){            //小于0.1MB，则转化成KB
        size = (limit/1024).toFixed(2) + " KB"
      }else if(limit < 0.1 * 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
        size = (limit/(1024 * 1024)).toFixed(2) + " MB"
      }else{                                            //其他转化成GB
        size = (limit/(1024 * 1024 * 1024)).toFixed(2) + " GB"
      }
      const sizeStr = size + ""
      const index = sizeStr.indexOf(".");                    //获取小数点处的索引
      const dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
      if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
      }
      return size;
    }
  },
  data() {
    return {
      total: 0,
      list: [],
      listLoading: false,
      file: undefined
    };
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
      this.listLoading = true
      const {data} = await oneDriver.getAppRoot()
      this.list = data.value
      this.total = data['@odata.count']
      this.listLoading = false
    },
    async handleFolder({id}) {
      this.listLoading = true
      const {data} = await oneDriver.getItemChild(id)
      this.list = data.value
      this.total = data['@odata.count']
      this.listLoading = false
    },
    async openFile(data, name, fileType) {
      console.log(data, name)
      if (!data) {
        return this.$message.error('无文件数据，下载文件失败！');
      }
      let blob = new Blob([data.data], {type: fileType});
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      const win = window.open(href)
    },
    async handleDownLoad({id, name}) {
      const loading = this.$loading({
        lock: true,
        text: `${name} 正在加载中...`,
        spinner: 'el-icon-loading',
        background: 'rgba(154, 190, 175, 0.7)'
      });
      const data = await oneDriver.downLoadItem(id)
      console.log(data)
      loading.close()
      await this.openFile(data, name, data.headers['content-type'])
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
