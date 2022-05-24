<template>
  <div class="wrapper">
    <StaticPart />
    <nearby />
  </div>
    <docker />
</template>

<script>
import Nearby from './Nearby.vue'
import StaticPart from './StaticPart.vue'
import Docker from './Docker.vue'

export default {
  name: 'Home',
  components:{
    StaticPart,Nearby,Docker
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper{
  overflow-y:auto ;
  position:absolute;
  left:0;
  top:0;
  bottom:.5rem;
  right:0;
  padding:0 .18rem;
}




</style>
