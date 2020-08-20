<template>
  <nav
    class="navbar navbar--bg-concrete navbar-expand-lg navbar-light fixed-top justify-content-right"
  >
    <router-link class="navbar-brand" to="/">
      <img alt="Brand" class="navbar__brand" src="../assets/images/brand.png" />
      Animal Kingdom
    </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <router-link
          to="/"
          exact
          v-slot="{ href, route, navigate, isActive, isExactActive }"
        >
          <li
            class="nav-item"
            :class="[
              isActive && 'active',
              isExactActive && 'router-link-exact-active'
            ]"
          >
            <a
              class="nav-link"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              :href="href"
              @click="navigate"
            >
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </router-link>

        <router-link
          v-for="(item, index) in getCategories"
          :key="index"
          class="footer__link-options"
          :to="{ name: 'Home', query: { category: item.title } }"
          v-slot="{ href, route, navigate, isActive, isExactActive }"
          exact
        >
          <li
            class="nav-item"
            :class="[
              isActive && 'active',
              isExactActive && 'router-link-exact-active'
            ]"
          >
            <a
              class="nav-link"
              :href="href"
              @click="navigate"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              {{ item.title }}
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </router-link>

        <router-link
          v-if="getCategories.length > 0"
          to="/random"
          exact
          v-slot="{ href, route, navigate, isActive, isExactActive }"
        >
          <li
            class="nav-item"
            :class="[
              isActive && 'active',
              isExactActive && 'router-link-exact-active'
            ]"
          >
            <a
              class="nav-link"
              :href="href"
              @click="navigate"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              Random
            </a>
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import Types from "../store/categories/types";
import { Category } from "../interaces/category";

@Component
export default class TheMenu extends Vue {
  @Getter(`Categories/${Types.getters.GETCATEGORIES}`) getCategories: Array<
    Category
  >;
}
</script>

<style lang="scss" scoped>
$wrap: "navbar";
.#{$wrap} {
  &__brand {
    width: 30px;
    height: 30px;
  }
  &--bg-concrete {
    background-color: #95a5a6;
    color: #fff;
  }
}
</style>
