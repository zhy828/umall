import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '../store'
import router from '../router'
import {errorAlert} from './alert'

// 展示图片，需要给图片加“http://localhost:3000”,打包又不用，所以在http.js 中给Vue的原型挂了http://localhost:3000
let baseUrl="/aa"
Vue.prototype.$imgPre="http://localhost:3000"

// let baseUrl=""
// Vue.prototype.$imgPre=""

//请求拦截
axios.interceptors.request.use(req=>{
    if(req.url!=baseUrl+"/api/userlogin"){
        req.headers.authorization=store.state.userInfo.token
    }
    return req
})

//响应拦截
axios.interceptors.response.use(res=>{
    console.log("本次请求的地址是"+res.config.url);
    console.log(res);
    // 统一处理失败，组件内只需要处理成功即可
    if(res.data.code!=200){
        errorAlert(res.data.msg)
    }
    if(res.data.msg==="登录已过期或访问权限受限"){
        store.dispatch("changeUser",{})
        router.push("/login")
    }
    return res
})
// =========================================  菜单接口  ============================================

//添加
export const reqMenuAdd=(form)=>{
    return axios({
        url: baseUrl+"/api/menuadd",
        method: "post",
        data: qs.stringify(form),
      })
}

//列表交互
export const reqMenuList=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:{
            istree:true
        }
    })
}

//删除
export const reqMenuDel=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

//获取一条数据
export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//菜单修改
export const reqMenuUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(form)
    })
}
// =========================================  菜单接口 结束 ============================================


// =========================================  角色接口  ============================================

//添加
export const reqRoleAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(user)
    })
}

//列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get"
    })
}

//删除
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

//编辑
export const reqRoleDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//修改
export const reqRoleUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(user)
    })
}

// =========================================  角色接口  结束============================================

// =========================================  管理员接口  ============================================

//添加
export const reqUserAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(user)
    })
}

//列表
export const reqUserList=(p)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:p
    })
}

// //删除
export const reqUserDel=(uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify({
            uid:uid
        })
    })
}

// //编辑
export const reqUserDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}

// //修改
export const reqUserUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(user)
    })
}

//总数
export const reqUserCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
    })
}

//登录
export const reqLogin=(user)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(user)
    })
}
// =========================================  管理员接口 结束============================================

// =========================================  分类接口  ============================================
//添加
export const reqCateAdd=(form)=>{
    let d=new FormData()
    for(let i in form){
        d.append(i,form[i])
    }
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:d
    })
}

//列表
export const reqCateList=(p)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        withCredentials:true,
        params:p
    })
}

// //删除
export const reqCateDel=(id)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

// //编辑
export const reqCateDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

// //修改
export const reqCateUpdate=(form)=>{
    let d=new FormData()
    for(let i in form){
        d.append(i,form[i])
    }
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:d
    })
}

// =========================================  分类接口 结束============================================

// =========================================  规格接口  ============================================
//添加
export const reqSpecsAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(form)
    })
}

//列表
export const reqSpecsList=(p)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:p
    })
}

// //删除
export const reqSpecsDel=(id)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

// //编辑
export const reqSpecsDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

// //修改
export const reqSpecsUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(form)
    })
}

//总数
export const reqSpecsCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount",
        method:"get"
    })
}
// =========================================  规格接口 结束============================================

// =========================================  商品管理接口  ============================================
//添加
export const reqGoodsAdd=(goods)=>{
    let d=new FormData()
    for(let i in goods){
        d.append(i,goods[i])
    }
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:d
    })
}

//列表
export const reqGoodsList=(p)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:p
    })
}

// //删除
export const reqGoodsDel=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

// //编辑
export const reqGoodsDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

// //修改
export const reqGoodsUpdate=(goods)=>{
    let d=new FormData()
    for(let i in goods){
        d.append(i,goods[i])
    }
    return axios({
        url:baseUrl+"/api/goodsedit",
        method:"post",
        data:d
    })
}

//总数
export const reqGoodsCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get"
    })
}
// =========================================  商品管理接口 结束============================================

// =========================================  会员管理接口  ============================================

//列表
export const reqVipsList=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get"
    })
}

// //编辑
export const reqVipDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}

// //修改
export const reqVipUpdate=(vip)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:qs.stringify(vip)
    })
}

// =========================================  会员管理接口 结束============================================

// =========================================  轮播图管理接口  ============================================
//添加
export const reqBannerAdd=(Banner)=>{
    let d=new FormData()
    for(let i in Banner){
        d.append(i,Banner[i])
    }
    return axios({
        url:baseUrl+"/api/banneradd",
        method:"post",
        data:d
    })
}

//列表
export const reqBannerList=()=>{
    return axios({
        url:baseUrl+"/api/bannerlist",
        method:"get"
    })
}

// //删除
export const reqBannerDel=(id)=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

// //编辑
export const reqBannerDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/bannerinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

// //修改
export const reqBannerUpdate=(Banner)=>{
    let d=new FormData()
    for(let i in Banner){
        d.append(i,Banner[i])
    }
    return axios({
        url:baseUrl+"/api/banneredit",
        method:"post",
        data:d
    })
}

// =========================================  轮播图管理接口 结束============================================