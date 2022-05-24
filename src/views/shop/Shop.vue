<template>
<div class="wrapper">
    <div class="search">
        <div class="search__back iconfont" @click="handleBackClick">&#xe679;</div>
        <div class="search__content">
            <span class="search__content__icon iconfont">&#xe602;</span>
            <input class="search__content__input" placeholder="请输入商品名称" />
        </div>
    </div>
    <Shopinfo :item="data.item" :hideBorder="true" v-show="data.item.imgUrl"/>
    <content :shopName="data.item.name"/>
    <cart />
</div>
</template>

<script>
import {reactive} from 'vue'
import Shopinfo from '../../components/Shopinfo.vue'
import {useRoute, useRouter} from 'vue-router'
import { get } from '../../utils/request'
import Content from './Content'
import Cart from './Cart'

const useShopEffect=()=>{
     const router=useRouter();
     const route=useRoute();
     const data=reactive({item:{}})
     const getItemData=async()=>{
         const result=await get(`/api/shop/${route.params.id}`)
         if(result.errno===0&&result.data)
         {
            data.item=result.data;
         }
     }
    getItemData(); 
    const handleBackClick=()=>{
        router.back();
    }
    return {data,handleBackClick}
}


export default {
    name:'Shop',
    components:{
        Shopinfo,Content,Cart,
        Cart
    },
    setup(){
       const {data,handleBackClick}=useShopEffect();
        return {data,handleBackClick}
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
    padding:0 .18rem;
}
.search{
    display: flex;
    margin:.18rem 0 .06rem 0;
    &__back{
        width:.3rem;
        line-height:.32rem;
        font-size:.24rem;
        color:#b6b6b6;
        cursor: pointer;
        // background: #000;
    }
    &__content{
        display: flex;
        flex: 1;
        background:$search-bgColor;
        border-radius: .16rem;
        &__icon{
            width:.44rem;
            line-height:.32rem;
            text-align: center;
            color:$search-fontColor;
            // background:blue;
        }
        &__input{
            display: block;
            width:100%;
            padding-right:.2rem;
            border: none;
            outline: none;
            background:none;
            height:.32rem;
            &::placeholder{
                color:rgb(132, 132, 132);
                font-size:.14rem;
            }
        }
    }
}
</style>