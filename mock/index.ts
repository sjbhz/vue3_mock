import Mock from "mockjs";
import { MockMethod } from "vite-plugin-mock";
import { createFakeUserList, } from "./test/Mlogin";
import { createFakeRoleList } from "./test/MRole";

export default [
  {
    // 登录
    url: "/api/user/login",
    method: "post",
    response: ({ body }) => {
      return { code: 200, data: createFakeUserList() };
    },
  },
  {
    // 角色列表
    url: "/api/role/list",
    method: "get",
    response: ({ body }) => {
      return { code: 200, data: createFakeRoleList() };
    },
  },
  {
    // 一条角色详情
    url: "/api/role/getone",
    method: "get",
    response: ({ body }) => {
      return { code: 200, data: createFakeRoleList() };
    },
  },
  {
    // 添加角色 
    url: "/api/role/add",
    method: "post",
    response: ({ body }) => {
      return { code: 200, data: '添加成功' };
    },
  },
  {
    // 添加角色 
    url: "/api/role/edit",
    method: "post",
    response: ({ body }) => {
      return { code: 200, data: '编辑成功' };
    },
  },
  {
    // 删除角色 
    url: "/api/role/delete",
    method: "post",
    response: ({ body }) => {
      return { code: 200, data: '删除成功' };
    },
  },
] as MockMethod[];
