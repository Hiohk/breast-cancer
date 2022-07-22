import request from '@/utils/request'

const api_name = `/bcra/questionnaire`

export default {
  //获取问卷答案
  getQuesAnswer(id) {
    return request({
      url: `${api_name}/response/queryById/${id}`,
      method: 'get',
    })
  },
  //获取问题5模块答案
  getFamilyModuleAnswer(questionnaireResponseId) {
    return request({
      url: `/bcra/family/response/find/${questionnaireResponseId}`,
      method: 'get',
    })
  },
  //获取问题6模块答案
  getGeneModuleAnswer(questionnaireResponseId) {
    return request({
      url: `/bcra/gene/response/find/${questionnaireResponseId}`,
      method: 'get',
    })
  }
}