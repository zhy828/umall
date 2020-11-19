<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="seckill">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="seckill.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px">
          <div class="block">
            <el-date-picker
              v-model="dateTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
          <el-select v-model="seckill.second_cateid" placeholder="请选择二级分类">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px">
          <el-select v-model="seckill.goodsid" placeholder="请选择商品" @change="changeGoods">
            <el-option
              v-for="item in goodsList"
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
import { reqCateList, reqGoodsList, reqSeckillAdd,reqSeckillDetail,reqSeckillUpdate } from "../../../utils/http";
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
      //二级分类
      secondCateList: [],
      goods: [],
      dateTime: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10),
      ],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList",
      reqSeckillList:"seckill/reqList"
    }),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.seckill = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
        //二级分类
        secondCateList = [],
        goods = [],
        dateTime = [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ];
    },
    changeFirst() {
      this.seckill.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqCateList({ pid: this.seckill.first_cateid }).then((res) => [
        this.secondCateList = res.data.list,
      ]);
    },
    changeGoods() {
      reqGoodsList({
        fid: this.seckill.first_cateid,
        sid: this.seckill.second_cateid,
      }).then((res) => {
        this.goodsid = res.data.list;
      });
    },
    add() {
      reqSeckillAdd(this.seckill).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.reqSeckillList();
        }
      });
    },
    getOne(id) {
      reqSeckillDetail(id).then((res) => {
        this.seckill = res.data.list;
        this.seckill.id = id;
      });
    },
    update() {
        reqSeckillUpdate(this.seckill).then(res=>{
            if (res.data.code == 200) {
            successAlert("更新成功");
            this.cancel();
            this.empty();
            this.reqSeckillList();
          }
        })
    },
    
  },
  mounted() {
    this.reqCateList();
    this.reqGoodsList();
    this.reqSeckillList()
  },
};
</script>

<style>
</style>