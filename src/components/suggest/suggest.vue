<template lang="html">
    <scroll ref="suggestList" :beforeScroll="beforeScroll" :pullup="pullup" :data="result" class="suggest" @scrollToEnd="searchMore" @beforeScroll="listScroll">
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getSingerName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉!您搜索的结果不存在"></no-result>
        </div>
    </scroll>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {getSong} from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import NoResult from 'base/no-result/no-result'
import {mapMutations,mapActions} from 'vuex'

const TYPE_SINGGER = 'singer'
const perpage = 20

export default {
    props: {
        query: {
            type: String,
            default: ''
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            page: 1,
            result: [],
            pullup: true,
            beforeScroll: true,
            hasMore: true
        }
    },
    methods: {
        getIconCls(item) {
            if(item.type === TYPE_SINGGER) {
                return 'icon-mine'
            }else{
                return 'icon-music'
            }
        },
        getSingerName(item) {
            if(item.type === TYPE_SINGGER) {
                return `${item.singername}`
            }else{
                return `${item.name}-${item.singer}`
            }
        },
        listScroll() {
            this.$emit('listScroll')
        },
        refresh() {
            this.$refs.suggestList.refresh()
        },
        selectItem(item) {
            if(item.type === TYPE_SINGGER) {
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                })
                this.$router.push({
                    path: `/search/${singer.id}`
                })
                this.setSinger(singer)
            }else{
                this.insertSong(item)
            }
            this.$emit('select')
        },
        search() {
            this.page = 1
            this.hasMore = true
            search(this.query,this.page,this.showSinger,perpage).then((res) => {
                if(res.code === ERR_OK) {
                    this.result = this._genResult(res.data)
                    this._checkMore(res.data)
                }
            })
        },
        searchMore() {
            if(!this.hasMore) {
                return
            }
            this.page ++
            search(this.query,this.page,this.showSinger,perpage).then((res) => {
                if(res.code === ERR_OK) {
                    this.result = this.result.concat(this._genResult(res.data))
                    this._checkMore(res.data)
                }
            })
        },
        _checkMore(data) {
            if(!data.song.list || (data.song.curnum + this.page * perpage) >= data.song.totalnum) {
                this.hasMore = false
            }
        },
        _genResult(searchData) {
            let ret = [];
            if(searchData.zhida && searchData.zhida.singerid){
                ret.push({...searchData.zhida,...{type : TYPE_SINGGER}})
            }
            if(searchData.song) {
                ret = ret.concat(this._normalizeSongs(searchData.song.list))
            }
            return ret
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((musicDate) => {
                if(musicDate.songid && musicDate.albumid) {
                    ret.push(getSong(musicDate))
                }
            })
            return ret
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        ...mapActions([
            'insertSong'
        ])
    },
    watch: {
        query() {
            this.search()
        }
    },
    components: {
        Scroll,
        Loading,
        NoResult
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    .suggest
        height: 100%
        overflow: hidden
        .suggest-list
            padding: 0 30px
            .suggest-item
                display: flex
                align-items: center
                padding-bottom: 20px
                .icon
                    flex: 0 0 30px
                    width: 30px
                    [class^="icon-"]
                        font-size: 14px
                        color: $color-text-d
                .name
                    flex: 1
                    font-size: $font-size-medium
                    color: $color-text-d
                    overflow: hidden
                    .text
                        no-wrap()
        .no-result-wrapper
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
