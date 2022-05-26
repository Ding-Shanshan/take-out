<template>
   <div class="wrapper">
    <Top-area></Top-area>
    <Product-list></Product-list>
     <Order></Order>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import Order from './Order.vue'

const orderUseEffect=()=>{
    const store=useStore();
    const route=useRoute();
    const shopId=route.params.id;
    const shopName=store.state.cartList[shopId].shopName;
    const productList=store.state.cartList[shopId].productList;
    return {shopName,shopId,productList};
}

export default {
  components: { TopArea, ProductList, Order },
     name: 'OrderConfirmation',
     setup(){
        const {shopName,shopId,productList}=orderUseEffect();
        return {shopName,shopId,productList};
     }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
}


.order {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: #FFF;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: #333;
  }
  &__btn {
    width: .98rem;
    background: #4FB0F9;
    color: #fff;
    text-align: center;
    font-size: .14rem;
  }
}
</style>