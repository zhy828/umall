<template>
    <div>
        <el-button type="primary" @click="willAdd">添加</el-button>
        <v-list :list="list" @init="init" @edit="edit"></v-list>
        <v-form :info="info" @init="init" ref="form"></v-form>
    </div>
</template>

<script>
import vList from './components/list'
import vForm from './components/form'
import {mapGetters,mapActions} from 'vuex'
import {reqRoleList} from '../../utils/http'
export default {
    data(){
        return {
            list:[],
            info:{
                isshow:false,
                title:"添加角色"
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
            this.info.title="添加角色"
        },
        init(){
            reqRoleList().then(res=>{
                this.list=res.data.list
            })
        },
        edit(id){
            this.info={
                isshow:true,
                title:"编辑角色"
            }
            this.$refs.form.getOne(id)
        }
    },
    mounted(){
        this.init()
    },
    components:{
        vList,
        vForm
    }
}
</script>

<style>

</style>