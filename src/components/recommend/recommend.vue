<template lang="html">
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div class="slider-wrapper" v-if="recommends.length">
                    <slider>
                        <div v-for="item in recommends">
                            <a :href="item.linkUrl">
                                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推介</h1>
                    <ul>
                        <li v-for="item in discList" class="item">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.imgurl" alt="">
                            </div>
                            <div class="text">
                                <h3 class="name" v-html="item.creator.name"></h3>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading title="图片正在加载..."></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import {getReaommend,getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
    data() {
        return {
            recommends: [],
            discList: []
        }
    },
    components: {
        Slider,
        Scroll,
        Loading
    },
    created() {
        this._getRecommend()
        this._getDiscList()
    },
    methods: {
        _getRecommend() {
            getReaommend().then((res) => {
                if(res.code === ERR_OK){
                    this.recommends = res.data.slider;
                    console.log(res.data.slider);
                }
            })
        },
        _getDiscList() {
            getDiscList().then((res) => {
                if(res.code === ERR_OK) {
                    this.discList = res.data.list;
                    console.log(res.data.list)
                }
            })
        },
        loadImage() {
            setTimeout(() => {
                if(!this.checkLoad) {
                    this.$refs.scroll.refresh();
                    this.checkLoad = true;
                }
            }, 20);
        }
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
            .item
                display: flex
                box-sizing: border-box
                align-item: center
                padding: 0 20px 20px 20px
                .icon
                    flex: 0 0 60px
                    width: 60px
                    padding-right: 20px
                .text
                    display: flex
                    flex-direction: column
                    justify-content: center
                    flex: 1
                    line-height: 20px
                    overflow: hidden
                    font-size: $font-size-medium
                    .name
                        margin-bottom: 10px
                        color: $color-text
                    .desc
                        color: $color-text-d
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
