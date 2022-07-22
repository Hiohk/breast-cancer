import request from '@/utils/request'

const api_name = `/bcra/user`
//修改个人信息
export default {
updateById(user){
    return request({
        url: `${api_name}/update`,
        method: 'post',
        data:user
      })
}
}