import request from '@/utils/get'

const api_name = `/analysis`

export default {
    //细胞学活检

    //添加数据
    cellBiopsyPost(cell) {
        return request({
            url: `/`,
            method: 'post',
            data: cell,
            dataType: "jsonp",
        })
    },
    //查询数据表
    cellBiopsyGet() {
        return request({
            url: `/analysis`,
            method: 'get',
        })
    },
    //删除数据
    cellBiopsyDelete(id) {
        return request({
            url: `/delete/${id}`,
            method: 'post',
            data: id,
            dataType: "jsonp",
        })
    },

    //血常规分析
    //添加数据
    bloodAnalysisPost(blood) {
        return request({
            url: `/blood`,
            method: 'post',
            data: blood,
            dataType: "jsonp",
        })
    },
    //查询数据表
    bloodAnalysisGet() {
        return request({
            url: `/bloodlist`,
            method: 'get',
        })
    },
    //删除数据
    bloodAnalysisDelete(id) {
        return request({
            url: `/deleteblood/${id}`,
            method: 'post',
            data: id,
            dataType: "jsonp",
        })
    },
}