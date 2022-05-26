import { useStore } from 'vuex'
import { toRefs,computed } from 'vue';

export const useCommonEffert=(shopId)=>{
    const store=useStore();
    const { CartList }=toRefs(store.state);
    const addItemToCart=(shopId,productid,productinfo)=>{
        store.commit('addItemToCart',{
            shopId,productid,productinfo
        })
    }
    const downItemToCart=(shopId,productid,productinfo)=>{
        if(store.state.cartList?.[shopId]?.[productid]?.count===0)
        {
            return;
        }
         store.commit('downItemToCart',{
            shopId,productid,productinfo
        })
    }
    const cartList = store.state.cartList;
    const total=computed(()=>{
        const productLists=cartList[shopId]?.productList;
        const shopName=cartList[shopId]?.shopName;
          let count=0;
          let summoney=0;
          if(productLists)
          {
              for(let i in productLists)
              {
                  const product=productLists[i]
                  count+=product.count;
                  if(product.check)
                  {
                    summoney+=product.count*product.price;
                  }
              }
          }
          const productList={}
          for(let i in productLists)
          {
            const product=productLists[i];
            if(product.count>0)
            {
                productList[i]=product;
            }
          }
        //   返回加购数量，总金额，商品列表，店铺名称
          return [count,summoney.toFixed(2),productList,shopName];
      });
    return {CartList,addItemToCart,downItemToCart,total};

}