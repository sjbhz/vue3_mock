<template>
  <div class="common-layout">
    <el-container style="height:100vh">
      <el-header class="head_index">
        <h2 class="title_index">
          <img src="./../../public/logo.png" width="30px" height="30px" style="margin-right:10px" />
          <span>XX管理系统</span>
          <!-- 菜单右侧方折叠按钮 -->
          <el-text class="icon_title collapse_index" @click="closeCollapse">
            <el-icon>
              <Fold />
            </el-icon>
          </el-text>
        </h2>

        <div class="right-setting">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-icon>
                <Setting />
              </el-icon>
              <span class="setting-btn">系统设置</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>账号中心</el-dropdown-item>
                <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-container>
        <el-aside :width="isCollapse ? '60px' : '200px'" class="aside_index">
          <el-menu
            router
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical"
            :default-active="defaultActive"
            text-color="#fff"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
          >
            <el-sub-menu index="/overview">
              <template #title>
                <el-icon>
                  <HomeFilled />
                </el-icon>
                <span>总览管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/overview">实时总览</el-menu-item>
                <el-menu-item index="/mine">个人管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="/system">
              <template #title>
                <el-icon>
                  <Memo />
                </el-icon>
                <span>菜单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/system">菜单管理</el-menu-item>
                <el-menu-item index="/dictionary">字典管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="/role">
              <template #title>
                <el-icon>
                  <User />
                </el-icon>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/userManage">用户管理</el-menu-item>
                <el-menu-item index="/role">角色管理</el-menu-item>
                <el-menu-item index="/setpwd">修改密码</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="/roomManage">
              <template #title>
                <el-icon>
                  <OfficeBuilding />
                </el-icon>
                <span>房间管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/roomManage">房间管理</el-menu-item>
                <el-menu-item index="/roomType">房型管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="/mail">
              <template #title>
                <el-icon>
                  <Comment />
                </el-icon>
                <span>信息管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/mail">邮箱管理</el-menu-item>
                <el-menu-item index="/message">留言管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon>
                  <document />
                </el-icon>
                <span>流程图管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/basic">组件管理</el-menu-item>
                <el-menu-item index="/bpmnjs">bpmnjs流程图</el-menu-item>
                <el-menu-item index="/x6">x6流程图</el-menu-item>
                <el-menu-item index="/jsplumb">jsplumb流程图</el-menu-item>
                <el-menu-item index="/logicflow">logicflow流程图</el-menu-item>
                <el-menu-item index="/vueflow">vueflow流程图</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>

        <el-main class="main_index">
          <TabsView></TabsView>

          <div
            style="border:1px solid #5ab1ef;margin:5px"
            v-if="router.currentRoute.value.path=='/system' || router.currentRoute.value.path=='/dictionary'"
          >
            <el-card>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/overview' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item
                  :to="{ path: router.currentRoute.value.path }"
                >{{ breadcrume_t }}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-card>
          </div>
          <router-view style="padding:8px"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script setup lang="ts">
import { ref, reactive, toRaw, onMounted, computed } from "vue";
import { ElMessageBox, } from 'element-plus'
import type { Action } from 'element-plus'
import { useRouter } from 'vue-router';
import router from "./../router";
import useUser from '../store/user'
import { accessRoutes } from './../router/constLeftRoute'
import TabsView from './tabs/TabsView.vue'

const userRouter = useRouter()
const userStore = useUser()
const defaultActive = ref('/overview')
const isCollapse = ref(false);
// 获取当前的面包屑名字
const breadcrume_t = computed(
  () => {
    let target = accessRoutes.find(ii => ii.path == userRouter.currentRoute.value.path)
    if (target) {
      return target.meta.title
    } else {
      return ''
    }
  }
)

const closeCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

onMounted(() => {
  if (userStore.user.loginId) {
    userRouter.push('/')
  }

})

const handleOpen = (key: string, keyPath: string[]) => {
  console.log("handleOpen", key, keyPath,);

};
const handleClose = (key: string, keyPath: string[]) => {
  console.log("handleClose", key, keyPath);
};

const handleSelect = (key: string, keyPath: string[]) => {
  console.log("handleSelect", key, keyPath);
  // defaultActive = key

  // let target = toRaw(leftMenu).find(i => {
  //   return i.key == key;
  // });
  // if (target) {
  //   let keyPath = target.path;
  //   router.replace(keyPath);
  // }
};

const exit = () => {
  ElMessageBox.alert('确认退出？', '提示', {
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      userStore.clearUser()
      router.push('/login')
    },
  })

}
</script>
  
<style scoped lang="scss">
.common-layout {
  // height: 100vw;

  .head_index {
    background: #545c64;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .right-setting {
      cursor: pointer;
      align-items: center;
      .el-dropdown-link {
        color: #fff;
      }

      .setting-btn {
        margin-left: 5px;
      }
    }

    .title_index {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      display: flex;
      // justify-content: center;
      font-family: "Courier New", Courier, monospace;
      color: #fff;

      .title_icon {
        margin-right: 10px;
      }

      .icon_title {
        height: 50px;
        line-height: 50px;
        color: #fff;
      }

      .collapse_index {
        font-size: 20px;
        margin-left: 30px;
        cursor: pointer;
      }
    }
  }

  .aside_index {
    background: #545c64;
    // height: 100vw;

    ::v-deep .el-menu {
      border-right: none;
    }

    .el-menu-vertical:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }

  ::v-deep .el-main {
    padding: 0;
    overflow: hidden;
  }
  .main_index {
    // padding: 10px;
  }
}
</style>