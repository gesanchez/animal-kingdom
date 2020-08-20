<template>
  <div id="app">
    <TheMenu />
    <div class="container-app">
      <router-view />
    </div>
    <TheFooter />
  </div>
</template>
<script>
import TheMenu from "@/components/TheMenu.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "Home",
  components: {
    TheMenu,
    TheFooter
  }
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
.container-app {
  padding-top: 60px;
  padding-bottom: 40px;
}
</style>
