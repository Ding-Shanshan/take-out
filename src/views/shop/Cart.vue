<template>
<div class="mask" v-if="showCart" @click="showProduct">
</div>
  <div class="cart">
        <div class="product" v-if="showCart">
          <div class="product__header">
            <div class="product__header__all">
              <span 
              :class="{'product__header__check':true,'iconfont':true,'isorcheck':allCheck}"
              v-html="allCheck?'&#xe8af;':'&#xe933;'"
              @click="productCheckAll(shopId)">
                </span>
              全选</div>
            <div class="product__header__clear">
            <span @click="cleanCartProducts(shopId)">清空购物车</span>
            </div>
          </div>
            <template  v-for="(item,index) in total[2]" :key="index">
            <div class="product__item" v-if="item.count>0">
                <div v-html="item.check?'&#xe8af;':'&#xe933;'" :class="{'product__item__checked':true,'iconfont':true,'isorcheck':item.check}" 
                @click="changeCartItemChecked(shopId,item._id)">
                </div>
                <img class="product__item__img" :src=item.imgUrl>
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales"></p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{item.price}}
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                <span class="product__number__minus"
                @click="downItemToCart(shopId,item._id,item)">-</span>
                {{item.count||0}}
                <span class="product__number__plus"
                @click="addItemToCart(shopId,item._id,item)">+</span>
                </div>
            </div>
            </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <!-- <img
          src="http://www.dell-lee.com/imgs/vue3/cart.png"
          class="check__icon__img"
        /> -->
        <span class="iconfont check__icon__img" @click="showProduct">&#xe63f;</span>
        <div class="check__icon__tag">{{total[0]}}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{total[1]}}</span>
      </div>
      <div class="check__btn">  
        <router-link :to="{name:'Home'}">
          去结算
        </router-link>    
      </div>
    </div>
  </div>
</template>

<script>
import {computed,ref} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import { useCommonEffert } from './commonCartEffect'

//购物车内部逻辑
const useCart=()=>{
        const store=useStore();
        const route=useRoute();
        const shopId=route.params.id;
        const cartList=store.state.cartList;  
        const total=computed(()=>{
          const productList=cartList[shopId]
            let count=0;
            let summoney=0;
            if(productList)
            {
                for(let i in productList)
                {
                    const product=productList[i]
                    count+=product.count;
                    if(product.check)
                    {
                      summoney+=product.count*product.price;
                    }
                }
            }
            return [count,summoney.toFixed(2),productList];
        });
        const changeCartItemChecked=(shopId,productId)=>{
          store.commit('changeCartItemChecked',{
            shopId,productId
          })
        };
        const cleanCartProducts=(shopId)=>{
          store.commit('cleanCartProducts',{
            shopId
          })
        };
        const productCheckAll=(shopId)=>{
          store.commit('productCheckAll',{shopId})
        };
        const allCheck=computed(()=>{
            const productList=cartList[shopId]
            let count=0;
            let result=true;
            if(productList)
            {
                for(let i in productList)
                {
                    const product=productList[i]
                    if(product.count>0&&!product.check)
                    {
                      result=false;
                    }
                }
            }
            return result;
        });
        return { total,shopId,changeCartItemChecked,cleanCartProducts,productCheckAll,allCheck};
}

//是否展示购物车
const toggleCaerEffect=()=>{
   let showCart=ref(false);
      const showProduct=()=>{
            showCart.value=! showCart.value;
        };
    return {showCart,showProduct}
}

export default {
    name:'Cart',
    setup() {
      const {showCart,showProduct}=toggleCaerEffect();
      const { total,shopId,changeCartItemChecked,cleanCartProducts,productCheckAll,allCheck}=useCart();
      const { CartList,addItemToCart,downItemToCart }=useCommonEffert(); 
      return { total,addItemToCart,downItemToCart,shopId,changeCartItemChecked,cleanCartProducts,
              productCheckAll,allCheck,showProduct,showCart}
    },
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.mask{
  position: fixed;
  top:0;
  bottom: 0;
  left:0;
  right: 0;
  background: $mask-background;
}
.cart {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bgColor;
}
.product{
    overflow-y:scroll;
    flex:1;
    background: $bgColor;
    &__header{
      display:flex;
      line-height: .52rem;
      border-bottom: 1px solid $content-bgColor;
      &__check{
        font-size:.2rem;
        margin-right: .06rem;
      }
      &__all{
        flex:1;
        text-align: left;
        padding-left:.16rem;
        font-size:.16rem;
        color:$content-fontcolor;
      }
      .isorcheck{
        color:$btnColor;
        font-size: .2rem;
      }
      &__clear{
        flex:1;
        text-align: right;
        padding-right:.3rem;
        font-size:.16rem;
        color:$content-fontcolor
      }
    }
    &__item{
        position: relative;
        display: flex;
        padding:.12rem 0;
        margin:0 .16rem;
        border-bottom:.01rem solid $content-bgColor;
        &__checked{
          line-height: .5rem;
          font-size: .2rem;
          color:rgb(213, 213, 213)
        }
        .isorcheck{
           color:$btnColor;
           font-size: .2rem;
        }
        &__detail{
            overflow: hidden;
        }
        &__img{
            width:.46rem;
            height:.46rem;
            margin-right:.16rem;
            margin-left:.16rem;
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
            margin-right:.08rem
        }
        &__plus{
            background: $btnColor;
            border:.01rem solid $btnColor;
            color:$bgColor;
            margin-left:.08rem
        }
    }
}
.check {
  display: flex;

  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  line-height: .49rem;
  &__icon {
    position: relative;
    width: .84rem;
    &__img {
      display: block;
      margin: .0rem auto;
      color:$btnColor;
      font-size: .22rem;
      width: .30rem;
      height: .30rem;
    }
    &__tag {
      position: absolute;
      left: .46rem;
      top: .04rem;
      padding: 0 .04rem;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      background-color: $hightight0fontColor;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
      color: $bgColor;
      transform: scale(.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;
    &__price {
      line-height: .49rem;
      color: $hightight0fontColor;
      font-size: .18rem;
    }
  }
  &__btn {
    width: .98rem;
    background-color: $btnColor;
    text-align: center;
    font-size: .14rem;
    color:$bgColor;
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>