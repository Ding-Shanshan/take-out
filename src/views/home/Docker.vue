<template>
    <div class="docker">
    <span class="docker__item" v-for="(item,index) in dockerList" :key='item.icon' :class="{'docker__item':true,'docker__item--active':index===0}">
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker__title">{{item.text}}</div>
      </span>
  </div>
</template>

<script>
export default {
    name:'Docker',
    setup(){
        const dockerList=[
            {icon:'&#xe7c6;',text:'首页'},
            {icon:'&#xe600;',text:'购物车'},
            {icon:'&#xe601;',text:'订单'},
            {icon:'&#xe8a0;',text:'我的'},
        ];
        return { dockerList }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.docker{
  display: flex;
  position:absolute;
  left:0;
  bottom:0;
  height:0.49rem;
  width:100%;
  border-top:1px solid #f1f1f1 ;
  padding:0 .18rem;
  box-sizing: border-box;
  color:$content-fontcolor;
  &__item{
      flex:1;
      text-align: center;
      font-size:.18rem;
      margin: .07rem 0 .02rem 0;
      &--active{
         color: #1fa4fc;
      }
  }
  &__title{
    font-size: .2rem;
    transform: scale(.5,.5);
    transform-origin: center top;
  }
}
</style>