<template>
  <div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      closable
      @tab-remove="removeTab"
      @tab-change="clickTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.path"
        :label="item.meta?.title"
        :name="item.meta?.title"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { accessRoutes } from "./../../router/constLeftRoute";

// 定义tabs的类型
type TabsItem = {
  path: string;
  name: string;
  meta: {
    title: string;
  };
}[];

const route = useRoute();
const userRouter = useRouter();
const editableTabsValue = ref("/overview");
// 标签页列表--初始化及页面展示的列表（后续应放在store中保存）
const editableTabs = ref([
  {
    path: "/overview",
    name: "overview",
    meta: {
      title: "实时总览"
    }
  }
]);
const removeTab = (targetName: any) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  tabs.forEach((tab, index) => {
    if (tab.meta.title === targetName) {
      tabs.splice(index, 1);
      const nextTab = tabs[index + 1] || tabs[index - 1];
      if (nextTab) {
        activeName = nextTab.meta.title;
      }
    }
  });
};
const clickTab = (targetName: string) => {
  let targetItem = accessRoutes.filter(i => i.meta.title == targetName);
  userRouter.push(targetItem[0].path); //路由跳转
};

const addTab = (targetName: TabsItem) => {
  editableTabs.value.push(targetName[0]);
  editableTabsValue.value = targetName[0].path;
};

watch(
  () => route.fullPath,
  () => {
    if (editableTabs.value.some(n => n.path == route.path)) return;
    let addItem = accessRoutes.filter(i => i.path == route.path);
    addTab(addItem);
  }
);
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
