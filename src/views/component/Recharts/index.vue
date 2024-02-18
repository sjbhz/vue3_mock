<template>
  <div ref="myChartsRef" :style="{ height: height, width: width }" :option="option" />
</template>

<script setup lang="ts">
import { ECharts, EChartsOption, init } from "echarts";
import { ref, inject, watch, onMounted, onBeforeUnmount } from "vue";
// const Echarts = inject("$echarts"); //通过inject 接收echarts

// 定义props
interface Props {
  width?: string;
  height?: string;
  option: EChartsOption;
}

const props = withDefaults(defineProps<Props>(), {
  width: "100%",
  height: "100%",
  option: () => ({})
});

const myChartsRef = ref<HTMLDivElement>();
let myChart: ECharts;
let timer: string | number | Nodejs.Timeout | undefined;

//初始化
const initChart = () => {
  if (myChart != undefined) {
    myChart.dispose();
  }
  myChart = init(myChartsRef.value as HTMLDivElement);
  myChart?.setOption(props.option, true);
};
// 重新渲染
const resizeChart = () => {
  timer = setTimeout(() => {
    if (myChart) {
      myChart.resize();
    }
  }, 500);
};
watch(
  props.option,
  () => {
    initChart();
  },
  {
    deep: true
  }
);
onMounted(() => {
  initChart();
  window.addEventListener("resize", resizeChart);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  clearTimeout(timer);
  timer = 0;
});
</script>



<style scoped>
</style>
