<template>
  <div ref="container" style="margin-left:200px">
    <div ref="sourceElement">Source</div>
    <div ref="targetElement">Target</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { jsPlumb } from "jsplumb";
import panzoom from "panzoom";

const container = ref<HTMLElement | null>(null);
const sourceElement = ref<HTMLElement | null>(null);
const targetElement = ref<HTMLElement | null>(null);

onMounted(() => {
  //创建 jsplumb 实例
  const jsPlumbInstance = jsPlumb.getInstance();
  //初始化jsPlumb 实例设置
  if (container.value) {
    jsPlumbInstance.setContainer(container.value);
  }

  //创建连接线
  if (sourceElement.value && targetElement.value) {
    jsPlumbInstance.connect({
      source: sourceElement.value,
      target: targetElement.value,
      endpoint: "Rectangle",
      anchor: ["Left", "Right"]
    });
    jsPlumbInstance.draggable("item_left");
    jsPlumbInstance.draggable("item_right");
  }
});
</script>



<style scoped>

</style>
