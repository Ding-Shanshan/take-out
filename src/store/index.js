import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList:{
      //第一层级商铺id
         //第二层商品id:内容是商品内容以及购物数量
       
    }
  },
  getters: {
  },
  mutations: {
    addItemToCart(state,payload){
      const { shopId,productid,productinfo }=payload;
      //shopid为店铺id,shopinfo为店铺中的商品信息，produceid为商品id
      let shopInfo=state.cartList[shopId];
      if(!shopInfo){
        shopInfo={}
      }
      let product=shopInfo[productid]
      if(!product)
      {
        product=productinfo;
        product.count=0;
        product.check=true;
      }
      product.count+=1;
      //更改完信息以后对shopinfo,cartlist重新赋值
      shopInfo[productid]=product;
      state.cartList[shopId]=shopInfo;
    },
    downItemToCart(state,payload){
      const {shopId,productid,productinfo}=payload;
      let shopinfo=state.cartList[shopId];
      let product=shopinfo[productid];
      if(product.count>0)
      {
        product.count-=1;
      }
      shopinfo[productid]=product;
      state.cartList[shopId]=shopinfo;
    },
    changeCartItemChecked(state,payload){
      const {shopId,productId}=payload;
      let product=state.cartList[shopId][productId];
      product.check=!product.check;
    },
    cleanCartProducts(state,payload){
      const {shopId}=payload;
      state.cartList[shopId]={};
    },
    productCheckAll(state,payload){
      const {shopId}=payload;
      const procucts=state.cartList[shopId];
      for(let i in procucts)
      {
        const procuct=procucts[i]
        procuct.check=true;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
