<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="user.roleid" placeholder="--请选择--">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title == '添加管理员'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqRoleList,
  reqUserAdd,
  reqUserDetail,
  reqUserUpdate,
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      //角色列表
      roleList: [],
    };
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    add() {
      reqUserAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    //获取详情
    getOne(uid) {
      reqUserDetail(uid).then((res) => {
        this.user = res.data.list;
        this.user.password = "";
      });
    },
    //修改
    update() {
      reqUserUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    //处理消失
    closed() {
      if (this.info.title === "编辑管理员") {
        this.empty();
      }
    },
  },
  mounted() {
    //一进来，先获取菜单列表数据
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>