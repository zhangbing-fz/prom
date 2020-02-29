<template>
    <div class="player" v-show="playlist.length>0">
        <transtion name="normal">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <!-- 大的背景图 占据所有 -->
                    <img :src="songData.songPic" alt="" width="100%" height="100%">
                </div>
                <div class="top">
                    <div class="back" @click="back"><!-- 返回按钮 -->
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="songData.songName"></h1><!-- 歌曲名称 -->
                    <h2 class="subtitle" v-html="singer.singer_name"></h2><!-- 歌手名称 -->
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper"><!-- 歌曲唱片设计 CD效果 -->
                            <div class="cd"><img :src="songData.songPic" alt="" class="image"></div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="operators"><!-- 控制按钮区 -->
                        <div class="icon i-left">
                            <i class="icon-sequence"></i><!-- 按顺序播放 -->
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev"></i><!-- 上一首 -->
                        </div>
                        <div class="icon i-center"><!-- 播放按钮 -->
                            <i class="icon-play"></i>
                        </div>
                        <div class="icon i-right"><!-- 下一首 -->
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon">
                            <i class="icon icon-not-favorite"></i><!-- 喜欢/收藏 -->
                        </div>
                    </div>
                </div>
            </div><!-- 全屏播放器 -->
        </transtion>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen"><!-- 迷你播放器 -->
                <div class="icon">
                    <img :src="songData.songPic" alt="" width="40" height="40"><!-- 小型CD -->
                </div>
                <div class="text">
                    <h2 class="name" v-html="songData.songName"></h2>
                    <p class="desc" v-html="singer.singer_name"></p>
                </div>
                <div class="control">

                </div>
                <div class="control">
                    <div class="icon-playlist"></div>
                </div>
            </div><!-- 迷你播放器 -->
        </transition>
        <!--<audio :src="songData.m4aUrl" ref="audio"></audio>-->
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import axios from "axios";

    export default {
        name: "player",
        data() {
            return {
                songData: [],
            }
        },
        computed: {
            //得到基本参数, 当传入的播放列表的时候展开播放器, 并根据播放器的fullscreen参数的不同,选择全屏或是迷你播放器
            ...mapGetters([
                "fullScreen", //全屏模式 Bollean,默认 true
                "playlist",
                "currentSong", //当前歌曲
                "singer", //歌手信息
            ])
        },
        watch: {
            currentSong() {
                // eslint-disable-next-line no-console
                console.log(this.currentSong)
                let data = {
                    mid: this.currentSong.songMid, //获取歌曲的mid
                };
                axios.post("http://127.0.0.1:1110/api/getSongDetailData", JSON.stringify(data)).then((data) => {
                    // eslint-disable-next-line no-console
                    // console.log(data);
                    if (Array.isArray(data.data)) {//同首歌曲可能会有多个版本，返回的可能是Array
                        this.songData = data.data[0]; //多首歌曲，取第一个
                    } else {
                        this.songData = data.data; //只有一个版本的话，直接设置就好
                    }
                })
            }
        },
        methods: {
            ...mapMutations({
                "SET_FULL_SCREEN": "SET_FULL_SCREEN"
            }),
            back() {
                this.SET_FULL_SCREEN(false);
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable.styl"
    @import "../../common/stylus/mixin.styl"


    .player
        .normal-player
            position: fixed
            left: 0
            right: 0
            top: 0
            bottom: 0
            z-index: 150
            background: $color-background

            .background
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                z-index: -1
                opacity: 0.6
                filter: blur(20px)

            .top
                position: relative
                margin-bottom: 25px

                .back
                    position absolute
                    top: 0
                    left: 6px
                    z-index: 50

                    .icon-back
                        display: block
                        padding: 9px
                        font-size: $font-size-large-x
                        color: $color-theme
                        transform: rotate(-90deg)

                .title
                    width: 70%
                    margin: 0 auto
                    line-height: 40px
                    text-align: center
                    no-wrap()
                    font-size: $font-size-large
                    color: $color-text

                .subtitle
                    line-height: 20px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-text

            .middle
                position: fixed
                width: 100%
                top: 80px
                bottom: 170px
                white-space: nowrap
                font-size: 0

                .middle-l
                    display: inline-block
                    vertical-align: top
                    position: relative
                    width: 100%
                    height: 0
                    padding-top: 80%

                    .cd-wrapper
                        position: absolute
                        left: 10%
                        top: 0
                        width: 80%
                        height: 100%

                        .cd
                            width: 100%
                            height: 100%
                            box-sizing: border-box
                            border: 10px solid rgba(255, 255, 255, 0.1)
                            border-radius: 50%

                            &.play
                                animation: rotate 20s linear infinite

                            &.pause
                                animation-play-state: paused

                            .image
                                position: absolute
                                left: 0
                                top: 0
                                width: 100%
                                height: 100%
                                border-radius: 50%

                    .playing-lyric-wrapper
                        width: 80%
                        margin: 30px auto 0 auto
                        overflow: hidden
                        text-align: center

                        .playing-lyric
                            height: 20px
                            line-height: 20px
                            font-size: $font-size-medium
                            color: $color-text-l

                .middle-r
                    display: inline-block
                    vertical-align: top
                    width: 100%
                    height: 100%
                    overflow: hidden

                    .lyric-wrapper
                        width: 80%
                        margin: 0 auto
                        overflow: hidden
                        text-align: center

                        .text
                            line-height: 32px
                            color: $color-text-l
                            font-size: $font-size-medium

                            &.current
                                color: $color-text

            .bottom
                position: absolute
                bottom: 50px
                width: 100%

                .dot-wrapper
                    text-align: center
                    font-size: 0

                    .dot
                        display: inline-block
                        vertical-align: middle
                        margin: 0 4px
                        width: 8px
                        height: 8px
                        border-radius: 50%
                        background: $color-text-l

                        &.active
                            width: 20px
                            border-radius: 5px
                            background: $color-text-ll

                .progress-wrapper
                    display: flex
                    align-items: center
                    width: 80%
                    margin: 0px auto
                    padding: 10px 0

                    .time
                        color: $color-text
                        font-size: $font-size-small
                        flex: 0 0 30px
                        line-height: 30px
                        width: 30px

                        &.time-l
                            text-align: left

                        &.time-r
                            text-align: right

                    .progress-bar-wrapper
                        flex: 1

                .operators
                    display: flex
                    align-items: center

                    .icon
                        flex: 1
                        color: $color-theme

                        &.disable
                            color: $color-theme-d

                        i
                            font-size: 30px

                    .i-left
                        text-align: right

                    .i-center
                        padding: 0 20px
                        text-align: center

                        i
                            font-size: 40px

                    .i-right
                        text-align: left

                    .icon-favorite
                        color: $color-sub-theme

            &.normal-enter-active, &.normal-leave-active
                transition: all 0.4s

                .top, .bottom
                    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)

            &.normal-enter, &.normal-leave-to
                opacity: 0

                .top
                    transform: translate3d(0, -100px, 0)

                .bottom
                    transform: translate3d(0, 100px, 0)

        .mini-player
            display: flex
            align-items: center
            position: fixed
            left: 0
            bottom: 0
            z-index: 180
            width: 100%
            height: 60px
            background: $color-highlight-background

            &.mini-enter-active, &.mini-leave-active
                transition: all 0.4s

            &.mini-enter, &.mini-leave-to
                opacity: 0

            .icon
                flex: 0 0 40px
                width: 40px
                padding: 0 10px 0 20px

                img
                    border-radius: 50%

                    &.play
                        animation: rotate 10s linear infinite

                    &.pause
                        animation-play-state: paused

            .text
                display: flex
                flex-direction: column
                justify-content: center
                flex: 1
                line-height: 20px
                overflow: hidden

                .name
                    margin-bottom: 2px
                    no-wrap()
                    font-size: $font-size-medium
                    color: $color-text

                .desc
                    no-wrap()
                    font-size: $font-size-small
                    color: $color-text-d

            .control
                flex: 0 0 30px
                width: 30px
                padding: 0 10px

                .icon-play-mini, .icon-pause-mini, .icon-playlist
                    font-size: 30px
                    color: $color-theme-d

                .icon-mini
                    font-size: 32px
                    position: absolute
                    left: 0
                    top: 0

    @keyframes rotate
        0%
            transform: rotate(0)
        100%
            transform: rotate(360deg)
</style>