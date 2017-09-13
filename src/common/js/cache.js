import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

function inserArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)

    if(index === 0) {
        return
    }
    if(index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)

    if(maxLen && arr.length > maxLen) {
        arr.pop()
    }
}
function deleteFormArray(arr, compare) {
    let index = arr.findIndex(compare)

    if(index > -1) {
        arr.splice(index, 1)
    }
}

export function saveSearch(query) {
    const searchs = storage.get(SEARCH_KEY,[])
    inserArray(searchs, query, (item) => {
        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY,searchs)
    return searchs
}

export function loadSearch() {
    return storage.get(SEARCH_KEY,[])
}

export function deleteSearch(query) {
    const searchs = storage.get(SEARCH_KEY,[])
    deleteFormArray(searchs, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searchs)
    return searchs
}
export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}

export function savePlay(song) {
    const songs = storage.get(PLAY_KEY,[])
    inserArray(songs,song,(item) => {
        return item.id === song.id
    }, PLAY_MAX_LENGTH)
    storage.set(PLAY_KEY,songs)
    return songs
}
export function loadPlay() {
    return storage.get(PLAY_KEY,[])
}
