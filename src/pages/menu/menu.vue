<template>
    <div>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="willAdd">添加</el-button>

        <!-- table -->
        <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

        <!-- 弹框 -->
        <v-from :info="info" :list="list" @init="init" ref="form"></v-from>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import vList from './components/list'
import vFrom from './components/from'
import {reqMenuList} from '../../utils/http'
export default {
    data(){
        return {
            list:[],
            info:{
                isshow:false,
                title:"添加菜单"
            }
        }
    },
    computed:{
        ...mapGetters([])
    },
    methods:{
        ...mapActions([]),
        willAdd(){
            this.info.isshow=true,
            this.info.title="添加菜单"
        },
        init(){
            reqMenuList().then(res=>{
                this.list=res.data.list
            })
        },
        edit(id){
            this.info.isshow=true,
            this.info.title="编辑菜单";
            //父组件调用子组件 form.vue 的 getOne（)
            this.$refs.form.getOne(id)
        }
    },
    mounted(){
        this.init()
    },
    components:{
        vList,
        vFrom
    }
}
</script>

<style>

</style>