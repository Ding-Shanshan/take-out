<template>
    <div class="shop__item">
        <img :src="`${item.imgUrl}`" class="shop__item__img">
        <div class="shop__content" :class="{'shop__content':true,'shop__content--border':hideBorder?false:true}">
          <div class="shop__content__title">{{item.name}}</div>
          <div class="shop__content__tags">
            <span class="shop__content__tag">月售:{{item.sales}}</span>
            <span class="shop__content__tag">起送:￥{{item.expressLimit}}</span>
            <span class="shop__content__tag">基础运费:￥{{item.expressPrice}}</span>
          </div>
          <p class="shop__content__highlight">{{item.slogan}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'Shopinfo',
    props:['item','hideBorder'],
    setup(){
       
    }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
@import '../style/mixins.scss';
.shop{
  &__title{
    margin:.16rem 0 .1rem 0;
    font-size:.18rem;
    font-weight: normal;
    color:$content-fontcolor
  }
  &__item{
    display: flex;
    padding-top:.12rem;
    &__img{
      margin-right:.16rem;
      margin-top:.08rem;
      width:.56rem;
      height:.56rem;
    }
  }
  &__content{
    &--border{
         border-bottom: 1px solid $content-bgColor;
    }
    flex:1;
    &__title{
      line-height: .20rem;
      font-size:.16rem;
      color:$content-fontcolor;
    }
    &__tags{
      margin-top:.08rem;
      line-height: .16rem;
      font-size:.13rem;
      color:$content-fontcolor;
    }
    &__tag{
      margin-right:.16rem;
    }
    &__highlight{
      margin-top:.08rem 0 0 0;
      line-height: .16rem;
      font-size:.13rem;
      color: $hightight0fontColor;
    }
  }
}
</style>