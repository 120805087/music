import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'

export function getSingerList() {
    let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

    let data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0
    })

    return jsonp(url, data, options)
}

export function getSingerDetail(singerID) {
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';

    let data = Object.assign({}, commonParams, {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        begin: 0,
        num: 100,
        songstatus: 1,
        singermid: singerID
    })

    return jsonp(url, data, options)
}
