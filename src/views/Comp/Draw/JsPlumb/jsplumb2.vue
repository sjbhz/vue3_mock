<template>
  <div ref="container">
    <div class="canvas" ref="canvas"></div>
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
.container{
	background-color: #ffffff;
	width: 100%;
	height: calc(100vh - 52px);
}
.canvas{
	width: 100%;
	height: 100%;
}
.panel{
	position: absolute;
	right: 0;
	top: 0;
	width: 300px;
}
</style>
