<template>
    <div class="content home">
        <div class="video">
            <video
                src="http://222.185.244.186:830/dist/智慧社区宣传视频终.mp4"
                controls="controls"
            />
        </div>

        <div class="content-head">
            <p>“好享家园”智慧社区充分利用物联网、云计算、移动互联网等新一代信息技术，融合数字化、信息化、智能化等技术手段，以社区居民的刚需为切入口，打造智慧社区一体化综合服务平台，包含智能巡更、智慧门禁、智能道闸、智慧养老、业主互动等多个服务场景。为社区居民提供一个安全、舒适、便利的现代化、智慧化生活环境，从而形成基于信息化、智能化社会管理与服务的一种新的管理形态的社区。</p>
        </div>
        <div class="content-enter">
            <ul>
                <li>
                    <a>
                        <img src="../../assets/image/hxjy_gl.png" alt />
                    </a>
                </li>

                <li>
                    <a>
                        <img src="../../assets/image/hxjy_zn.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/hxjy_fw.png" alt />
                    </a>
                </li>
            </ul>
        </div>
        <div class="content-foot">
            <img src="../../assets/image/aqy_hxjy.png" width="50%" alt />
            <h4>进入好享家园</h4>
            <a
                class="btn"
                href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU2Mzc3ODY5MA==&scene=124#wechat_redirect"
            >借科技之力 创智慧社区>></a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {}
};
</script>

<style scoped>
.content .video {
    margin: 20px;
    width: 100vw;
}
.content .video video {
    width: 100%;
    height: 31vh;
}
.content {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-flow: wrap;
    background-color: rgb(28, 174, 62);
    background-size: contain;
}

.content,
.content-head {
    background-repeat: no-repeat;
}

.content-head {
    position: relative;
    margin: 20px;
    height: fit-content;
    background-color: white;
    border-radius: 10px;
}
.content-head::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translate(-67px, -30px);
    display: block;
    width: 135px;
    height: 55px;
    background-image: url("../../assets/image/hxjy_title_bg.png");
    background-size: contain;
}
.content-head p {
    font-size: 1rem;
    text-align: left;
    text-indent: 2rem;
    line-height: 1.5;
    padding: 24px;
}

.content-enter {
    margin: 20px;
    margin-top: 0;
}
.content-enter ul li a img {
    width: 100%;
}
.content-enter ul li:nth-child(1) {
    margin-top: 0;
}
.content-enter ul li {
    margin-top: 20px;
}
.content-foot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 0 20px 20px;
    width: 100%;
}
.content-foot h4 {
    margin: 10px 0;
}
.content-foot .btn {
    width: 200px;
    line-height: 30px;
    border: 1px solid #ccc;
    display: block;
    color: white;
    border-radius: 15px;
}
</style>
