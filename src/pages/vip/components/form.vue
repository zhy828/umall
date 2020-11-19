<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="vip" :rules="rules">
        <el-form-item label="昵称" label-width="120px" prop="nickname">
          <el-input v-model="vip.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="vip.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="vip.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="vip.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import { reqVipDetail, reqVipUpdate } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      rules: {
        nickname: [{ required: true, message: "请输昵称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      vip: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions({
      reqList: "vip/reqList",
    }),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.vip = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    getOne(uid) {
      reqVipDetail(uid).then((res) => {
        this.vip = res.data.list;
      });
    },
    update() {
      this.check().then(() => {
        reqVipUpdate(this.vip).then((res) => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.cancel();
            this.empty();
            this.reqList();
          }
        });
      });
    },
    check() {
      return new Promise((resolve, reject) => {
        if (this.vip.nickname == "") {
          errorAlert("昵称不能为空");
          return;
        }
        if (this.vip.phone == "") {
          errorAlert("手机号不能为空");
          return;
        }
        if (this.vip.password == "") {
          errorAlert("密码不能为空");
          return;
        }
        resolve();
      });
    },
  },
  mounted() {},
};
</script>

<style>
</style>