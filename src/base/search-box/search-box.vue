<template lang="html">
    <div class="search-box">
        <i class="icon-search"></i>
        <input ref="imput" class="box" v-model="query" type="text" :placeholder="placeholder">
        <i @click="clear" v-show="query" class="icon-dismiss"></i>
    </div>
</template>

<script>
import {debounce} from 'common/js/unit'
export default {
    props: {
        placeholder: {
            type: String,
            default: "搜索歌曲、歌单"
        }
    },
    data() {
        return {
            query: ''
        }
    },
    methods: {
        setSearchQuery(key) {
            this.query = key
        },
        clear() {
            this.query = ''
        },
        blur() {
            this.$refs.imput.blur()
        }
    },
    created() {
        this.$watch('query',debounce((newQuery) => {
            this.$emit('query',newQuery)
        },200))
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"

    .search-box
        display: flex
        align-items: center
        box-sizing: border-box
        width: 100%
        padding: 0 6px
        height: 40px
        background: $color-highlight-background
        border-radius: 6px
        .icon-search
            font-size: 24px
            color: $color-background
       .box
            flex: 1
            margin: 0 5px
            line-height: 18px
            background: $color-highlight-background
            color: $color-text
            font-size: $font-size-medium
            &::placeholder
                color: $color-text-d
       .icon-dismiss
            font-size: 16px
            color: $color-background
</style>
