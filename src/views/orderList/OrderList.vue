<template>
    <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item,index) in list" :key="index">
        <div class="order__title">
          {{item.shopName}}
          <span class="order__status">{{item.isCanceled?'已取消':'已下单'}}</span>
        </div>
        <div class="order__content">
          <div class="order__content_imgs">
            <template v-for="(inneritem,innerindex) in item.products" :key="innerindex">
                 <img class="order__content__img" :src="inneritem.product.img" v-if="innerindex<=3"/> 
            </template>
          </div>
          <div class="order__info">
            <div class="order__info__price">￥{{item.products.totalprice}}</div>
            <div class="order__info__count">共{{item.products.totalcount}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2"/>
</template>
<script>
import Docker from '../home/Docker.vue'
import {get} from '../../utils/request'
import { reactive, toRefs } from '@vue/reactivity'

const useOrderListEffect=()=>{
 const data=reactive({list:{}})
        const getNearbyList=async()=>{
            const result=await get('/api/order')
            if(result?.errno===0&&result?.data?.length)
            {
                const orderList=result.data;
                for(let i in orderList)
                {
                    //products代表每一家商店
                    const products=orderList[i].products||[];
                    let totalprice=0;
                    let totalcount=0;
                    for(let j in products)
                    {
                        totalcount+=(products[j]?.orderSales||0)
                        totalprice+=((products[j]?.product?.price*products[j]?.orderSales)||0)
                    }
                    products.totalprice=totalprice;
                    products.totalcount=totalcount;
                }
                data.list=result.data;
            }
        }
        getNearbyList();
        const {list}=toRefs(data);
        return { list }
}
export default {
  components: { Docker },
    name:'OrderList',
    setup(){
       const {list} =useOrderListEffect()
       console.log(list)
       return {list}
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  background: rgb(248, 248,248);
}
.title {
  line-height: .44rem;
  background: $bgColor;
  font-size: .16rem;
  font-weight:600;
  color: $content-fontcolor;
  text-align: center;
}
.order {
  margin: .16rem .18rem;
  padding: .16rem;
  background: $bgColor;
  &__title {
    margin-bottom: .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontcolor;
    font-weight: 600;
  }
  &__status {
    float: right;
    font-size: .14rem;
    color: $light-fontColor;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
  }
  &__info {
      width: .7rem;
      position: absolute;
      right:.35rem;
        &__price {
        margin-bottom: .04rem;
        line-height: .2rem;
        font-size: .14rem;
        color: $hightight0fontColor;
        text-align: right;
            }
        &__count {
        line-height: .14rem;
        font-size: .12rem;
        color: $content-fontcolor;
        text-align: right;
        }
    }
}
</style>