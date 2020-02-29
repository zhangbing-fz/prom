<template>
    <div class="content">
        <div class="content-head">
            <p>事业兴衰，关键在人。中盈高科集团股份有限公司在激烈的市场竞争中赢得立足之地，依靠的正是一大批志同道合、不惧艰险、勇于担当的人，他们就是中盈人！在中盈集团推进变革和战略转型的过程中，无数中盈人将精彩年华和满腔激情倾注在中盈事业上，推动了公司不断发展壮大，也在中盈历史上留下自己的人生印记。</p>
        </div>
        <div class="content-enter">
            <ul>
                <li>
                    <a>
                        <img src="../../assets/image/zyr_yghd.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/zyr_ygfl.png" alt />
                    </a>
                </li>

                <li>
                    <a>
                        <img src="../../assets/image/zyr_zxzx.png" alt />
                    </a>
                </li>
            </ul>
        </div>
        <div class="content-foot">
            <img src="../../assets/image/zyr_ewm.png" width="50%" alt />
            <h4><a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2NTUyNzIxOA==&scene=124#wechat_redirect">进入中盈人</a></h4>
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
    flex-flow: column;
    background-image: url("../../assets/image/zyr_bg.png");
    background-color: rgb(57, 89, 178);
    background-size: contain;
}

.content,
.content-head {
    background-repeat: no-repeat;
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
    color: white;
    margin: 0 20px 20px;
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
    background-image: url("../../assets/image/zyr_title_bg.png");
    background-size: contain;
}
.content-head p {
    font-size: 1rem;
    text-align: left;
    text-indent: 2rem;
    line-height: 1.5;
    padding: 24px;
}
</style>
