<template>
    <div class="docker">
    <span class="docker__item" v-for="(item,index) in dockerList"  
    :class="{'docker__item': true, 'docker__item--active': index === currentIndex}"
    :key='item.icon'>
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{item.text}}</div>
      </router-link>
      </span>
  </div>
</template>

<script>
export default {
    name:'Docker',
    props:['currentIndex'],
    setup(){
        const dockerList=[
            {icon:'&#xe7c6;',text:'首页',to:{name:'Home'}},
            {icon:'&#xe600;',text:'购物车',to:{name:'CartList'}},
            {icon:'&#xe601;',text:'订单',to:{name:'OrderList'}},
            {icon:'&#xe8a0;',text:'我的',to:{name:'Myself'}},
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
  border-top:.01rem solid #f1f1f1 ;
  padding:0 .18rem;
  box-sizing: border-box;
  color:$content-fontcolor;
  a{
    color:$content-fontcolor;
    text-decoration: none;
  }
  &__item{
      flex:1;
      text-align: center;
      font-size:.18rem;
      margin: .07rem 0 .02rem 0;
      &--active{
        a{
          color: #1fa4fc;
        }
      }
  }
  &__title{
    font-size: .2rem;
    transform: scale(.5,.5);
    transform-origin: center top;
  }
}
</style>