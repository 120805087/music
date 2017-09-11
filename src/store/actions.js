import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/unit'

function findIndex(list,song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}
export const selectPlay = function({commit,state},{list,index}) {
    commit(types.SET_SEQUENCE_LIST,list)
    if(state.mode === playMode.random) {
        let randomlist = shuffle(list)
        commit(types.SET_PLAY_LIST,randomlist)
        index = findIndex(randomlist,list[index])
    }else{
        commit(types.SET_PLAY_LIST,list)
    }
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

export const randomPlay = function({commit},{list}) {
    commit(types.SET_PLAY_MODE,playMode.random)
    commit(types.SET_SEQUENCE_LIST,list)
    let randomlist = shuffle(list)
    commit(types.SET_PLAY_LIST,randomlist)
    commit(types.SET_CURRENT_INDEX,0)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

export const insertSong = function({commit,state},song) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequencelist.slice()
    let currentIndex = state.currentIndex

    //记录当前的歌曲
    let currentSong = playlist[currentIndex]

    //查找当前列表中是否已经存在要添加的歌曲
    let fpIndex = findIndex(playlist,song)

    //因为是要插入歌曲，所以当前的索引要加1
    currentIndex++
    console.log(currentIndex)
    playlist.splice(currentIndex,0,song)
    //如果当前列表中存在当前添加的歌曲
    if(fpIndex > -1) {
        if(currentIndex > fpIndex) {
            playlist.splice(fpIndex,1)
            currentIndex--
        }else{
            playlist.splice(fpIndex+1,1)
        }
    }

    let currentSIndex = findIndex(sequenceList,currentSong) + 1

    let fsIndex = findIndex(sequenceList,song)

    sequenceList.splice(currentSIndex,0,song)

    if(fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }

    commit(types.SET_PLAY_LIST,playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const saveSeachHistory = function ({commit,state},query) {

}
