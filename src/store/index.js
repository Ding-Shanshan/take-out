import { createStore } from 'vuex'

const setLocalCartList=(state)=>{
  const {cartList}=state
  const cartListString=JSON.stringify(cartList)
  localStorage.cartList=cartListString;
}
const getLocalCartList=()=>{
  try{
    return JSON.parse(localStorage.cartList)
  }catch(e){
    return {}
  }
}
export default createStore({
  state: {
    cartList:getLocalCartList()
    // cartList:{}
    // cartList:{
      //第一层级商铺id
         //第二层商品id:内容是商品内容以及购物数量
        //  shopId:{
        //   shopName:'沃尔玛',
        //   productList:{
          //     procuctId:{
          //       "_id": "1",
          //       "name": "番茄 250g / 份",
          //       "imgUrl": "http://www.dell-lee.com/imgs/vue3/tomato.png",
          //       "sales": 10,
          //       "price": 33.6,
          //       "oldPrice": 39.6,
          //       "count":2
          //     }
        //   }
        //  }
    // }
  },
  getters: {
  },
  mutations: {
    //购物车加商品
    addItemToCart(state,payload){
      const { shopId,productid,productinfo }=payload;
      //shopid为店铺id,shopinfo为店铺中的商品信息，produceid为商品id
      let shopInfo=state.cartList[shopId];
      if(!shopInfo){
        shopInfo={shopName:'',productList:{}}
      }
      let product=shopInfo.productList[productid]
      if(!product)
      {
        product=productinfo;
        product.count=0;
        product.check=true;
      }
      product.count+=1;
      //更改完信息以后对shopinfo,cartlist重新赋值
      shopInfo.productList[productid]=product;
      state.cartList[shopId]=shopInfo;
      setLocalCartList(state);
    },
    //购物车减商品
    downItemToCart(state,payload){
      const {shopId,productid,productinfo}=payload;
      let shopinfo=state.cartList[shopId];
      let product=shopinfo.productList[productid];
      if(product.count>0)
      {
        product.count-=1;
      }
      shopinfo.productList[productid]=product;
      state.cartList[shopId]=shopinfo;
      setLocalCartList(state);
    },
    //第一次加商品增加店铺名称
    changeShopName(state,payload){
      const {shopId,shopName}=payload;
      const shopInfo=state.cartList[shopId]||{
        shopName:'',productList:{}
      }
      shopInfo.shopName=shopName
      state.cartList[shopId]=shopInfo;
      setLocalCartList(state);
    },
    //在购物车中是否勾选商品
    changeCartItemChecked(state,payload){
      const {shopId,productId}=payload;
      let product=state.cartList[shopId].productList[productId];
      product.check=!product.check;
      setLocalCartList(state);
    },
    //清空购物车
    cleanCartProducts(state,payload){
      const {shopId}=payload;
      state.cartList[shopId].productList={};
      setLocalCartList(state);
    },
    //购物车中是否全选商品
    productCheckAll(state,payload){
      const {shopId}=payload;
      const procucts=state.cartList[shopId].productList;
      for(let i in procucts)
      {
        const procuct=procucts[i]
        procuct.check=true;
      }
      setLocalCartList(state);
    }
  },
  actions: {
  },
  modules: {
  }
})
