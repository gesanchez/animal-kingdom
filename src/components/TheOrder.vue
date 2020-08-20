<template>
  <div class="the-order">
    <span class="the-order__label">Order:</span>
    <select
      class="the-order__select form-control"
      :disabled="disabled"
      v-model="orderSelected"
    >
      <option value="name">By name</option>
      <option value="view" selected>By view</option>
    </select>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator";

@Component
export default class TheOrder extends Vue {
  private orderSelected = "view";
  @Prop({ type: Boolean, default: false }) disabled: boolean;

  @Emit()
  private changed() {
    return this.orderSelected;
  }

  @Watch("orderSelected")
  private changeOrder(): void {
    this.changed();
  }
}
</script>
<style lang="scss" scoped>
$wrap: "the-order";
.#{$wrap} {
  &__label {
    display: inline-block;
    box-sizing: border-box;
    margin-right: 10px;
  }
  &__select {
    display: inline-block;
    box-sizing: border-box;
    width: auto;
  }
}
</style>
