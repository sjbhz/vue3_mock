<template>
  <div>
    <div :style="{  height: '250px' }">
      <Echarts :option="option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Echarts from "@/views/component/Recharts/index.vue";
import { reactive } from "vue";

const option = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      label: {
        show: true
      }
    }
  },
  grid: {
    left: "4%",
    top: "15%",
    right: "4%",
    bottom: "10%"
  },
  legend: {
    data: ["昨日总人数", "今日实时人数"],
    top: "4%",
    color: "#1FC3CE",
    fontSize: 14,
    selected: { 昨日使用率: false } // 不需要显示的设置为false
  },
  xAxis: {
    data: [
      "会议室1",
      "会议室2",
      "会议室3",
      "会议室4",
      "会议室5",
      "会议室6",
      "会议室7",
      "会议室8",
      "会议室9"
    ],
    axisLine: {
      show: true, //隐藏X轴轴线
      lineStyle: {
        color: "#eee",
        width: 1
      }
    },
    axisTick: {
      show: true, //隐藏X轴刻度
      alignWithLabel: true
    },
    axisLabel: {
      show: true,
      color: "#333", //X轴文字颜色
      fontSize: 14
    }
  },
  yAxis: [
    {
      type: "value",
      name: "人数",
      nameTextStyle: {
        color: "#333",
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "#eee"
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        color: "#333",
        fontSize: 14
      }
    }
  ],
  series: [
    {
      name: "昨日总人数",
      type: "bar",
      barWidth: "20%",
      itemStyle: {
        color: {
          type: "linear",
          x: 0, // 右
          y: 1, // 下
          x2: 0, // 左
          y2: 0, // 上
          colorStops: [
            {
              offset: 0,
              color: "#5ab1ef" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#b6a2de" // 100% 处的颜色
            }
          ]
        }
      },
      data: [24, 45, 43, 35, 76, 154, 86, 42, 68]
    },
    {
      name: "今日实时人数",
      type: "bar",
      barWidth: "20%",
      itemStyle: {
        color: {
          type: "linear",
          x: 0, // 右
          y: 1, // 下
          x2: 0, // 左
          y2: 0, // 上
          colorStops: [
            {
              offset: 0,
              color: "#67e0e3" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#409EFF" // 100% 处的颜色
            }
          ]
        }
      },
      data: [133, 23, 114, 67, 89, 35, 67, 96, 90]
    }
  ]
});
</script>
