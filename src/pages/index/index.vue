<template>
  <div>
    <el-container class="con">
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/mange">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->

          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="box">
            <div class="demo-basic--circle block">
              <div>
                <el-avatar
                  :size="40"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
              </div>
            </div>
            <span class="sp">{{userInfo.username}}</span>
            <el-button type="primary" @click="logout" size="mini" class="exit">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            class="breadcrumb"
            v-if="$route.name"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/">{{$route.name}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      //取数据
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    logout() {
      //清掉vuex和本地存储
      this.changeUser({})
      this.$router.push("/login")
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.con {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.breadcrumb {
  margin-bottom: 20px;
}
.box {
  float: right;
  position: relative;
}
.exit {
  margin-top: 17px;
}
.box .block{
  position: absolute;
  top: 0px;
  left: -55px;
}
.box .sp {
  position: absolute;
  left: -50px;
  bottom: -15px;
}
</style>