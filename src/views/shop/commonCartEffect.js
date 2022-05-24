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
        const productList=cartList[shopId]?.productList;
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
    return {CartList,addItemToCart,downItemToCart,total};

}