<template>
  <div class="card">
    <div
      class="card-img-top"
      v-bind:style="{ backgroundImage: `url('${urlImage}')` }"
      alt="Image"
    ></div>
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">{{ description }}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Weight: {{ weight }} lbs</li>
      <li class="list-group-item">Height: {{ height }} cm</li>
    </ul>
    <div class="card-body text-center" v-if="showView">
      <button class="btn btn-primary" v-on:click="goToDetail()">View</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Random extends Vue {
  @Prop({ required: true, type: Number, default: 0 }) id: number;
  @Prop({ required: true, type: String, default: "" }) name: string;
  @Prop({ required: true, type: String, default: "" }) image: string;
  @Prop({ required: true, type: String, default: "" }) description: string;
  @Prop({ required: true, type: Number, default: 0 }) weight: number;
  @Prop({ required: true, type: Number, default: 0 }) height: number;
  @Prop({ type: Boolean, default: true }) showView: boolean;

  get urlImage() {
    return require(`../assets/images/${this.image}`);
  }
  private goToDetail(): void {
    this.$router.push(`/detail/${this.id}`);
  }
}
</script>
<style lang="scss" scoped>
.card-img-top {
  height: 15rem;
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.card-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
