<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow"  @closed="closed">
      <el-form :model="seckill">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="seckill.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px">
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              :change="time()"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="seckill.first_cateid" placeholder="请选择一级分类" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="seckill.second_cateid" placeholder="请选择二级分类" @change="changeSecond">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px">
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
export default {
  props: ["info"],
  data() {
    return {
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
      this.time();
      reqSeckillAdd(this.seckill).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    getOne(id) {
      this.value2 = [];
      reqSeckillDetail(id).then((res) => {
        this.seckill = res.data.list;
        this.seckill.id = id;
        this.value2.push(this.seckill.begintime, this.seckill.endtime);
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
    },
    update() {
      // this.seckill.begintime=this.value2[0]
      // this.seckill.endtime=this.value2[1]
      this.time();
      reqSeckillUpdate(this.seckill).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    //获取开始时间结束时间
    time() {
      //开始时间赋值
      this.seckill.begintime = this.value2[0];
      //结束时间赋值
      this.seckill.endtime = this.value2[1];
      // console.log(this.value2[0])
      // console.log(this.value2[1])
    },
    closed(){
      if(this.info.title==="编辑秒杀"){
        this.empty()
      }
    }
  },
  mounted() {
    this.reqCateList();
    // this.reqGoodsList();
    // this.reqList()
  },
};
</script>

<style>
</style>
