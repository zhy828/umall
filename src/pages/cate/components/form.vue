<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder="--请选择--">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="form.pid!=0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title == '添加分类'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入文件后缀名，固定的
import path from 'path'
import { mapGetters, mapActions } from "vuex";
import {reqRoleList,reqCateAdd,reqCateDetail,reqCateUpdate,reqCateList} from '../../../utils/http'
import {successAlert,errorAlert} from '../../../utils/alert'
export default {
    props:["info"],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: null,
        status,
      },
      imgUrl:""
    };
  },
  computed: {
    ...mapGetters({
        cateList: "cate/list"
    }),
    
  },
  methods: {
    ...mapActions({
        reqList:"cate/reqList"
    }),
    //选择了文件
    changeFile(e){
        let file=e.target.files[0]
        //判断文件大小 file.size B ，1M=1024KB 1KB=1024B
        if(file.size>2*1024*1024){
            errorAlert("文件太小不能超过2M")
            return
        }

        //判断文件类型
        let extname=path.extname(file.name)
        let arr=[".jpg",".jpeg",".png",".gif"]
        if(!arr.includes(extname)){
            errorAlert("请上传正确的图片格式！")
            return
        }

        //URL.createObjectURL(file)将一个文件生成一个URL地址
        this.imgUrl=URL.createObjectURL(file)

        //给form.img赋值
        this.form.img=file

    },
    //ui库的上传文件
    changeFile2(e){
        let file=e.raw
        this.imgUrl=URL.createObjectURL(file)
        this.form.img=file
    },
    cancel(){
        this.info.isshow=false
    },
    empty(){
        this.form={
            pid:"",
            catename:"",
            img:null,
            status:1
        }
        this.imgUrl=""
    },
    add(){
        reqCateAdd(this.form).then(res=>{
            console.log(12222);
            if(res.data.code==200){
                successAlert("添加成功")
                this.cancel()
                this.empty()
                //刷新list
                this.reqList()
            }
        })
    },
    //获取详情
    getOne(id){
        reqCateDetail(id).then(res=>{
            this.form=res.data.list
            this.imgUrl=this.$imgPre+this.form.img
            this.form.id=id
        })
    },
    update(){
        reqCateUpdate(this.form).then(res=>{
            if(res.data.code==200){
                successAlert("修改成功")
                this.cancel()
                this.empty()
                this.reqList()
            }
        })
    },
    closed(){
        if(this.info.title==="编辑分类"){
            this.empty()
        }
    }
  },
  mounted() {
      reqCateList().then(res=>{
          if(res.data.code==200){
              this.roleList=res.data.list
          }
      })
  },
};
</script>

<style scoped lang="stylus">
    .myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}
.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}
.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

   /* 穿透 */
 .add >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>