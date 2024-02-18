<template>
  <div class="login">
    <div class="box">
      <h2>酒店信息管理系统</h2>
      <el-form size="small" ref="formRef" :model="formData" status-icon :rules="rules" label-width="40px">
        <el-form-item label="账号" prop="loginId">
          <el-input v-model="formData.loginId" />
        </el-form-item>
        <el-form-item label="密码" prop="loginPwd">
          <el-input v-model="formData.loginPwd" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
          <el-button @click="resetForm(formRef)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
//导入组合式api
import { reactive, ref, toRaw, onMounted } from "vue";
//导入element-plus类型
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
//导入请求api
import { $Login, $GetOne } from "@/api/admin";

import { useRouter } from 'vue-router';
// 导入user全局状态
import useUser from '../store/user'

//导入一个ref对象绑定表单 FormInstance泛型
const formRef = ref<FormInstance>();

const router = useRouter();

// 获取user全局状态
const userStore = useUser()
//表单数据
const formData = reactive({
  loginId: "",
  loginPwd: "",
});

//验证密码
const validateLoginPwd = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};
//验证登录名
const validateLoginId = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof formData>>({
  loginPwd: [{ validator: validateLoginPwd, trigger: "blur" }],
  loginId: [{ validator: validateLoginId, trigger: "blur" }],
});

//提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      $Login(formData).then(({ code, data }) => {
        console.log(code, data)
        let target = data.find((i: any) => {
          return i.username == toRaw(formData.loginId) && i.password == toRaw(formData.loginPwd)
        })
        if (code == 200 && target) {
          ElMessage.success('登录成功！')
          sessionStorage.setItem('token', target.token)

          let user = $GetOne({ loginId: formData.loginId })
          userStore.setUser(user)

          sessionStorage.setItem('user', JSON.stringify(user))
          router.push('/overview'); // router.replace('/home');
        } else {
          ElMessage.error('账号或密码不正确！')
        }

      })

    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

onMounted(() => {
  if (userStore.user.loginId) {
    router.push('/home')

  }
})
</script>



<style scoped lang='scss'>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #142334, #5d80a9);

  display: flex;
  justify-content: center; //水平居中
  align-items: center; //垂直居中

  .box {
    width: 400px;
    //  height: 200px;
    border: 1px solid #fff;
    padding: 20px;

    h2 {
      color: white;
      font-size: 20px;
      text-align: center;
      margin-bottom: 20px;
      font-family: "Courier New", Courier, monospace;
    }

    ::v-deep .el-form-item__label {
      color: #fff;
    }
  }
}
</style>
