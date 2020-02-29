<template>
    <div class="home">
        <div class="home-input">
            <div class="bg"></div>
            <div class="home-content">
                <div class="title">
                    <h2>中盈高科</h2>
                    <h4>成功案例介绍</h4>
                </div>
                <ul>
                    <li>
                        <a
                            href="https://mp.weixin.qq.com/s?__biz=MzAxMjc5MjY2Mw==&mid=503281389&idx=1&sn=374f949b99ef93e92f1976e46926cb1f&scene=19#wechat_redirect"
                        >
                            <img src="../assets/image/zhjz.png" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://mp.weixin.qq.com/s?__biz=MzAxMjc5MjY2Mw==&mid=503282993&idx=1&sn=b948794c54cf56827954afceb9fed5a5&scene=19#wechat_redirect"
                        >
                            <img src="../assets/image/zhsw.png" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://mp.weixin.qq.com/s?__biz=MzAxMjc5MjY2Mw==&mid=503283005&idx=1&sn=0929073065c8a1d60cacc5437e295a3a&scene=19#wechat_redirect"
                        >
                            <img src="../assets/image/zhyl.png" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://mp.weixin.qq.com/s?__biz=MzAxMjc5MjY2Mw==&mid=503283020&idx=1&sn=a4fae59ae6d0bc183533f34e56cb6836&scene=19#wechat_redirect"
                        >
                            <img src="../assets/image/zhsq.png" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://mp.weixin.qq.com/s?__biz=MzAxMjc5MjY2Mw==&mid=503283002&idx=1&sn=0b04d14f148ccc434e3378171c06d396&scene=19#wechat_redirect"
                        >
                            <img src="../assets/image/zhcx.png" />
                        </a>
                    </li>
                    <li>
                        <a href>
                            <img src="../assets/image/zhzw.png" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
    // components: {
    //     HelloWorld
    // }
};
</script>



<style scoped>
.home {
    width: 100vw;
    height: 100vh;
    background-color: rgb(245, 245, 245);
}
.home .home-content .title {
    padding-top: 20px;
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
}
.home .home-content .title h2 {
    font-weight: 700;
    -webkit-text-stroke: 1px rgb(107, 62, 180);
}
.home .home-content {
    position: absolute;
    z-index: 2;
    width: 100%;
    display: flex;
    /* flex-direction: column; */
    align-items: baseline;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
}
.home .bg {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(
        to top,
        rgb(102, 126, 234),
        rgb(118, 75, 162)
    );
    position: absolute;
    z-index: 1;
}
.home-content ul {
    margin: 30px;
    width: 85vw;
    height: 80vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: hidden;
}
.home-content ul li {
    width: 50%;
    display: inline-block;
}
.home-content ul li a img {
    width: 80%;
    height: 80%;
}
</style>
