<template>
    <div>
        <el-button type="primary" @click="willAdd">添加</el-button>
        <v-list @edit="edit"></v-list>
        <v-form :info="info" ref="form"></v-form>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import vList from './components/list.vue'
import vForm from './components/form.vue'
export default {
    data(){
        return {
            info:{
                isshow:false,
                title:"添加商品"
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
                title:"添加商品"
            }
        },
        edit(id){
            this.info={
                isshow:true,
                title:"编辑商品"
            }
            this.$refs.form.getOne(id)
        }
    },
    mounted(){},
    components:{
        vList,
        vForm
    }
}
</script>

<style>

</style>