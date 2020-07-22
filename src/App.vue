<template>
  <div id="app">
    <router-view></router-view>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  created() {

  },

  methods:{

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
body{
  margin:0;
}
html,body,#app{
  height:100%;
}
</style>
