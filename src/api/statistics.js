import request from '@/utils/request'

const api_name = `/bcra/statistics`

export default {
  //获取一份问卷
  ageDistribution() {
    return request({
      url: `${api_name}/age`,
      method: 'get',
    })
  },
}
