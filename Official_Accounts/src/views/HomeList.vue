<template>
    <div class="HomeList">
        <!-- 在线客服 -->
        <van-swipe :autoplay="3000" style="width: 100vw;">
            <van-swipe-item v-for="(image, index) in images" v-bind:key="index">
                <img src="../../src/assets/image/banner1.png" width="100%" />
            </van-swipe-item>
        </van-swipe>
        
        <div class="content-enter">
            <ul>
                <li>
                    <a href="javascript: alert('暂无');">
                        
                        <img src="../assets/image/zyyw_tcjf.png" alt />
                    </a>
                </li>
                <li>
                    <a href="http://hxjdown.ychel.com/sycl/index.html">
                        <img src="../assets/image/zyyw_zcyc.png" alt />
                    </a>
                </li>
                <li>
                    <a href="http://symp88.ychel.net/mob/">
                        <img src="../assets/image/zyyw_symp.png" alt />
                    </a>
                </li>
                <li>
                    <a href="https://vcard.zhyinfo.cn/WeChat/index">
                        <img src="../assets/image/zyyw_ylfw.png" alt />
                    </a>
                </li>
                <li>
                    <a href="javascript: alert('暂无');">
                        <img src="../assets/image/zyyw_jktj.png" alt />
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";

export default {
    data() {
        return {
            images: [
                "https://img.yzcdn.cn/vant/apple-1.jpg",
            ]
        };
    },
    computed: {},
    components: {}
};
</script>

<style scoped>
.HomeList {
    width: 100vw;
    max-height: 100vh;
    display: flex;
    flex-flow: wrap;
    background-color: white;
    background-size: contain;
}
.content-enter {
    margin: 20px;
    margin-top: 0;
}
.content-enter ul li a img {
    width: 100%;
}
.content-enter ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
}
.content-enter ul li {
    margin-top: 20px;
    width: 46%;
}
.content-foot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 0 20px 20px;
}
.content-foot h4 {
    margin: 10px 0;
}
.content-foot .btn {
    width: 180px;
    line-height: 30px;
    border: 1px solid #ccc;
    display: block;
    color: white;
    border-radius: 15px;
}
</style>
