<template>
    <div class="login">
        <div class="con">
            <h3>登录</h3>
            <div class="line">
                <el-input v-model="user.username" placeholder="请输入账号" clearable></el-input>
            </div>
            <div class="line">
                <el-input v-model="user.password" placeholder="请输入密码" clearable show-password></el-input>
            </div>
            <div class="last">
                <el-button type="primary" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {reqLogin} from '../../utils/http'
import {successAlert} from '../../utils/alert'
export default {
    data(){
        return {
            user:{
                username:"",
                password:""
            }
        }
    },
    computed:{
        ...mapGetters([])
    },
    methods:{
        ...mapActions({
            "changeUser":"changeUser"
        }),
        login(){
            reqLogin(this.user).then(res=>{
                if(res.data.code==200){
                    successAlert("登录成功")
                    //存vuex
                    this.changeUser(res.data.list)
                    this.$router.push("/")
                }
            })
        }
    },
    mounted(){}
}
</script>

<style scoped>
    .login{
        width: 100vw;
        height: 100vh;
        position: relative;
        background: linear-gradient(to right,#543444,#403A53,#303D5F);
    }
    .con{
        width: 400px;
        padding: 20px;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 20px;
    }
    h3{
        text-align: center;
        margin: 10px;
    }
    .line{
        margin-bottom: 15px;
    }
    .last{
        text-align: center;
    }
</style>