<template>
  <div class="container" ref="container"></div>
</template>

<script>
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";

export default {
  mounted() {
    this.lf = new LogicFlow({
      container: this.$refs.container,
      grid: true
    });
    this.lf.render();
  }
};
</script>

<style scoped>
.container {
  width: 98%;
  height: 550px;
}
</style>
