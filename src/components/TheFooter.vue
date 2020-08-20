<template>
  <div class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6 col-12 text-center">
          <img
            alt="Brand"
            class="footer__brand"
            src="../assets/images/brand.png"
          />
          <p class="mt-2">Animal Kingdom, Loremp ipsum lorepm ipsum</p>
        </div>
        <div class="col-lg-6 col-12">
          <div class="row">
            <div class="col-12">
              <h5>Categories</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <router-link to="/" class="footer__link-options">
                Home
              </router-link>
            </div>
            <div
              class="col-6"
              v-for="(item, index) in getCategories"
              :key="index"
            >
              <router-link
                class="footer__link-options"
                :to="{ name: 'Home', query: { category: item.title } }"
                exact
              >
                {{ item.title }}
              </router-link>
            </div>
            <div class="col-6" v-if="getCategories.length > 0">
              <router-link to="/random" class="footer__link-options">
                Random
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-center mb-2">
          2020 @ All right reserved.
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import Types from "../store/categories/types";
import { Category } from "@/interaces/category";

@Component
export default class TheFooter extends Vue {
  @Getter(`Categories/${Types.getters.GETCATEGORIES}`) getCategories: Array<
    Category
  >;
}
</script>
<style lang="scss" scoped>
$wrap: "footer";
.#{$wrap} {
  padding: 10px 0 10px 0;
  background-color: #34495e;
  color: #fff;
  min-height: 50px;
  &__brand {
    width: 100px;
  }

  &__link-options {
    color: #fff;
  }
}
</style>
