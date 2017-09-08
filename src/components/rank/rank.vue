<template lang="html">
    <div class="rank" ref="rank">
        <scroll :data="topList" class="toplist" ref="topList">
            <ul>
                <li class="item" v-show="item.id !== 201" v-for="item in topList" @click="selectItem(item)">
                    <div class="icon">
                        <img width="100px" height="100px" v-lazy="item.picUrl" alt="">
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(list,index) in item.songList">
                            <span>{{index+1}}</span>
                            <span>{{list.singername}}-{{list.songname}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="loading-container" v-show="!topList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
import {getTopList} from 'api/rank'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
export default {
    mixins: [
        playlistMixin
    ],
    data() {
        return {
            topList: []
        }
    },
    created() {
        this._getTopList()
    },
    methods: {
        selectItem(item) {
            this.$router.push({
                path: `/rank/${item.id}`
            })
            this.setTopList(item)
        },
        _getTopList() {
            getTopList().then((res) => {
                this.topList = res.data.topList
            })
        },
        handlePlaylist(playlist) {
            const bottom = playlist.length ? '60px' : '0'
            this.$refs.rank.style.bottom = bottom
            this.$refs.topList.refresh()
        },
        ...mapMutations({
            setTopList : 'SET_TOP_LIST'
        })
    },
    components: {
        Scroll,
        Loading
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    .rank
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .toplist
            height: 100%
            overflow: hidden
            .item
                display: flex
                margin: 0 20px
                padding-top: 20px
                height: 100px
                &:last-child
                    padding-bottom: 20px
                .icon
                    flex: 0 0 100px
                    width: 100px
                    height: 100px
                .songlist
                    flex: 1
                    display: flex
                    flex-direction: column
                    justify-content: center
                    padding: 0 20px
                    height: 100px
                    overflow: hidden
                    background: $color-highlight-background
                    color: $color-text-d
                    font-size: $font-size-small
                    .song
                        no-wrap()
                        line-height: 26px
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>
