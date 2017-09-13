import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/unit'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal){
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('components must implement handlePlaylist methods')
        }
    }
}
export const playModeMixin = {
    computed: {
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'sequencelist',
            'playlist',
            'currentSong',
            'mode'
        ])
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = []
            if(mode === playMode.random) {
                list = shuffle(this.sequencelist)
            }else{
                list = this.sequencelist
            }
            this.resetCurrentIndex(list)
            this.setPlaylist(list)
        },
        resetCurrentIndex(list) {
            let index =  list.findIndex((item) => {
                return  item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        ...mapMutations({
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayingState: 'SET_PLAYING_STATE',
            setPlayMode: 'SET_PLAY_MODE',
            setPlaylist: 'SET_PLAY_LIST'
        }),
    }
}

export const searchMixin = {
    data() {
        return {
            query:''
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ])
    },
    methods: {
        onQueryChange(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchBox.blur()
        },
        setSearchQuery(key) {
            this.$refs.searchBox.setSearchQuery(key)
        },
        saveSearch() {
            this.saveSeachHistory(this.query)
        },
        ...mapActions([
            'saveSeachHistory',
            'deleteSearchHistory'
        ])
    }
}
