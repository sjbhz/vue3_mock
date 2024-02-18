<template>
  <div class="role">
    <div class="search">
      <el-button size="small" type="primary" @click="handleAdd">添加</el-button>
    </div>
    <el-table size="small" :data="showRoles" style="width: 100%">
      <el-table-column prop="role" label="编号" width="100" />
      <el-table-column prop="role_name" label="名称" width="250" />
      <el-table-column prop="is_admin" label="管理员" width="100">
        <template #default="scope">
          <el-tag
            class="ml-2"
            :type="scope.row.is_admin?'success':''"
          >{{ scope.row.is_admin?'是':'否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号码" width="150" />
      <el-table-column prop="last_login" label="最后登录" width="150" />
      <el-table-column prop="modules" label="权限模块" width="150" />
      <el-table-column prop="desc" label="备注" />
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.role)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.role)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:10px;float:right"
      v-model:current-page="pageIndex"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next"
      :total="roles.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <RoleDrawer ref="drawerRef" @sync-list="loadRoles" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { $list, $getRoleOne, $deleteRole } from "../../api/role";
import { ElMessage } from "element-plus";
import RoleDrawer from "./../component/user/RoleDrawer.vue";

// 定义组件ref
const drawerRef = ref(null);
// 角色列表变量
let roles = ref([]);
// 页码
let pageIndex = ref(1);
// 每页数据
let pageSize = ref(10);
// 显示的列表
let showRoles = computed(() => {
  return roles.value.slice((pageIndex.value - 1) * 10, pageIndex.value * 10);
});

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  loadRoles();
};
const handleCurrentChange = (val: number) => {
  pageIndex.value = val;
  loadRoles();
};

//加载角色列表
const loadRoles = () => {
  $list().then(({ code, data }) => {
    console.log(code, data);
    if (code == 200) {
      roles.value = data;
    }
  });
};
// 打开抽屉
const handleAdd = () => {
  // 子组件先使用defineExpose暴露出drawerVisiable，父组件再调用子组件中的变量！！！！
  drawerRef.value.drawerVisiable = true;
};

const handleEdit = (role: Number) => {
  handleAdd();
  $getRoleOne({ role }).then(({ code, data }) => {
    console.log(code, data);
    let target = data.find((i: any) => {
      return i.role == role;
    });
    if (target) {
      // 需要RoleDrawer子组件中使用defineExpose暴露出ruleForm，父组件再调用子组件中的变量！！！！
      drawerRef.value.ruleForm.roleName = target.role_name;
      drawerRef.value.ruleForm.roleId = target.role;
      drawerRef.value.titleDrawer = "编辑角色";
    }
  });
};
const handleDelete = (role: Number) => {
  console.log(role);
  $deleteRole({ role }).then(({ code, data }) => {
    if (code == 200) {
      ElMessage({
        message: data,
        type: "success"
      });
    } else {
      ElMessage({
        message: data,
        type: "error"
      });
    }
  });
};

onMounted(() => {
  loadRoles();
});
</script>



<style scoped lang="scss">
.search {
  margin-bottom: 5px;
}
</style>
