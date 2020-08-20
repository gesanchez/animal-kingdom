<template>
  <div class="container-fluid">
    <div class="row align-items-center" v-total-height>
      <div class="col-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4 text-center">
        <img alt="404" class="img-fluid" src="../assets/images/404.png" />
        <div class="mt-4">
          <button class="btn btn-primary" type="button" v-on:click="goHome">
            Go Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import TotalHeight from "../directives/total-height";
export default Vue.extend({
  directives: {
    "total-height": TotalHeight
  },
  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
});
</script>
