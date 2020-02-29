<template>
    <div class="content car">
        <!-- 爱期颐 -->
        <div class="content-head">
            <p>爱期颐创新服务模式，利用信息化技术、物联网、互联网技术、大数据等先进的技术手段，通过线上云平台(“互联网+”养老服务综合信息平台、远程医疗服务平台)和线下服务资源（居家养老服务照料中心、社区卫生服务站），以健康档案为核心，利用自动检测终端、爱期颐App、物联网智能居家设备，线上提供网络助餐、助医、助行、助浴等服务；线下提供健康档案建立、上门照护等服务，为老年人提供健康评估、慢病管理、健康数据动态监测等服务。</p>
        </div>
        <div class="content-enter">
            <ul>
                <li>
                    <a>
                        <img src="../../assets/image/aqy_sq.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/aqy_jj.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/aqy_jg.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/aqy_xn.png" alt />
                    </a>
                </li>
            </ul>
        </div>
        <div class="content-foot">
            <img src="../../assets/image/aqy_ewm.png" width="50%" alt />
            <h4>进入爱期颐</h4>
            <a class="btn" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2NTkyMTUxMw==&scene=124#wechat_redirect">科技温暖长者>></a>
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
.content {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-flow: wrap;
    background-image: url("../../assets/image/aqy_bg.png");
    background-color: rgb(135, 35, 27);
    background-size: contain;
}

.content,
.content-head {
    background-repeat: no-repeat;
}

.content-head {
    position: relative;
    margin: 20px;
    margin-top: 60%;
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
    height: 60px;
    background-image: url("../../assets/image/aqy_title_bg.png");
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
    width: 100vw;
    margin: 0 20px 20px;
}
.content-foot h4{
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
