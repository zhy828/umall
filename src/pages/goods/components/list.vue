<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" width="120px" align="center" sortable></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt="/" />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
          <template slot-scope="scope">
              <el-button type="primary" size="small" v-if="scope.row.isnew===1">是</el-button>
              <el-button type="danger" size="small" v-else>否</el-button>
          </template>
      </el-table-column>
      <el-table-column label="是否热卖">
          <template slot-scope="scope">
              <el-button type="primary" size="small" v-if="scope.row.ishot===1">是</el-button>
              <el-button type="danger" size="small" v-else>否</el-button>
          </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1" size="small">启用</el-button>
          <el-button type="info" size="small" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="170px">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)" class="delBtn"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list:"goods/list",
      total:"goods/total",
      size:"goods/size"
    }),
  },
  methods: {
    ...mapActions({
      reqList:"goods/reqList",
      reqCount:"goods/reqCount",
      changePage:"goods/changePage"
    }),
    del(id){
      reqGoodsDel(id).then(res=>{
        if(res.data.code==200){
          successAlert("删除成功")
          this.reqList()
          this.reqCount()
        }
      })
    },
    edit(id){
      this.$emit("edit",id)
    },
  },
  mounted() {
    this.reqList()
    this.reqCount()
  },
};
</script>

<style scoped>
  img{
    width: 80px;
    height: 80px;
  }
  .delBtn{
    display: inline-block;
  }
</style>