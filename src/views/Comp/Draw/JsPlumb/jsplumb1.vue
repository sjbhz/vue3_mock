<template>
  <div id="centerRelative">
    <div
      v-for="item in nodeList"
      :id="item.id"
      :key="item.id"
      :style="{
              color: item.color,
              left: item.x + 'px',
              top: item.y + 'px',
          }"
      class="item node-anchor"
      style="display: flex; justify-content: center; align-items: center"
   
    >
    <!-- @contextmenu.prevent="handleContextMenu" -->
      //4个连接点的位置，瞄点
      <div class="node-anchor anchor-top"></div>
      <div class="node-anchor anchor-bottom"></div>
      <div class="node-anchor anchor-right"></div>
      <div class="node-anchor anchor-left"></div>//节点名称
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Center"
};
</script>

<script setup>
import { reactive, toRefs, onMounted, nextTick } from "vue";
//右键菜单
// import { $contextmenu } from "vue-contextmenu-next/index";
//随机id
import { GenNonDuplicateID } from "../../unti/unti.js";
//jsplumbp配置
import {
  jsplumbSetting,
  jsplumbConnectOptions,
  jsplumbSourceOptions,
  jsplumbTargetOptions
} from "../../unti/commonConfig.js";
//引入jsplumb实例
import jsPlumb from "jsplumb";

let $jsPlumb = jsPlumb.jsPlumb;
// 缓存实例化的jsplumb对象
let jsPlumb_instance = null;
// let configJsplumbData = configJsplumb();
let data = reactive({
  jsplumbSettingConfig: jsplumbSetting,
  jsplumbConnectOptionsConfig: jsplumbConnectOptions,
  jsplumbSourceOptionsConfig: jsplumbSourceOptions,
  jsplumbTargetOptionsConfig: jsplumbTargetOptions,
  nodeList: [],
  lineList: []
});
let {
  nodeList, //节点数据
  lineList, //连线数组
  jsplumbTargetOptionsConfig,
  jsplumbSourceOptionsConfig,
  jsplumbConnectOptionsConfig,
  jsplumbSettingConfig
} = toRefs(data);
console.log(
  jsplumbSettingConfig,
  jsplumbConnectOptionsConfig,
  jsplumbSourceOptionsConfig,
  jsplumbTargetOptionsConfig
);

onMounted(() => {
  //jsplumb默认是注册在浏览器窗口的，将整个页面提供给我们作为一个实例，所以可以使用   getInstance方法建立页面中一个独立的实例：
  jsPlumb_instance = $jsPlumb.getInstance();
  nodeList.value = [
    {
      id: "Mfzcx4apkafHBYATbdz6hFYntSHsXtDz",
      x: 335,
      y: 103,
      type: "node",
      name: "kaishi1",
      color: "#5a9cf8"
    },
    {
      id: "sGsGhyhEJBsCSmRaAw8xJK3iaefcrKDX",
      x: 833,
      y: 79,
      type: "statr",
      name: "开始",
      color: "#479A52"
    },
    {
      id: "sGsGhyhEJBsCSmRaAw8xJK3iaefcrKDl",
      x: 833,
      y: 150,
      type: "statr",
      name: "开始",
      color: "#479A52"
    },
    {
      id: "sGsGhyhEJBsCSmRaAw8xJK3iaefcrKDl11",
      x: 833,
      y: 300,
      type: "statr",
      name: "开始11111",
      color: "#479A52"
    }
  ];
  nextTick(() => {
    //因为jsplimb要在dom元素加载之后才能执行，因为他的原理是找到你绑定的画布dom去渲染svg数据，所以必须得画布dom已经渲染之后才能初始化
    init();
  });
});

//初始化
const init = () => {
  //ready监听jsplumb是否实例化，当jsplumb实例化执行ready内的方法，
  jsPlumb_instance.ready(() => {
    //给jsplumb设置一些默认值
    jsPlumb_instance.importDefaults(jsplumbSettingConfig.value);
    loadEasyFlow();
    // 会使整个jsPlumb立即重绘。
    jsPlumb_instance.setSuspendDrawing(false, true);
  });
};

