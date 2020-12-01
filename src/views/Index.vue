<template>
  <div class="app-main">
    <div class="main">
      <el-card shadow="hover" class="card">
        <div class="title">
          DEMO
        </div>
        <div class="tip">
          {{ tip }}
        </div>
        <div class="tabs">
          <el-button plain @click="clickIndex">首页</el-button><el-divider direction="vertical" />
          <el-button plain @click="clickMajor">所有专业</el-button><el-divider direction="vertical" />
          <el-button plain @click="clickCourses">所有课程</el-button><el-divider direction="vertical" />
          <el-button plain @click="clickClass">所有班级</el-button>
        </div>
        <div v-if="clickStatus === 'index' || clickStatus === 'student'" class="query">
          <el-input placeholder="请输入学号或姓名" clearable style="width: 220px; margin-right: 5px;" />
          <el-button type="primary" icon="el-icon-search" plain @click="queryStudent">搜索</el-button>
        </div>

        <div v-if="clickStatus !== 'index' && clickStatus !== 'task'">
          <el-divider><i class="el-icon-star-off"></i></el-divider>
          <el-table
              :data="list"
              border
              style="width: 100%">

            <template v-if="clickStatus === 'student'">
              <el-table-column prop="1" label="学号" min-width="120" align="center" />
              <el-table-column prop="2" label="姓名" min-width="120" align="center" />
              <el-table-column prop="3" label="班级" min-width="160" align="center" />
              <el-table-column prop="4" label="专业" min-width="140" align="center" />
              <el-table-column key="1" label="操作" min-width="100" align="center">
                <template #default="{row}">
                  <el-button size="small" type="primary" plain @click="queryTask">查看任务</el-button>
                </template>
              </el-table-column>
            </template>

            <template v-else-if="clickStatus === 'major'">
              <el-table-column prop="code" label="专业代码" min-width="130" align="center" />
              <el-table-column prop="name" label="专业名称" min-width="120" align="center" />
              <el-table-column key="2" label="操作" min-width="100" align="center">
                <template #default="{row}">
                  <el-button size="small" type="primary" plain @click="queryClasses">查看所有班级</el-button>
                </template>
              </el-table-column>
            </template>

            <template v-else-if="clickStatus === 'class'">
              <el-table-column prop="code" label="班级姓名" min-width="130" align="center" />
              <el-table-column prop="name" label="所属专业" min-width="120" align="center" />
              <el-table-column key="3" label="操作" min-width="100" align="center">
                <template #default="{row}">
                  <el-button size="small" type="primary" plain @click="queryStudent">查看所有学生</el-button>
                </template>
              </el-table-column>
            </template>

            <template v-else-if="clickStatus === 'course'">
              <el-table-column prop="1" label="课程代码" min-width="80" align="center" />
              <el-table-column prop="2" label="课程名称" min-width="100" align="center" />
              <el-table-column prop="3" label="年级" min-width="80" align="center" />
              <el-table-column prop="4" label="开课学期" min-width="80" align="center" />
              <el-table-column prop="5" label="学分" min-width="60" align="center" />
              <el-table-column prop="6" label="学时" min-width="60" align="center" />
              <el-table-column prop="7" label="专业" min-width="80" align="center" />
              <el-table-column key="4" label="操作" min-width="100" align="center">
                <template #default="{row}">
                  <el-button size="small" type="primary" plain @click="queryTask">查看任务</el-button>
                </template>
              </el-table-column>
            </template>

            <template v-else-if="clickStatus === 'record'">
              <el-table-column prop="1" label="学生" min-width="120" align="center" />
              <el-table-column prop="2" label="所属班级" min-width="120" align="center" />
              <el-table-column prop="3" label="日期" min-width="160" align="center" />
              <el-table-column prop="4" label="评分" min-width="140" align="center" />
              <el-table-column key="5" label="操作" min-width="100" align="center">
                <template #default="{row}">
                  <el-button size="small" type="primary" plain @click="updateRecord">评分</el-button>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>

        <div class="task-card" v-else-if="clickStatus === 'task'">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <el-button style="font-size: 14px; float: right; padding: 2% 0" type="text" @click="queryRecord">查看学生完成情况</el-button>
              <div class="task-title">XXXXXXXXXXXXX</div>
              <div class="task-date">xxx年xxx月xx日</div>
            </div>
            <div class="text item task-content">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
