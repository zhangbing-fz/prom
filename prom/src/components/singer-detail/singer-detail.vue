<template>
    <!-- 增加一个转场动画 -->
    <transition name="slide">
        <musiclist :title="title" :bgImage="bgImage" :songList="songList"></musiclist>
    </transition>
</template>

<script>
    import musiclist from "../music-list/music-list"
    import { mapGetters } from "vuex";
    import axios from "axios";

    export default {
        name: 'singer-detail',
        data() {
            return {
                songList: [], //具体歌曲信息
            }
        },
        props: {},
        watch: {},
        methods: {
            _getDetail(mid) {
                let data = { //存储mid
                    mid: mid
                };
                //发送请求
                axios.post("http://localhost:1110/api/getSingerDetailData", JSON.stringify(data)).then((data) => {
                    // eslint-disable-next-line no-console
                    // console.log(data);
                    this.songList = data.data.songList
                })
            }
        },
        computed: {
            ...mapGetters([
                "singer"
            ]),
            title() { //歌手名称
                return this.singer.singer_name;
            },
            bgImage() { //歌曲图片
                return this.singer.singer_pic;
            },
            mid() { //歌手id
                return this.singer.singer_mid;
            }
        },
        created() {
            this._getDetail(this.mid)
        },
        mounted() {

        },
        components:{
            musiclist,
        }
    }
</script>

<style scoped lang="stylus">
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>