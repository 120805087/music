import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'

export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
    const data = Object.assign({}, commonParams, {
        format: 'json',
        platform:　'h5',
        needNewCode: 1
    })
    return jsonp(url, data, options)
}

export function search(query,page,catZhida,perpage) {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

    const data = Object.assign({}, commonParams, {
        w: query,
        p: page,
        catZhida: catZhida ? 1 : 0,
        perpage: perpage,
        n: perpage,
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        zhidaqu: 1,
        remoteplace: 'txt.mqq.all'
    })

    return jsonp(url, data, options)
}
