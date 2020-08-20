<template>
  <div class="container-fluid">
    <div class="row align-items-center" v-total-height>
      <div
        class="col-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4"
        v-if="!isLoading"
      >
        <AnimalBox
          :name="animal.name"
          :image="animal.image"
          :description="animal.description"
          :height="animal.height"
          :weight="animal.weight"
          :id="animal.id"
        />
      </div>
      <div class="col-12 text-center" v-if="isLoading">
        <TheSpinner />
      </div>
      <div class="col-12 text-center mt-3" v-if="!isLoading">
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="anotherAnimal()"
        >
          View another
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TotalHeight from "../directives/total-height";
import { Animals } from "../interaces/animals";
import AnimalService from "../services/animals.service";
import AnimalBox from "../components/AnimalBox.vue";
import TheSpinner from "../components/TheSpinner.vue";

@Component({
  directives: {
    "total-height": TotalHeight
  },
  components: {
    AnimalBox,
    TheSpinner
  }
})
export default class Random extends Vue {
  private isLoading = true;
  private animal: Animals = {} as Animals;

  mounted() {
    this.anotherAnimal();
  }
  private anotherAnimal(): void {
    this.isLoading = true;
    AnimalService.getRandom()
      .then(data => {
        this.animal = data;
        this.isLoading = false;
      })
      .catch(() => (this.isLoading = false));
  }
}
</script>
