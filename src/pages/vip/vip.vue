<template>
    <div>
        <v-list @edit="edit"></v-list>
        <v-form :info="info" ref="form"></v-form>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import vList from './components/list'
import vForm from './components/form'
export default {
    data(){
        return {
            info:{
                isshow:false,
                title:""
            }
        }
    },
    computed:{
        ...mapGetters([])
    },
    methods:{
        ...mapActions([]),
        edit(uid){
            this.info={
                isshow:true,
                title:"编辑会员"
            }
            this.$refs.form.getOne(uid)
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
