<template>
    <div class="nearby">
      <h1 class="nearby__title">附近店铺</h1>
      <router-link :to="`/shop/${item._id}`" v-for="item in nearbyList" :key="item._id">
         <Shopinfo :item="item"/>
      </router-link>
      <!-- <div class="nearby__item"
       v-for="(item,index) in nearbyList" :key="index">
        <img :src="`${item.imgUrl}`" class="nearby__item__img">
        <div class="nearby__content">
          <div class="nearby__content__title">{{item.name}}</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售:{{item.sales}}</span>
            <span class="nearby__content__tag">起送:￥{{item.expressLimit}}</span>
            <span class="nearby__content__tag">基础运费:￥{{item.expressPrice}}</span>
          </div>
          <p class="nearby__content__highlight">{{item.slogan}}</p>
        </div>
      </div> -->
      
    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import Shopinfo from '@/components/Shopinfo.vue';

const userNearbyListEffect=()=>{
  const nearbyList=ref([]);
  const fetNearbyList=async()=>{
    const result=await get('/api/shop/hot-list');
    if(result.errno===0&&result.data.length){
        nearbyList.value=result.data
        }
  }
  return {nearbyList,fetNearbyList}
}

export default {
  components: { Shopinfo },
    name:'Nearby',
    setup(){
      const {nearbyList,fetNearbyList}=userNearbyListEffect();
      fetNearbyList()
      return {nearbyList}
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.nearby{
  &__title{
    margin:.16rem 0 .1rem 0;
    font-size:.18rem;
    font-weight: normal;
    color:$content-fontcolor
  }
  a{
    text-decoration: none;
  }
}
</style>