//加载流程图-初始化节点，使节点可以拖拽
const loadEasyFlow = () => {
  // 初始化节点
  for (let i = 0; i < nodeList.value.length; i++) {
    let node = nodeList.value[i];
    // 设置源点，可以拖出线连接其他节点
    jsPlumb_instance.makeSource(node.id, jsplumbSourceOptionsConfig.value);
    // // 设置目标点，其他源点拖出的线可以连接该节点
    jsPlumb_instance.makeTarget(node.id, jsplumbTargetOptionsConfig.value);
    // this.jsPlumb.draggable(node.id);
    //画布节点添加拖拽方法
    draggableNode(node.id);

    jsPlumb_instance.unbind("connection"); //取消连接事件
    for (let i = 0; i < lineList.value.length; i++) {
      let line = this.data.lineList[i];
      jsPlumb_instance.connect(
        {
          source: line.from,
          target: line.to
        },
        jsplumbConnectOptionsConfig.value
      );
    }
    //连线
    jsPlumb_instance.bind("connection", evt => {
      let from = evt.source.id;
      let to = evt.target.id;
      lineList.value.push({
        from: from,
        to: to,
        label: "", //连线名称
        id: GenNonDuplicateID(8),
        Remark: ""
      });
    });
  }
};

//给画布节点添加拖拽方法
const draggableNode = nodeId => {
  console.log(nodeId, "nodeId");
  jsPlumb_instance.draggable(nodeId, {
    grid: [5, 5],
    containment: "center",
    drag: event => {
      window.event
        ? (window.event.cancelBubble = true)
        : event.stopPropagation();
      return false;
    },
    stop: event => {
      let nodeIndex = nodeList.value.findIndex(x => x.id === nodeId);
      Object.assign(nodeList.value[nodeIndex], {
        x: event.pos[0],
        y: event.pos[1]
      });
    }
  });
};

//右键菜单
const handleContextMenu = $event => {
  $contextmenu({
    x: $event.x,
    y: $event.y,
    customLayoutClass: "customLayoutClass",
    menuList: [
      {
        text: "删除",
        icon: "DeleteFilled",
        onClick: () => {}
      },
      {
        text: "复制",
        icon: "DocumentCopy",
        onClick: () => {}
      },
      {
        text: "多选删除",
        icon: "IceCream",
        onClick: () => {}
      },
      {
        text: "多选复制",
        icon: "Link",
        onClick: () => {}
      },
      {
        text: "多选拖拽",
        icon: "Location",
        onClick: () => {}
      }
    ]
  });
};

//右键菜单消失
const rightClick = () => {
  document.querySelectorAll(".customLayoutClass")[0].style.display = "none";
};

watch(
  configJsplumbData.jslumbSortData,
  () => {
    if (configJsplumbData.jslumbSortData.length > 0) {
      let list = configJsplumbData.jslumbSortData[0];
      nodeList.value.push(list);
      //从左侧拖拽添加节点,添加新的节点后，要重绘画布
      nextTick(() => {
        jsPlumb_instance.makeSource(list.id, jsplumbSourceOptionsConfig.value);
        jsPlumb_instance.makeTarget(list.id, jsplumbConnectOptionsConfig.value);
        draggableNode(list.id);
      });
    }
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<style lang="scss" scoped>
#centerRelative {
  position: relative;
  width: 100%;
  height: 100%;
  .item {
    position: absolute;
    text-align: center;
    padding: 5px 10px;
    border: 1px solid #eaeaea;
    width: 180px;
    height: 20px;
    font-size: 14px;
    cursor: pointer;
    background: white;
  }
}
</style>

<style lang="scss">
.customLayoutClass {
  width: 152px !important;
  .context-menu-item {
    font-size: 13px;
    height: 29px;
    padding: 0;
    .arrow {
      .icon {
        width: 0.7rem;
      }
    }
  }
}
.node-anchor {
  width: 10px;
  height: 10px;
  border: 1px solid red;
  z-index: 333;
}
.anchor-top {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 48%;
  margin-top: -6px;
}
.anchor-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: 48%;
  margin-bottom: -6px;
}
.anchor-right {
  position: absolute;
  right: 0;
  margin-right: -7px;
}
.anchor-left {
  position: absolute;
  left: 0;
  margin-left: -7px;
}
</style>
