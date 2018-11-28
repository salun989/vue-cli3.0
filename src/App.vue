<template>
  <div id="app">

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from 'components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  mounted(){
      this.login()
  },
  methods:{
      login(){

          this.$http.post('/bapi/login?mobile=15811314608&code=1').then(res=>{
              console.log(res)
              //this.$router.push({name:'Marketingcenter'})
          })
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
