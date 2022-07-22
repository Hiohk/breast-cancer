import request from '@/utils/request'

const api_name = `/bcra/questionnaire`

export default {
  //获取一份问卷
  getQuestionnaire(questionnaireId) {
    return request({
      url: `${api_name}/get/${questionnaireId}`,
      method: 'get',
    })
  },
  //问卷提交
  submitQuestionnaire(searchObj) {
    return request({
      url: `/bcra/questionnaire/response/addQuestionnaireResponse`,
      method: 'post',
      data: searchObj
    })
  },

  //个人与家族病史模块提交
  submitFamilyModuleAnswer(responseId, familyModuleAnswer) {
    return request({
      url: `/bcra/family/response/add/${responseId}`,
      method: 'post',
      data: familyModuleAnswer
    })
  },
  //个人与家族病史模块修改信息
  updateFamilyModuleAnswer(familyModuleAnswer) {
    return request({
      url: `/bcra/family/response/update`,
      method: 'post',
      data: familyModuleAnswer
    })
  },
  //基因模块提交
  submitGeneModuleAnswer(responseId, geneModuleAnswer) {
    return request({
      url: `/bcra/gene/response/add/${responseId}`,
      method: 'post',
      data: geneModuleAnswer
    })
  },
  //基因模块提交修改信息
  updateGeneModuleAnswer(geneModuleAnswer) {
    return request({
      url: `/bcra/gene/response/update`,
      method: 'post',
      data: geneModuleAnswer
    })
  },
  //删除文件
  deleteFile(fileId) {
    return request({
      url: `/bcra/file/remove`,
      method: 'post',
      params: {
        fileId
      },
    })
  },
  //更新文件的responseId
  updateFileResponseId(fileIds, responseId) {
    return request({
      url: `/bcra/file/update`,
      method: 'post',
      params: {
        responseId
      },
      data: fileIds
    })
  },
  updateQuestionnaireNotes(id,notes) {
    return request({
      url: `${api_name}/response/updateQuestionnaireResponse/${id}/${notes}`,
      method: 'post',
    })
  }
}
