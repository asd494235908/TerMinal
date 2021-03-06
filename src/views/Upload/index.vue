<template>
  <div class="upload-warp" v-loading="loading"  element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-upload
      class="upload-demo"
      drag
      :action="action"
      :on-preview="onpreview"
      :on-remove="onremove"
      :on-success="onsuccess"
      :on-error="onerror"
      :on-progress="onprogress"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: "https://www.dcmaomi.com:3010/api/upload",
      // action: "http://192.168.2.202:3010/api/upload",
      load: null,
      timer: null,
      uptimer: null,
      loading:false
    };
  },
  methods: {
    onpreview() {
      // console.log("点击文件列表中已上传的文件时的钩子");
    },
    onremove() {
      // console.log("文件列表移除文件时的钩子");
    },
    onsuccess() {
      // console.log("文件上传成功时的钩子");
      this.loading =false
    },
    onerror() {
      // console.log("文件上传失败时的钩子");
      this.loading =false
    },
    onprogress() {
      // console.log("文件上传时的钩子");
      this.loading =true
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-warp {
  padding: 2% 5%;
  width: 100%;
  height: 100%;
  overflow: auto;
  .upload-demo {
    width: 100%;
    height: 100%;
  }
}
</style>