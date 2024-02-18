<template>
  <div class="containerBox" style="position: relative;">
    <div id="container" style="width: calc(100vw - 650px); height: calc(100vh - 150px)"></div>
    <div id="js-properties-panel" class="panel"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, markRaw } from "vue";
// 汉化js
import translate from '@/assets/bpmnjs/translate'
// bpmn-js相关
import BpmnModeler from "bpmn-js/lib/Modeler"; // 引入相关的依赖
import "bpmn-js/dist/assets/diagram-js.css"; // 左边工具栏以及编辑节点的样式
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
// bpmn-js-properties-panel相关
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css"; // 右边工具栏样式
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";

let customTranslateModule = {
  translate: ["value", translate]
};
const bpmnModeler = ref<any>({}); // bpmn建模器

onMounted(() => {
  bpmnModeler.value = markRaw(
    new BpmnModeler({
      container: "#container", //设置容器document
      // 添加控制面板
      propertiesPanel: {
        parent: "#js-properties-panel"
      },
      // 右侧属性面板
      additionalModules: [customTranslateModule, propertiesPanelModule, propertiesProviderModule],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    })
  );
  bpmnModeler.value.createDiagram(() => {
    // 自适应大小
    bpmnModeler.value.get("canvas").zoom("fit-viewport");
  });

  // 注册事件监听
  //  registerEventBus();
});

const registerEventBus = () => {
  // 获取bpmn.js的EventBus。通过打印eventBus可以查看支持的所有EventBus： console.log(eventBus);
  const eventBus: EventBus = bpmnModeler.value.get("eventBus");
  // 注册节点事件，eventTypes中可以写多个事件，需要哪些写那些
  const eventTypes = ["element.click"];
  eventTypes.forEach(eventType => {
    eventBus.on(eventType, (e: { element: any }) => {
      const { element } = e;
      if (!element.parent) return;
      if (!e || element.type === "bpmn:Process") {
        return false;
      } else {
        if (eventType === "element.click") {
          // TODO 节点点击后想要做的处理
          console.log("点击的节点数据", element);
        }
      }
    });
  });
};

const downloadXml = () => {
  bpmnModeler.value.saveXML({ format: true }).then(res => {
    console.log("画出的xml数据为", res);
  });
};
const creteXml = () => {
  bpmnModeler.value.importXML(``);
};
</script>



<style scoped lang="scss">
.containerBox {
  height: calc(100vh - 160px);
  margin-top: 30px;
}

.containerBox #container {
  height: calc(100vh - 160px);
  border: 1px solid rgb(121, 121, 121);
}

.bpp-properties-panel [type="text"] {
  box-sizing: border-box;
}

.panel {
  width: 400px;
  position: absolute;
  top: 1px;
  right: 1px;
  height: 100%;
  overflow: auto;
}

/* 右下角logo */
.bjs-powered-by {
  display: none;
}
</style>