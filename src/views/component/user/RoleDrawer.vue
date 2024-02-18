<template>
  <div>
    <el-drawer
      v-model="drawerVisiable"
      :title="titleDrawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <span>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="50px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色" prop="roleName">
            <el-input v-model="ruleForm.roleName" size="small" />
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm(ruleFormRef)">
              {{ ruleForm.roleId ? '编辑' :
              '添加' }}
            </el-button>
            <el-button size="small" @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormRules, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { $addRole, $editRole } from '@/api/role'

const drawerVisiable = ref(false)
const direction = ref('rtl')
const titleDrawer = ref('新建角色')
const ruleFormRef = ref<FormInstance>()

const emit = defineEmits(['sync-list'])

const ruleForm = reactive({
    roleId: '',
    roleName: '',
})

const validateRoleName = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入角色名称'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules<typeof ruleForm>>({
    roleName: [{ validator: validateRoleName, trigger: 'blur' }],

})

const handleClose = (done: () => void) => {
    ruleFormRef.value?.resetFields()
    // 关闭弹框，则清空数据
    ruleForm.roleId = ''
    ruleForm.roleName = ''
    done()
}

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('formEl--', formEl, ruleForm)
            //新建表单
            if (ruleForm.roleId == '') {
                $addRole({ ruleForm }).then(({ code, data }) => {
                    if (code == 200) {
                        ElMessage({
                            message: data,
                            type: 'success',
                        })

                        emit('sync-list')   //上报父组件-更新列表

                        ruleFormRef.value?.resetFields()

                    } else {
                        ElMessage({
                            message: data,
                            type: 'error',
                        })
                    }
                })
            }else{
                //编辑表单
                $editRole({ ruleForm }).then(({ code, data }) => {
                    if (code == 200) {
                        ElMessage({
                            message: data,
                            type: 'success',
                        })

                        // ruleFormRef.value?.resetFields()

                    } else {
                        ElMessage({
                            message: data,
                            type: 'error',
                        })
                    }
                })
            }
        }
    })
}



const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

defineExpose({ drawerVisiable, ruleForm, titleDrawer })

</script>
  
<style scoped></style>
  