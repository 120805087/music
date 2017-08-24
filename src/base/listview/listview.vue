<template lang="html">
    <scroll class="listview"
        :data="data"
        :listenScroll="listenScroll"
        :probeType="probeType"
        ref="listview"
        @scroll="scroll">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
                        <img class="avatar" v-lazy="item.avatar" alt="">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut">
            <ul>
                <li v-for="(item,index) in shortcutList" class="item" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove"
                :class="{'current': currentIndex === index}"
                :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h2 class="fixed-title">{{fixedTitle}}</h2>
        </div>
        <div v-show="!data.length" class="loading-container" >
            <loading></loading>
        </div>
    </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dome'
import Loading from 'base/loading/loading'

const SHORTCUT_HIGET = 18;
const TITLE_HEIGHT = 30;

export default {
    created() {
        this.touch = {}
        this.listenScroll = true     //created  里面创建的变量vue不会对他实时监控
        this.probeType = 3
        this.listHight = []
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0,
            diff: -1
        }
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    computed: {
        shortcutList() {
            return this.data.map((group) => {
                return group.title.substr(0,1)
            })
        },
        fixedTitle() {
            if(this.scrollY > 0) {
                return ''
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
    },
    components: {
        Scroll,
        Loading
    },
    methods: {
        selectItem(item) {
            this.$emit('selectSinger',item)
        },
        onShortcutTouchStart(e) {
            let shortcutIndex = getData(e.target,'index');
            let firstTouch = e.touches[0].pageY;
            this.touch.y1 = firstTouch;
            this.touch.anchorIndex = shortcutIndex;
            this._scroll(shortcutIndex);
        },
        onShortcutTouchMove(e) {
            let firstTouch = e.touches[0].pageY;
            this.touch.y2 = firstTouch;
            let delta = (this.touch.y2 - this.touch.y1) / SHORTCUT_HIGET | 0 ;
            let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
            this._scroll(anchorIndex);
        },
        scroll(pos){
            this.scrollY = pos.y
        },
        _scroll(index) {
            if(!index && index !== 0) {
                return
            }
            this.scrollY = -this.listHight[index]
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
        },
        _calculateHeight() {
            this.listHight = [];
            let height = 0;
            this.listHight.push(height);
            let list = this.$refs.listGroup;
            for(let i = 0; i < list.length; i++){
                let item = list[i];
                height += item.clientHeight;
                this.listHight.push(height)
            }
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this._calculateHeight()
            }, 20);
        },
        scrollY(newY) {
            //当滚动的顶部时，newY > 0
            if(newY > 0) {
                this.currentIndex = 0;
                return;
            }
            //当我们滚动到中部
            const listHight = this.listHight;
            for(let i = 0; i < listHight.length-1; i++) {
                let listHight1 = listHight[i];
                let listHight2 = listHight[i+1];
                if(-newY >= listHight1 && -newY < listHight2 ) {
                    this.currentIndex = i;
                    this.diff = listHight2 + newY;
                    return;
                }
            }
            //当我们滚动到底部时,且-newY大于我们最后一个元素的上限
            this.currentIndex = listHight.length - 2;
        },
        diff(newDiff) {
            let fixedTop = (newDiff > 0 && newDiff < TITLE_HEIGHT) ? newDiff - TITLE_HEIGHT : 0;
            if(this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop;
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable";

    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: absolute
            right:0
            top: 50%
            transform: translateY(-50%)
            z-index: 30
            width: 20px
            padding: 20px 0
            text-align: center
            border-radius: 10px
            background:$color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
