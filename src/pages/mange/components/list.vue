<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column
        prop="id"
        label="用户编号"
        width="150px"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        sortable
      ></el-table-column>
      <el-table-column
        prop="rolename"
        label="所属角色"
        sortable
      ></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1" size="small"
            >启用</el-button>
          <el-button type="info" size="small" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <!-- 绑定confirm事件 -->
          <del-btn @confirm="del(scope.row.uid)" class="delBtn"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqUserDel } from "../../../utils/http";
export default {
  props: ["list"],
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
    del(uid) {
      //删除的请求
      reqUserDel(uid).then((res) => {
        if (res.data.code == 200) {
          //成功的弹框
          successAlert(res.data.msg);
          //28.通知父组件刷新list
          this.$emit("init");
        }
      })
    },
    edit(uid) {
      this.$emit("edit", uid);
    }
  },
  mounted() {},
};
</script>

<style scoped>
  .delBtn{
    display: inline-block;
  }
</style>