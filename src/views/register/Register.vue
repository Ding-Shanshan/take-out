<template>
    <div class="wrapper">
        <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
        <div class="wrapper__input">
            <input class="wrapper__input__content" v-model="data.username" placeholder="请输入用户名" />
        </div>
        <div class="wrapper__input">
            <input class="wrapper__input__content" v-model="data.password" placeholder="请输入密码" type="password" autocomplete="new-password"/>
        </div>
         <div class="wrapper__input">
            <input class="wrapper__input__content" v-model="data.ensurement" placeholder="确认密码" type="password" autocomplete="new-password"/>
        </div>
        <div class="wrapper__register-button" @click="handleRegisterClick">注册</div>
        <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
        <Toast v-if="toastData.showToast" :message="toastData.toastMessage"/>
    </div>
</template>

<script>
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import { post } from '../../utils/request'
import Toast,{useToastEffect} from '../../components/Toast.vue'

const useRegisterEffect=(showToast)=>{
     const data=reactive(
                {
                username:'',
                password:'',
                ensurement:''
                });
      const router=useRouter();
      const handleRegisterClick=async ()=>{
            try{
                const result=await post('/api/user/register',{
                    username:data.username,
                    password:data.password,
                })
                if(result.errno===0)
                {
                    router.push({name:'Login'});
                }else{
                   showToast("注册失败!")
                }
            }catch(e){
                showToast("请求失败!")
            }  
        };
        const handleLoginClick=()=>{
            router.push({name:'Login'});
       }
       return {data,handleRegisterClick,handleLoginClick}
}

export default {
    name:'Register',
    components:{
        Toast
    },
    setup(){
        const {toastData,showToast}=useToastEffect();
        const  {data,handleRegisterClick,handleLoginClick}=useRegisterEffect(showToast);
        return {handleLoginClick,handleRegisterClick,toastData,data}
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.wrapper{
    position:absolute;
    top:50%;
    left:0;
    right:0;
    transform:translateY(-50%);
    &__img{
        display: block;
        margin:0 auto .4rem auto;
        width:.66rem;
        height:.66rem;
    }
    &__input{
        box-sizing: border-box;
        height:.48rem;
        margin:0 .4rem .16rem .4rem;
        padding:0 .16rem;
        background:#f9f9f9;
        border:.01rem solid rgba(0,0,0,0.1);
        border-radius: .06rem;
        border-radius: .06rem;
        &__content{
            line-height: .48rem;
            border:none;
            outline: none;
            width:100%;
            background: none;
            font-size:.16rem;
            color:rgba(0,0,0,0.5);
            &::placeholder{
                color:$content-notice-fontcolor;
            }
        }
    }
     &__register-button{
            text-align: center;
            margin:.32rem .4rem 0 .4rem;
            line-height: .48rem;
            background:$btnColor;
            box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
            border-radius: .04rem;
            color:$bgColor;
            font-size:.18rem;
            letter-spacing: .05rem;
            cursor:pointer
        }
     &__register-link{
            text-align: center;
            margin-top:.18rem;
            color:$content-notice-fontcolor;
            font-size:.16rem;
            cursor:pointer;
        }
}
</style>