import { $get, $post } from '../utils/request'

// 返回角色列表
export const $list = async () => {
    return await $get('/api/role/list')
}

// 添加角色
export const $addRole = async (param: any = {}) => {
    return await $post('/api/role/add', param)
}

//获取一条角色的详情
export const $getRoleOne = async (params: any = {}) => {
    return await $get("/api/role/getone", params);
}

//编辑角色
export const $editRole = async (param: any = {}) => {
    return await $post('/api/role/edit', param)
}

// 删除角色
export const $deleteRole = async (params: any = {}) => {
    return await $post('/api/role/delete',params)
}

