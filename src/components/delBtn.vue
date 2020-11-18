<template>
  <div>
    <el-button type="danger" @click="del">删除</el-button>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters([])
    },
    methods:{
        del(){
            this.$confirm("你确定要删除吗？","删除提示",{
                confirmButtonText:"删除",
                concelButtonText:"取消",
                type:"warning"
            }).then(res=>{
                this.$emit("confirm")
            }).catch(()=>{
                console.log("你点了取消");
            })
        }
    },
    mounted(){}
}
</script>

<style>
</style>