<template>
    <div>
        <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="banner" :rules="rules">
        <el-form-item label="标题" label-width="120px" prop="title">
          <el-input v-model="banner.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <!-- 上传文件 -->
          <div class="myupload">
            <h3>+</h3>
            <img :src="imgUrl" alt="/" class="img" v-if="imgUrl">
            <input type="file" v-if="info.isshow" class="ipt" @change="changeFile">
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="banner.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加轮播图'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {errorAlert, successAlert} from '../../../utils/alert'
import {reqBannerDetail,reqBannerAdd,reqBannerUpdate} from '../../../utils/http'
export default {
    props:["info"],
    data(){
        return {
            rules:{
                title: [{ required: true, message: "请输入标题", trigger: "blur" }]
            },
            banner:{
                title:"",
                img:null,
                status:1
            },
            imgUrl:""
        }
    },
    computed:{
        ...mapGetters([])
    },
    methods:{
        ...mapActions({
            reqList:"banner/reqList"
        }),
        cancel(){
            this.info.isshow=false
        },
        empty(){
            this.banner={
                title:"",
                img:null,
                status:1
            },
            this.imgUrl=""
        },
        getOne(id){
          reqBannerDetail(id).then((res)=>{
              this.banner=res.data.list
              this.banner.id=id
              this.imgUrl=this.$imgPre+this.banner.img
          })
        },
        add(){
            this.check().then(()=>{
                reqBannerAdd(this.banner).then(res=>{
                    if(res.data.code==200){
                        successAlert("添加成功")
                        this.cancel()
                        this.empty()
                        this.reqList()
                    }
                })
            })
        },
        changeFile(e){
            let file=e.target.files[0]
            this.imgUrl=URL.createObjectURL(file)
            this.banner.img=file
        },
        update(){
            this.check().then(()=>{
                reqBannerUpdate(this.banner).then(res=>{
                    if(res.data.code==200){
                        successAlert("修改成功")
                        this.cancel()
                        this.empty()
                        this.reqList()
                    }
            })
            })
        },
        check(){
            return new Promise((resolve,reject)=>{
                if(this.banner.title==""){
                    errorAlert("标题不能为空")
                    return
                }
                resolve()
            })
        },
        closed(){
            if(this.info.title=="编辑轮播图"){
                this.empty()
            }
        }
    },
    mounted(){}
}
</script>

<style scoped>
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
</style>