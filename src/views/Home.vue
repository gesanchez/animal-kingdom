<template>
  <div class="container-fluid">
    <div class="row align-items-center" v-total-height>
      <div class="col">
        <div class="row mt-4 mb-4" v-if="getAnimals.length > 0">
          <div class="col text-right">
            <TheOrder v-on:changed="changedOrder" :disabled="isLoading" />
          </div>
        </div>
        <div class="row">
          <div
            class="col-lg-4 col-12 col-md-6 mt-4"
            v-for="(item, index) in getAnimals"
            :key="index"
          >
            <AnimalBox
              :name="item.name"
              :image="item.image"
              :description="item.description"
              :height="item.height"
              :weight="item.weight"
              :id="item.id"
            />
          </div>
        </div>
        <div class="row" v-if="isLoading">
          <div class="col text-center">
            <TheSpinner />
          </div>
        </div>
        <div class="row mt-5" v-if="getAnimals.length === 0 && !isLoading">
          <div class="col text-center">
            <p>No records to show</p>
          </div>
        </div>
        <div
          class="row mt-5"
          v-if="getAnimals.length > 0 && isLoadMore && !isLoading"
        >
          <div class="col text-center">
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="loadMoreAction(category, order)"
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import TheSpinner from "../components/TheSpinner.vue";
import TotalHeight from "../directives/total-height";
import { Getter, Action } from "vuex-class";
import { Animals } from "../interaces/animals";
import Types from "../store/animals/types";
import AnimalBox from "../components/AnimalBox.vue";
import TheOrder from "../components/TheOrder.vue";

@Component({
  components: {
    TheSpinner,
    AnimalBox,
    TheOrder
  },
  directives: {
    "total-height": TotalHeight
  }
})
export default class Home extends Vue {
  private isLoading = true;
  private order = "view";
  @Prop({ type: String, default: "" }) category: string;
  @Getter(`Animals/${Types.getters.GETANIMALS}`) getAnimals: Array<Animals>;
  @Getter(`Animals/${Types.getters.LOADMORE}`) isLoadMore: boolean;
  @Action(`Animals/${Types.actions.LOADANIMALS}`) loadAnimals;
  @Action(`Animals/${Types.actions.LOADMORE}`) loadMore;

  mounted() {
    this.initialLoad(this.category, this.order);
  }

  private initialLoad(category?: string, order?: string): void {
    this.loadAnimals({ category, order })
      .then(() => (this.isLoading = false))
      .catch(() => (this.isLoading = false));
  }

  private loadMoreAction(category?: string, order?: string): void {
    this.isLoading = true;
    this.loadMore({ category, order })
      .then(() => (this.isLoading = false))
      .catch(() => (this.isLoading = false));
  }

  private changedOrder(order: string): void {
    this.order = order;
    this.initialLoad(this.category, order);
  }

  @Watch("category")
  changedCategory(newVal: string): void {
    this.initialLoad(newVal, this.order);
  }
}
</script>
