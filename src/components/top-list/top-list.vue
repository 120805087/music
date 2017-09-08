<template lang="html">
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from 'api/rank'
import {getSong} from 'common/js/song'
export default {
    data() {
        return {
            songs: [],
            rank: true
        }
    },
    computed: {
        title() {
            return this.topList.topTitle
        },
        bgImage() {
            if(this.songs.length) {
                return this.songs[0].image
            }
        },
        ...mapGetters([
            'topList'
        ])
    },
    created() {
        this._getMusicList()
    },
    methods: {
        _getMusicList() {
            if(!this.topList.id) {
                this.$router.push('/rank')
                return
            }
            getMusicList(this.topList.id).then((res) => {
                this.songs = this._normalizeMusicList(res.songlist)
            })
        },
        _normalizeMusicList(item) {
            let ret = [];
            item.forEach((list) => {
                let musicDate = list.data
                if(musicDate.songid && musicDate.albumid) {
                    ret.push(getSong(musicDate))
                }
            })
            return ret
        }
    },
    components: {
        MusicList
    }
}
</script>

<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
      transition: all 0.3s

    .slide-enter, .slide-leave-to
      transform: translate3d(100%, 0, 0)
</style>
