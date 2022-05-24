<template> 
    <div class="content">
        <div class="category">
            <div :class="{'category__item':true,'category__item--active':currentTab===item.tab}" 
            v-for="item in cateList" 
            :key="item.tab"
            @click="handleCateClick(item.tab)">{{item.name}}
            </div>
        </div>
         <div class="product">
            <div class="product__item" v-for="(item,index) in contentList" :key="index">
                <img class="product__item__img" :src=item.imgUrl>
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售{{item.sales}}件</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{item.price}}
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                <span class="product__number__minus"
                @click="downItemToCart(shopId,item._id,item)">-</span>
                
                {{$store.state.cartList?.[shopId]?.productList?.[item._id]?.count||0}}
                <span class="product__number__plus"
                @click="changeShopName(shopId,item._id,item,shopName)">+</span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import {get} from '../../utils/request'
import {reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonEffert } from './commonCartEffect'

const useContentEffect=()=>{
    //菜单列表
    const cateList=[{
        name:'全部商品',
        tab:'all'
    },{
        name:'秒杀',
        tab:'seckill'
    },{
        name:'新鲜水果',
        tab:'fruit'
    }]
    const route=useRoute();
    const data=reactive({contentList:[],currentTab:'all'})
    // 获取详情数据
    const getContentData=async (tab)=>{
            const result=await get(`/api/shop/${route.params.id}/products?tab=${tab}`)
            if(result.errno===0&&result.data.length)
            {
                 data.contentList=result.data;
            }
        }
    getContentData('all');

    const handleCateClick=(tab)=>{
        data.currentTab=tab;
        getContentData(tab);
    }
            const store= useStore();
    const changeShopidName=(shopId,shopName)=>{
        store.commit('changeShopName',{shopId,shopName});
    }
   
    const {contentList,currentTab}=toRefs(data)
    return {contentList,cateList,handleCateClick,currentTab,changeShopidName}
}


export default {
    name:'Content',
    props:['shopName'],
    setup(){
        const route=useRoute();
        const shopId=route.params.id;
        const {contentList,cateList,handleCateClick,currentTab,changeShopidName}=useContentEffect();
        const {CartList,addItemToCart,downItemToCart}=useCommonEffert(); 
        const changeShopName=(shopId,productid,item,shopName)=>{
            addItemToCart(shopId,productid,item)
            changeShopidName(shopId,shopName);
             }
       return {contentList,cateList,handleCateClick,currentTab,CartList,shopId,
                addItemToCart,downItemToCart,changeShopName};
       
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content{
    display: flex;
    position:absolute;
    left:0;
    right:0;
    top:1.5rem;
    bottom:.5rem;
}
.category{
    overflow-y: scroll;
    height: 100%;
    width:.76rem;
    cursor: pointer;
    background:$search-bgColor;
    &__item{
        line-height: .4rem;
        text-align: center;
        font-size: 14px;
        color:$content-fontcolor;
        &--active{
            background: $bgColor;
        }
    };
}
.product{
    overflow-y:scroll;
    flex:1;
    &__item{
        position: relative;
        display: flex;
        padding:.12rem 0;
        margin:0 .16rem;
        border-bottom:.01rem solid #f1f1f1;
        &__detail{
            overflow: hidden;
        }
        &__img{
            width:.68rem;
            height:.68rem;
            margin-right:.16rem;
        }
        &__title{
            margin:0;
            @include ellipsis;
            line-height:.2rem;
            font-size:.14rem;
            color:$content-fontcolor
        }
        &__sales{
            margin:.06rem 0;
            line-height:.16rem;
            font-size:.12rem;
            color:$content-fontcolor;
        }
        &__price{
            margin:0;
            line-height:.2rem;
            font-size:.14rem;
            color:$hightight0fontColor;
        }
        &__yen{
            font-size:.12rem;
        }
        &__origin{
            margin-left:.06rem;
            line-height: .2rem;
            font-size:.12rem;
            color:$light-fontColor;
            text-decoration: line-through;
        }

    }
    &__number{
        position: absolute;
        right:.14rem;
        bottom:.12rem;
         &__minus,&__plus{
        display: inline-block;
        width:.16rem;
        height:.16rem;
        line-height: .14rem;
        border-radius: 50%;
        border:.01rem solid $medium-fontColor;
        font-size:.14rem;
        text-align:center;
        }
        &__minus{
            border:.01rem solid $medium-fontColor;
            color:$medium-fontColor;
            margin-right:.08rem;
            cursor: pointer;
        }
        &__plus{
            background: $btnColor;
            border:.01rem solid $btnColor;
            color:$bgColor;
            margin-left:.08rem;
            cursor: pointer;
        }
    }
}
</style>