<template>
    <div>
        <el-button type="primary" @click="willAdd">添加</el-button>

        <!-- table -->
        <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

        <!-- 弹框 -->
        <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import vList from './components/list'
import vForm from './components/form'
import {reqCateList} from '../../utils/http'
export default {
    data(){
        return {
            list:[],
            info:{
                isshow:false,
                title:"添加分类"
            }
        }
    },
    computed:{
        ...mapGetters([])
    },
    methods:{
        ...mapActions([]),
        willAdd(){
            this.info={
                isshow:true,
                title:"添加分类"
            }
        },
        init(){
            reqCateList().then(res=>{
                this.list=res.data.list
            })
        },
        edit(id){
            this.info={
                isshow:true,
                title:"编辑分类"
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