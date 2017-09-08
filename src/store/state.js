import {playMode} from 'common/js/config'

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequencelist: [],
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    topList: []
}

export default state
