<template lang="html">
    <div class="suggest">
        <ul class="suggest-list">
            <li class="suggest-item">
                <div class="icon">
                    <i></i>
                </div>
                <div class="name">
                    <p class="text"></p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
export default {
    props: {
        query: {
            type: String,
            default: '周杰伦'
        },
        catZhida: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            page: 1
        }
    },
    methods: {
        search() {
            search(this.query,this.page,this.catZhida).then((res) => {
                if(res.code === ERR_OK) {
                    console.log(res.data)
                }
            })
        }
    },
    watch: {
        query() {
            this.search()
        }
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
