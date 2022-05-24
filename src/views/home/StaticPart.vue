<template>
    <div class="position">
      <span class="iconfont position__icon">&#xe8ae;</span>
      北京理工大学国防科技2号楼10层北京理工大学国防科技2号楼10层北京理工大学国防科技2号楼10层
      <span class="iconfont position__notice">&#xe622;</span>
    </div>
    <div class="search">
      <span class="iconfont">&#xe602;</span>
       <span class="search__text">山姆会员商店优惠商品</span>
    </div>
    <div class="banner">
    <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg">
    </div>
    <div class="icons">
      <div class="icons__item" v-for="(item,index) in iconList" :key="index">
        <img class="icons__item__img" :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"/>
        <p class="icons__item__desc">{{item.desc}}</p>
      </div>
    </div>
    <div class="gap">
    </div>
</template>
<script>


export default {
    name:'StaticPart',
    setup(){
        const iconList=[
            {imgName:"超市",desc:"超市遍历"},
            {imgName:"菜市场",desc:"菜市场"},
            {imgName:"水果店",desc:"水果店"},
            {imgName:"鲜花",desc:"鲜花绿植"},
            {imgName:"医药健康",desc:"医药健康"},
            {imgName:"家居",desc:"家居时尚"},
            {imgName:"蛋糕",desc:"烘焙蛋糕"},
            {imgName:"签到",desc:"签到"},
            {imgName:"大牌免运",desc:"大牌免运"},
            {imgName:"红包",desc:"红包套餐"},
        ];
        return {iconList} 
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.position{
  @include ellipsis;
  position: relative;
  padding:.16rem .2rem .18rem 0;
  line-height: .22rem;
  font-size: .16rem;
  color:$content-fontcolor;
  .position__icon{
    position: relative;
    top:.02rem;
    font-size:.2rem;
    margin-right:.02rem;
  }
  .position__notice{
    position: absolute;
    right:0;
    font-size:.2rem;
    top:.17rem
  }
}

.search{
  position: relative;
  background:$content-bgColor;
  line-height:.32rem;
  color:#b7b7b7;
  padding:0 .15rem;
  border-radius: .16rem;
  font-size:.14rem;
  .iconfont{
    vertical-align: middle;
    display: inline-block;
    position: relative;
    padding-right:.07rem;
    font-size:.18rem;
    top:-.01rem;
  }
  &__text{
    display: inline-block;
    font-size:.14rem;
  }
}
.banner{
  height:0;
  margin-top:.12rem;
  overflow: hidden;
  padding-bottom:25.4%;
  &__img{
    width:100%;
  }
}
.icons{
  margin-top:.12rem;
  display: flex;
  flex-wrap:wrap;
  &__item {
    width:20%;
    padding:.02rem 0;
    &__img{
      display: block;
      width:.4rem;
      height:.4rem;
      margin:0 auto;
    }
    &__desc{
      text-align: center;
      margin-top:0.06rem;
      color:$content-fontcolor
    }
  }
}
.gap{
  height:.06rem;
  margin:0 -.18rem;
  background:$content-bgColor;
}
</style>