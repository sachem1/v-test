<template>
  <div id="main" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: this.$store.state.app.themeColor
    };
  },
  created() {
    //console.log('init menu');
    //let routes = this.$store.state.app.routers;
    this.$router.addRoutes(this.$store.state.app.routers);
    this.$router.options.routes.push(this.$store.state.app.routers);
    // this.$store.commit('updateMenulist');
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
.app-main {
  width: 100%;
  height: 100%;
}
</style>
