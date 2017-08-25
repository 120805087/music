<template lang="html">
    <transition name="slide">
        <music-list :bg-image="bgImage" :title="title" :songs="singerData"></music-list>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {getSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
    computed: {
        bgImage() {
            return this.singer.avatar
        },
        title() {
            return this.singer.name
        },
        ...mapGetters([
            'singer'
        ])
    },
    data() {
        return {
            singerData: []
        }
    },
    created() {
        this._getDateil()
    },
    methods: {
        _getDateil() {
            if(!this.singer.id) {
                this.$router.push('/singer')
                return;
            }
            getSingerDetail(this.singer.id).then((res) => {
                if(res.code === ERR_OK) {
                    this.singerData = this._normalizeSingerList(res.data.list)
                }
            })
        },
        _normalizeSingerList(list) {
            let ret = [];
            list.forEach((item) => {
                let {musicData} = item;
                if(musicData.songid && musicData.albummid) {
                    ret.push(getSong(musicData))
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

    .slide-enter-active,.slide-leave-active
        transition: all 0.3s
    .slide-enter,.slide-leave-to
        transform: translate3d(100%,0,0)
</style>
