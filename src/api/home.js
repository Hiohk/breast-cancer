import request from '@/utils/request'

const api_name = `/bcra/user`

export default {
  //分页查询用户信息列表
  getAllUser(pageNum,pageSize,param) {
    return request({
      url: `${api_name}/queryAll/${pageNum}/${pageSize}`,
      method: 'post',
      data:param
    })
  },
  //根据手机号查询用户
  getByPhone(phone){
    return request({
      url: `${api_name}/query/${phone}`,
      method: 'get',

    })
  },
  //问卷条件分页查询
  queryQuestionnaireList(pageNum,pageSize,searchObj){
    return request({
      url: `/bcra/questionnaire/response/queryAll/${pageNum}/${pageSize}`,
      method: 'post',
      data: searchObj
    })
  },
  //用户界面的删除问卷操作
  deleteQuestionnaire(id){
    return request({
      url:`/bcra/questionnaire/response/deleteQuestionnaireResponse/${id}`,
      method:'delete',
   })
  },
//修改密码
  resetPassword(username,phone,newPass){
      return request({
        url:`${api_name}/password/${phone}/${username}/${newPass}`,
        method:'post',
     })
}
}