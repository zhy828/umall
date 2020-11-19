<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow"  @closed="closed">
      <el-form :model="seckill" :rules="rules">
        <el-form-item label="活动名称" label-width="120px" prop="title">
          <el-input v-model="seckill.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px" prop="value2">
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="seckill.first_cateid" placeholder="请选择一级分类" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="seckill.second_cateid" placeholder="请选择二级分类" @change="changeSecond">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px" prop="goodsid">
          <el-select v-model="seckill.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="seckill.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        {{seckill}}
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加秒杀'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqCateList,
  reqGoodsList,
  reqSeckillAdd,
  reqSeckillDetail,
  reqSeckillUpdate,
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
import seckill from '../../../store/modules/seckill';
export default {
  props: ["info"],
  data() {
    return {
      rules:{
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        first_cateid: [{ required: true, message: "请输入一级分类", trigger: "change" }],
        second_cateid: [{ required: true, message: "请输入二级分类", trigger: "change" }],
        goodsid: [{ required: true, message: "请输入商品", trigger: "change" }],
            },
      seckill: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      value2: [],
      secondCateList: [],
      goodsArr: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList",
      reqList: "seckill/reqList",
    }),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      (this.seckill = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      }),
        (this.value2 = ""),
        (this.secondCateList = []),
        (this.goodsArr = []);
    },
    changeFirst() {
      this.seckill.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqCateList({ pid: this.seckill.first_cateid }).then((res) => [
        (this.secondCateList = res.data.list),
      ]);
    },
    changeSecond() {
      this.seckill.goodsid = "";
      reqGoodsList({
        fid: this.seckill.first_cateid,
        sid: this.seckill.second_cateid,
      }).then((res) => {
        this.goodsArr = res.data.list;
      });
    },
    add() {
      this.seckill.begintime = this.value2[0].getTime();
      this.seckill.endtime = this.value2[1].getTime()
      reqSeckillAdd(this.seckill).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
      console.log(this.seckill);
    },
    getOne(id) {
      this.value2 = [];
      reqSeckillDetail(id).then((res) => {
        this.seckill = res.data.list;
        this.seckill.id = id;
        reqCateList({ pid: this.seckill.first_cateid }).then((res) => [
          (this.secondCateList = res.data.list),
        ]);
        reqGoodsList({
          fid: this.seckill.first_cateid,
          sid: this.seckill.second_cateid,
        }).then((res) => {
          this.goodsArr = res.data.list;
        });
      });
      console.log(this.$moment(new Date()).format())
    },
    update() {
      this.seckill.begintime = this.value2[0].getTime();
      this.seckill.endtime = this.value2[1].getTime()
      reqSeckillUpdate(this.seckill).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    closed(){
      if(this.info.title==="编辑秒杀"){
        this.empty()
      }
    },
    check(){
            return new Promise((resolve,reject)=>{
                if(this.seckill.title==""){
                    errorAlert("活动名称不能为空")
                    return
                }
                if(this.seckill.first_cateid==""){
                    errorAlert("一级分类不能为空")
                    return
                }
                if(this.seckill.second_cateid==""){
                    errorAlert("二级分类不能为空")
                    return
                }
                if(this.seckill.goodsid==""){
                    errorAlert("商品不能为空")
                    return
                }
                resolve()
            })
        },
  },
  mounted() {
    this.reqCateList();
  },
};
</script>

<style>
</style>
