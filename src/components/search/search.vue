<template lang="html">
    <div class="search">
        <div class="search-box-wrapper">
            <search-box @query="onQueryChange" ref="searchBox"></search-box>
        </div>
        <div v-show="!query" class="shortcut-wrapper">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li @click="setSearchQuery(item.k)" class="item" v-for="item in hotKey">
                            <span>{{item.k}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-show="query" class="search-result">
            <suggest :query="query"></suggest>
        </div>
    </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from 'components/suggest/suggest'
export default {
    data() {
        return {
            hotKey: [],
            query: ''
        }
    },
    created() {
        this._getHotKey()
    },
    methods: {
        onQueryChange(query) {
            this.query = query
        },
        setSearchQuery(key) {
            this.$refs.searchBox.setSearchQuery(key)
        },
        _getHotKey() {
            getHotKey().then((res) => {
                this.hotKey = res.data.hotkey.slice(0,11)
            })
        }
    },
    components: {
        SearchBox,
        Suggest
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .search
        .search-box-wrapper
            margin: 20px
        .shortcut-wrapper
            position: fixed
            top: 178px
            bottom: 0
            width: 100%
            .shortcut
                height: 100%
                overflow: hidden
                .hot-key
                    margin: 0 20px 20px 20px
                    .title
                        margin-bottom: 20px
                        font-size: $font-size-medium
                        color: $color-text-l
                    .item
                        display: inline-block
                        padding: 5px 10px
                        margin: 0 20px 10px 0
                        border-radius: 6px
                        background: $color-highlight-background
                        font-size: $font-size-medium
                        color: $color-text-d
        .search-result
            position: fixed
            width: 100%
            top: 178px
            bottom: 0
</style>
