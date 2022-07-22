import request from '@/utils/get'


export default {
  //获取验证码
  getValidVcode() {
    return request({
      url: `/vcode`,
      method: 'get'
    })
  },
  //登录验证
  loginValidate(loginForm) {
    return request({
      url: `/login`,
      method: 'post',
      data: loginForm,
      dataType: "jsonp"
    })
  },
  //注册操作
  register(user) {
    return request({
      url: `/register`,
      method: 'post',
      data: user,
      dataType: "jsonp"
    })
  },
  //用户删除操作
  // deleteUser(id) {
  //   return request({
  //     url: `${api_name}/deleteUser/${id}`,
  //     method: 'delete'
  //   })
  // }

}