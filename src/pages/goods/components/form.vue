<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened" @closed="closed">
      <el-form :model="goods" :rules="rules">
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="goods.first_cateid" placeholder="请选择一级分类" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="goods.second_cateid" placeholder="请选择二级分类">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <el-input v-model="goods.goodsname" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="goods.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px" prop="market_price">
          <el-input v-model="goods.market_price" placeholder="请输入市场价格"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <!-- 上传文件 -->
          <div class="myupload">
            <h3>+</h3>
            <img :src="imgUrl" alt="/" class="img" v-if="imgUrl">
            <input type="file" v-if="info.isshow" class="ipt" @change="changeFile">
          </div>
        </el-form-item>

        <el-form-item label="商品规格" label-width="120px" prop="specsid">
          <el-select v-model="goods.specsid" placeholder="请选择商品规格" @change="changeSpecsid">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" prop="specsattr">
          <el-select v-model="goods.specsattr" placeholder="请选择规格属性" multiple>
            <el-option v-for="item in attrsList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <template>
            <el-radio v-model="goods.isnew" :label="1">是</el-radio>
            <el-radio v-model="goods.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <template>
            <el-radio v-model="goods.ishot" :label="1">是</el-radio>
            <el-radio v-model="goods.ishot" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="goods.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="120px">
          <!-- 富文本编辑器 -->
          <div v-if="info.isshow" id="edit"></div>
        </el-form-item>
      </el-form>
      {{goods}}
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加商品'">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert,errorAlert } from "../../../utils/alert";
import {
  reqCateList,
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate,
} from "../../../utils/http";
import E from "wangeditor";
export default {
  props: ["info"],
  data() {
    return {
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入商品市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigger: "change" },
        ],
        specsattr: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个规格属性",
            trigger: "change",
          },
        ],
      },
      goods: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      //二级分类
      secondCateList: [],
      //规格属性
      attrsList: [],
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqGoodsList: "goods/reqList",
      reqGoodsCount: "goods/reqCount",
    }),
    cancel() {
      this.info.isshow = false;
    },
    changeFirst() {
      this.goods.second_cateid = "", 
      this.getSecondList();
    },
    getSecondList() {
      reqCateList({ pid: this.goods.first_cateid }).then(res => {
        this.secondCateList = res.data.list;
      });
    },
    changeSpecsid() {
      this.goods.specsattr = [], 
      this.getAttrs();
    },
    getAttrs() {
      // 取出 specsList ,哪条数据的id和this.user.specsid是一样的
      let obj = this.specsList.find((item) => item.id === this.goods.specsid);
      // 就将这条数据的attrs取出来，赋值给attrsList
      this.attrsList = obj.attrs;
    },
    changeFile(e){
      let file=e.target.files[0]
      this.imgUrl=URL.createObjectURL(file)
      this.goods.img=file
    },
    addAttr(){
      this.attrArr.push({
        value:''
      })
    },
    delAttr(index){
      this.attrArr.splice(index,1)
    },
    empty() {
      this.goods = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.secondCateList=[]
      this.imgUrl=""
      this.attrsList=[]
    },
    add() {
      this.check().then(() => {
        // 将编辑器的内容取出来给user.description
        this.goods.description = this.editor.txt.html();
        let d = { ...this.goods };
        d.specsattr = JSON.stringify(d.specsattr);
        reqGoodsAdd(d).then(res => {
        console.log(12444444);
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.cancel();
            this.empty();
            this.reqGoodsList();
            this.reqGoodsCount();
          }
        });
      });
    },
    getOne(id) {
      reqGoodsDetail(id).then((res) => {
        this.goods = res.data.list;
        this.goods.id = id;
        this.getSecondList();
        this.imgUrl = this.$imgPre + this.goods.img;
        this.goods.specsattr = JSON.parse(this.goods.specsattr);
        this.getAttrs();
        //给编辑器赋值
        if (this.editor) {
          this.editor.txt.html(this.goods.description);
        }
      });
    },
    update() {
      this.check().then(() => {
        // 修改之前也要将编辑器的内容取出来给user.description
        this.goods.description = this.editor.txt.html();
        let d = { ...this.goods };
        d.specsattr = JSON.stringify(d.specsattr);
        reqGoodsUpdate(d).then((res) => {
          if (res.data.code == 200) {
            successAlert("更新成功");
            this.cancel();
            this.empty();
            this.reqGoodsList();
          }
        });
      });
    },
    //弹框打开，并且动画结束了
    opened() {
      this.editor = new E("#edit");
      this.editor.create();
      this.editor.txt.html(this.goods.description);
    },
    closed() {
      if (this.info.title == "编辑商品") {
        this.empty();
      }
    },
    //验证
    check() {
      return new Promise((resolve, reject) => {
        if (this.goods.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.goods.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.goods.goodsname === "") {
          errorAlert("商品名称不能为空");
          return;
        }
        if (this.goods.price === "") {
          errorAlert("商品价格不能为空");
          return;
        }
        if (this.goods.market_price === "") {
          errorAlert("商品市场价格不能为空");
          return;
        }
        if (!this.goods.img) {
          errorAlert("请选择图片");
          return;
        }
        if (this.goods.specsid === "") {
          errorAlert("请选择商品规格");
          return;
        }
        if (this.goods.specsattr.length === 0) {
          errorAlert("请选择规格属性");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
  },
  mounted() {
    this.reqCateList();
    this.reqSpecsList(true);
  },
};
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