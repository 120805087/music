import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
    let url = '/api/Lyric';
    let data = Object.assign({},commonParams,{
        pcachetime: new Date(),
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        platform: 'yqq',
        needNewCode: 0,
        songmid: mid
    })
    return axios.get(url,{
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