export default {
name: "index",
  data() {
    return {
      tip: 'INDEX',
      clickStatus: 'index',
      list: [],
      taskList: []
    }
  },
  methods: {
    init(status) {
      this.list = []
      this.taskList = []
      switch (status) {
        case 'index':
          this.tip = 'INDEX'
          this.clickStatus = 'index'
          break;
        case 'major':
          this.tip = 'ALL MAJORS'
          this.clickStatus = 'major'
          break;
        case 'class':
          this.tip = 'ALL CLASSES'
          this.clickStatus = 'class'
          break;
        case 'student':
          this.tip = 'ALL STUDENT'
          this.clickStatus = 'student'
          break;
        case 'course':
          this.tip = 'ALL COURSES'
          this.clickStatus = 'course'
          break;
        case 'task':
          this.clickStatus = 'task'
          this.tip = 'THIS ALL TASKS'
          break;
        case 'record':
          this.clickStatus = 'record'
          this.tip = 'ALL RECORDS'
          break;
      }
    },
    clickIndex() {
      this.init('index')
      this.list = []
    },
    clickMajor() {
      this.init('major')
      this.list = [
        {
          code: '123',
          name: '软件工程'
        },
        {
          code: '123',
          name: '软件工程'
        },
        {
          code: '123',
          name: '软件工程'
        },
        {
          code: '123',
          name: '软件工程'
        }
      ]
    },
    clickClass() {
      this.init('class')
      this.list = [
        {
          code: '18软件工程3-3班',
          name: '软件技术（001）'
        },
        {
          code: '18软件工程3-3班',
          name: '软件技术（001）'
        },
        {
          code: '18软件工程3-3班',
          name: '软件技术（001）'
        }
      ]
    },
    clickCourses() {
      this.init('course')
      this.list = [
        {
          1: '12321312',
          2: '123',
          3: '123',
          4: '123',
          5: '123',
          6: '123',
          7: '123',
        }
      ]
    },
    queryClasses() {
      this.init('class')
      this.list = [
        {
          code: '18软件工程3-3班',
          name: '软件技术（001）'
        },
        {
          code: '18软件工程3-3班',
          name: '软件技术（001）'
        },
        {
          code: '18软件工程3-3班',
          name: '软件技术（001）'
        }
      ]
    },
    queryStudent() {
      this.init('student')
      this.list = [
        {
          1: '18192803',
          2: '张三',
          3: '18软件工程3-3班',
          4: '软件技术（001）'
        },
        {
          1: '18192803',
          2: '张三',
          3: '18软件工程3-3班',
          4: '软件技术（001）'
        }
      ]
    },
    queryTask() {
      this.init('task')
    },
    queryRecord() {
      this.init('record')
      this.list = [
        {
          1: '18192803',
          2: '张三',
          3: '18软件工程3-3班',
          4: '12'
        },
        {
          1: '18192803',
          2: '张三',
          3: '18软件工程3-3班',
          4: '32'
        }
      ]
    },
    updateRecord() {
      this.$prompt('请输入评分', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '数据格式不正确'
      }).then(({ value }) => {

        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  }
}
</script>

<style scoped>
  .app-main {
    display: flex;
    display: -webkit-flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .main {
    position: absolute;
    top: 15%;
  }
  .card {
    padding: 70px 30px;
    width: 700px;
    height: 100%;
    box-shadow: 0 2px 12px 0 rgba(245, 150, 170, 0.6)
  }
  .title {
    width: 4em;
    height: 40px;
    font-size: 50px;
    margin: 0px auto 20px auto;
  }
  .tip {
    width: 100%;
    height: 40px;
    font-size: 30px;
    margin: 60px auto;
  }
  .tabs {
    margin-bottom: 40px;
  }
  .task-card {
    margin: 0 auto;
    width: 70%;
    text-align: justify;
  }
  .task-content {
    width: 50%;
    height: 70%;
    margin: 0 auto;
  }
</style>
