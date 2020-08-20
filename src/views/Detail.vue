<template>
  <div class="container-fluid">
    <div class="row align-items-center" v-total-height>
      <div class="col">
        <div class="row" v-if="isLoading">
          <div class="col text-center">
            <TheSpinner />
          </div>
        </div>
        <div class="row mt-5" v-if="!isLoading">
          <div class="col-12 col-lg-6 text-center mb-5">
            <div
              class="img-fluid"
              v-bind:style="{ backgroundImage: `url('${image}')` }"
            ></div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="card text-center">
              <div class="card-header">
                <h4>{{ animal.name }}</h4>
              </div>
              <div class="card-body">
                <p class="text-left">{{ animal.description }}</p>
                <p class="text-left">Weight: {{ animal.weight }} lbs</p>
                <p class="text-left">Height: {{ animal.height }} cm</p>
              </div>
              <div class="card-footer text-muted">
                <button
                  class="btn btn-primary"
                  type="button"
                  v-on:click="back()"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <h4>Related animals</h4>
            <hr />
          </div>
        </div>
        <div class="row mt-4" v-if="!isLoadingRelated && related.length === 0">
          <div class="col text-center">
            <h4>No records to show</h4>
          </div>
        </div>
        <div class="row mt-4" v-if="isLoadingRelated">
          <div class="col text-center">
            <TheSpinner />
          </div>
        </div>
        <div class="row mt-4" v-if="!isLoadingRelated">
          <div
            class="col-lg-4 col-sm-6 col-12 text-center mb-4"
            v-for="(item, index) in related"
            :key="index"
          >
            <AnimalBox
              :name="item.name"
              :image="item.image"
              :description="item.description"
              :height="item.height"
              :weight="item.weight"
              :id="item.id"
              :showView="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import TotalHeight from "../directives/total-height";
import { Animals } from "../interaces/animals";
import AnimalService from "../services/animals.service";
import TheSpinner from "../components/TheSpinner.vue";
import AnimalBox from "../components/AnimalBox.vue";

@Component({
  directives: {
    "total-height": TotalHeight
  },
  components: {
    TheSpinner,
    AnimalBox
  }
})
export default class Detail extends Vue {
  private isLoading = true;
  private isLoadingRelated = true;
  private animal: Animals = {} as Animals;
  private related: Array<Animals> = [];
  @Prop({ required: true, type: String, default: "0" }) id: string;

  mounted() {
    this.getDetail(parseInt(this.id));
    this.getRelated(parseInt(this.id));
  }

  private getDetail(id: number): void {
    this.isLoading = true;
    AnimalService.getDetail(id)
      .then(data => {
        this.animal = data;
        this.isLoading = false;
      })
      .catch(e => {
        this.isLoading = false;
        if (e.response && e.response.status === 404) {
          this.$router.push("/not-found");
        }
      });
  }

  private getRelated(id: number): void {
    this.isLoadingRelated = true;
    AnimalService.getRelated(id)
      .then(data => {
        this.related = data;
        this.isLoadingRelated = false;
      })
      .catch(() => (this.isLoadingRelated = false));
  }

  get image() {
    if (this.animal && this.animal.image) {
      return require(`../assets/images/${this.animal.image}`);
    }

    return "";
  }

  public back(): void {
    window.history.back();
  }
}
</script>
<style lang="scss" scoped>
.img-fluid {
  height: 30rem;
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
