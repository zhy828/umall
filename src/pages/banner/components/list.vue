<template>
    <div>
        <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号" sortable></el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt="/" />
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
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters({
            list:"banner/list"
        })
    },
    methods:{
        ...mapActions({
            reqList:"banner/reqList"
        })
    },
    mounted(){
        this.reqList()
    }
}
</script>

<style scoped>
    img{
        width: 100px;
        height: 100px;
    }
</style>