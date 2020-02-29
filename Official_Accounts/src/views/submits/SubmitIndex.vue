<template>
    <div class="submit-index">
        <!-- 在线客服 -->
        <div class="submit-enter">
            <div class="submit-title">
                <img src="../../assets/image/kfzx_title.png" width="100%" alt />
            </div>
            <div class="submit-dot" v-on:click="chat">
                <span>
                    <img src="../../assets/image/kfzx_kf.png" width="50%" alt />
                </span>
                <span>
                    <h3>客服</h3>
                    <h4>售前咨询</h4>
                </span>
            </div>
            <div class="submit-dot" v-on:click="question">
                <span>
                    <img src="../../assets/image/kfzx_yw.png" width="50%" alt />
                </span>
                <span>
                    <h3>运维</h3>
                    <h4>售后服务</h4>
                </span>
            </div>
            <div class="submit-content">
                <div>
                    <p>公司荣获信息技术服务运行维护三级证书、信息安全管理体系认证证书、常州市安全技术防范行业工程企业设计施工维护能力三级证书。</p>
                    <span>- 用专业与态度，一路为您保驾护航 -</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
    data() {
        return {};
    },
    methods: {
        chat() {
            this.$router.push('/submit_contact')
            // window.open("https://xiaokefu.com.cn/s/10842onlu", self);
        },
        question(){
          this.$router.push('/submit_question')
        }
    },
    components: {}
};
</script>

<style scoped>
.submit-index {
    min-height: 100vh;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    background-size: contain;
    background-color: rgb(245, 245, 245);
    padding: 20px;
}

.submit-index .submit-title {
    /* background-color: white; */
    width: 90vw;
    height: auto;
}
.submit-dot {
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    margin-top: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(116, 80, 169, 0.3);
    position: relative;
}
.submit-dot span h4 {
    color: #999;
    font-weight: normal;
}
.submit-dot span:nth-child(1)::before {
    content: "";
    display: block;
    z-index: 3;
    width: 1px;
    height: 50px;
    position: absolute;
    background-color: #e6e6e6;
    left: 22%;
}
.submit-dot span h3,
.submit-dot span h4 {
    margin-top: 5px;
}
.submit-dot::after {
    content: "";
    display: block;
    background-image: url("../../assets/image/jt.png");
    position: absolute;
    width: 16px;
    height: 28px;
    right: 20px;
}
.submit-dot span {
    display: inline-block;
}
.submit-content {
    background-color: white;
    margin-top: 20px;
    border-radius: 10px;
    padding: 40px 20px 20px;
    line-height: 1.5;
    text-align: left;
    text-indent: 2rem;
}
.submit-content::before {
    content: "";
    display: block;
    width: 3rem;
    height: 3rem;
    background-image: url("../../assets/image/kfzx_title_zs.png");
    position: absolute;
    background-size: cover;
    left: 50%;
    transform: translate(-1.5rem, -2rem);
    background-color: white;
    border: 10px solid white;
    z-index: 4;
}
.submit-content div {
    border: 1px solid rgb(102, 123, 230);
    border-radius: 10px;
    padding: 35px 20px 20px;
    display: flex;
    flex-flow: wrap;
}
.submit-content div span {
    font-size: 0.5rem;
    color: rgb(102, 123, 230);
    margin-top: 10px;
    letter-spacing: 3px;
}
.question .btn-call-back {
    color: #ccc;
    background-color: white;
    border: 1px solid #ccc;
}
</style>
