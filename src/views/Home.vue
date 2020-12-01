<template>
  <div>
    <div class="title-container">
      <span>林大大 - OneDriver网盘 ✨</span>
    </div>

    <div class="main-container">
      <el-card shadow="hover">
        <el-container>
          <el-aside >
            <div class="left-container">
              <Left/>
            </div>
          </el-aside>
          <el-container>
            <el-header>Header</el-header>
            <el-divider/>
            <el-main>
              <Main/>
            </el-main>
          </el-container>
        </el-container>
      </el-card>
    </div>
  </div>
</template>

<script>
import Left from '@/components/Left'
import Main from "@/components/Main"

export default {
  components: {
    Left,
    Main
  },
  data() {
    return {};
  },
  methods: {}
}
</script>

<style>
.title-container {
  padding-top: 50px;
  width: 100%;
  height: 120px;
  font-size: 30px;
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
  padding: 0 8%;
}

.el-card__body {
  padding: 0;
  height: 980px;
}

.el-aside {
  background-color: #f7f7f7;
  max-width: 244px;
  height: 980px;
}

.el-main {
  height: calc(100% - 62px);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
