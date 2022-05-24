import { useStore } from 'vuex'
import { toRefs } from 'vue';

export const useCommonEffert=()=>{
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
    return {CartList,addItemToCart,downItemToCart};

}