<template>
	<div class="header-file">
		<el-button type="primary" @click="dialogVisible = true">
			上传
		</el-button>

		<el-dialog
			title="上传文件"
			:visible.sync="dialogVisible"
			width="400px">
			<el-upload
				class="upload-demo"
				drag
				action="#"
				:auto-upload="false"
				:on-change="upload"
				:on-exceed="exceedFile"
				:limit="1"
				multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">上传小文件不超过4MB</div>
			</el-upload>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import oneDriver from "../api/oneDriver";

export default {
	name: "Header",
	data() {
		return {
			dialogVisible: false
		}
	},
	methods: {
		async upload({name, raw}) {
			await oneDriver.insertItem()
		},
		exceedFile(files, fileList) {

		}
	}
}
</script>

<style scoped>
.header-file {
	position: relative;
	top: 30%;
}
</style>
