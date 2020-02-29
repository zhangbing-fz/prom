<template>
    <div class="content car">
        <!-- 环境天眼 -->
        <div class="video">
            <video
                src="http://222.185.244.186:830/dist/中盈高科-智慧水务-农污宣传视频终.mp4"
                controls="controls"
            />
        </div>
        <div class="content-head">
            <p>环境天眼主要是针对农村生活污水进行远程监控管理开发的APP。通过APP对农村生活污水处理站进行远程监控、日常运维，一方面运维人员通过APP查看站点报警信息，自动接收任务，现场处理，拍照反馈；另一方面通过APP实时掌控各站点运维情况，对突发事件应急处理，以任务的方式交办运维人员现场处理，平台的应用一定程度上提高污水处理站的运营管理效率，为管理者提供决策依据。
</p>
        </div>
        <div class="content-enter">
            <ul>
                <li>
                    <a>
                        <img src="../../assets/image/zhsw_qd.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/zhsw_xj.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/zhsw_sj.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/zhsw_rw.png" alt />
                    </a>
                </li>
                                <li>
                    <a>
                        <img src="../../assets/image/zhsw_ya.png" alt />
                    </a>
                </li>
                                <li>
                    <a>
                        <img src="../../assets/image/zhsw_sjtj.png" alt />
                    </a>
                </li>
            </ul>
        </div>
        <div class="content-foot" style="width: 100%">
            <img src="../../assets/image/but-ios.jpg" width="50%" alt />
            <a class="btn" href>IOS扫码下载>></a>
            <br>
            <img src="../../assets/image/but-Android.jpg" width="50%" alt />
            <a class="btn" href>Android扫码下载>></a>
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
    background-color: rgb(31, 105, 195);
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
    background-image: url("../../assets/image/zhsw_title_bg.png");

    transform: translate(-67px, -30px);
    display: block;
    width: 135px;
    height: 55px;
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
    margin: 0 20px 20px;
}
.content-foot h4{
  margin: 10px 0;
}
.content-foot .btn {
    margin-top: 10px;
    width: 180px;
    line-height: 30px;
    border: 1px solid #ccc;
    display: block;
    color: white;
    border-radius: 15px;
}
</style>
