<template>
  <div>
      <input v-model='userName'>
      <input type="password" v-model="password" >
      <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
export default {
    name:'login_page',
    data(){
        return {
            userName:'',
            password:''
        }
    },
    methods:{
        handleLogin:()=>{
            
        }
    }
}
</script>

<style lang='less'>

</style>