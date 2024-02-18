<template>
   <router-view></router-view>
</template>

<script setup lang="ts">
// 利用sessionStorage进行持久化
import useStore from './store/user'
const userStore = useStore()

if (sessionStorage.getItem('user')) {
   let user = sessionStorage.getItem('user')
   userStore.setUser(user)

}

</script>



<style scoped></style>
