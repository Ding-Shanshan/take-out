<template>
       <div class="products">
      <div class="products__title">
        {{shopName}}
      </div>
      <div class="products__wrapper">
       <div class="products__list">
        <template v-for="item in productList" :key="item._id">
        <div
          class="products__item"
          v-if="item.count>0"
        >
          <img class="products__item__img" :src="item.imgUrl" />
          <div class="products__item__detail">
            <h4 class="products__item__title">{{item.name}}</h4>
            <p class="products__item__price">
              <span>
                <span class="products__item__yen">&yen; </span>
                {{item.price}} x {{item.count}}
              </span>
              <span class="products__item__total">
                 <span class="products__item__yen">&yen; </span>
                {{(item.price * item.count).toFixed(2)}}
              </span>
            </p>
          </div>
        </div>
        </template>
       </div>
       </div>
    </div> 
</template>

<script>
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

const orderUseEffect=()=>{
    const store=useStore();
    const route=useRoute();
    const shopId=route.params.id;
    const shopName=store.state.cartList[shopId].shopName;
    const productList=store.state.cartList[shopId].productList;
    return {shopName,shopId,productList};
}

export default {
     name: 'ProductList',
     setup(){
        const {shopName,shopId,productList}=orderUseEffect();
        return {shopName,shopId,productList};
     }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.products {
  margin: .16rem .18rem .55rem .18rem;
  background: #FFF;

  &__title {
    padding: .12rem .16rem .06rem .16rem;
    font-size: .16rem;
    color: #333;
    border-bottom:.01rem solid #f1f1f1 ;
  }
  &__wrapper{
    overflow-y:scroll ;
    position: absolute;
    // top:0;
    top: 2.5rem;
    left:.18rem;
    right:.18rem;
    bottom: .6rem;
  }
  &__item {
     background: #FFF;
    position: relative;
    display: flex;
    padding: .16rem;
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      flex: 1;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightight0fontColor;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: #000;
    }
    &__yen {
      font-size: .12rem;
    }
  }
}
</style>