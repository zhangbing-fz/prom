<template>
    <div class="submit-index">
        <!-- 在线客服 -->
        <div class="submit-center">
            <div class="submit-title">
                <img src="../../assets/image/kfzx_title.png" width="100%" alt />
            </div>
            <div class="submit-content-contact">
                <h3>7*24小时热线<br> 400-088-8689</h3>
                <p>如果接通人工服务，请耐心简要描述您的问题，以便客服帮您解决！感谢您的理解和支持！</p>
            </div>
            <div class="submit-content-foot">
                <img src="../../assets/image/zygk_ewm.jpg" width="50%" alt />
                <h4>关注中盈高科公众号  了解更多详情</h4>
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
            window.open("https://xiaokefu.com.cn/s/10842onlu", self);
        },
        question() {
            this.$router.push("/submit_question");
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
.submit-index .submit-center{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: inherit;
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
.submit-content-contact h3{
	font-size: 24px;
	line-height: 2;
	border-bottom: 1px dashed rgb(228, 228, 228);
}
.submit-content-contact p{
	font-size: 16px;
	color: rgb(153,153,153);
	text-align: left;
	text-indent: 32px;
	padding: 20px;
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
.submit-content-foot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 0 20px 20px;
}
.submit-content-foot h4{
  margin: 10px;
  font-weight: normal;
  color: rgb(43,60,78)
}
</style>
