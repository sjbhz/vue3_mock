import { $get, $post } from "../utils/request";
import { md5 } from "md5js";

//登录接口
export const $Login = async (params: any = {}) => {
  // params.loginPwd = md5(params.loginPwd, 32).split("").reverse().join()
  return await $post("/api/user/login", params);
};
//获取一条用户的详情
export const $GetOne = async (params: any = {}) => {
    return await $get("/api/user/getone", params);
};
