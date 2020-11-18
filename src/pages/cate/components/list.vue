<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" width="150px" align="center" sortable></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable></el-table-column>
      <el-table-column label="图片">
          <template slot-scope="scope">
              <img :src="$imgPre+scope.row.img" alt="/">
          </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1" size="small">启用</el-button>
          <el-button type="info" size="small" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)" class="delBtn"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {reqCateDel} from '../../../utils/http'
import {successAlert} from '../../../utils/alert'
export default {
    props:["list"],
 
    computed: {
    ...mapGetters({
        list:"cate/list"
    }),
  },
  methods: {
    ...mapActions({
        reqList:"cate/reqList"
    }),
    del(id){
        reqCateDel(id).then(res=>{
            if(res.data.code==200){
                successAlert(res.data.msg)
                this.reqList()
            }
        })
    },
    edit(id){
        this.$emit("edit",id)
    }
  },
  mounted() {
      this.reqList()
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