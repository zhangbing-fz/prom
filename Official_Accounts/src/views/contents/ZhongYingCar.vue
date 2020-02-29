<template>
    <div class="content car">
        <div class="content-head">
            <p>尚盈车联是一款致力于解决城市出行难题，为广大车主提供优质车后服务的应用型软件。覆盖您从购车起的全系消费场景，三大服务让您的出行更顺畅，养护更安心。通过好享泊智慧停车系统，实现停车场无人值守、无感支付，方便车主车位预约、车位导航 、反向寻车等，停车更方便。好享驾共享汽车，提供分时短赁、日租长租等服务，APP预约、快捷用车、低碳节能，让您日常出行实惠又便捷。好享服系统为车主提供汽车维修、美容保养、保险救援等优质服务。
</p>
        </div>
        <div class="content-enter">
            <ul>
                <li>
                    <a>
                        <img src="../../assets/image/sycl_hxb.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/sycl_hxj.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/sycl_hxf.png" alt />
                    </a>
                </li>
            </ul>
        </div>
        <div class="content-foot">
            <img src="../../assets/image/sycl_ewm.png" width="50%" alt />
            <h4>加入尚盈车联</h4>
            <a class="btn" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU2NjY1NjI3MQ==&scene=124#wechat_redirect">停车不用愁 养车无忧>></a>
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
    background-image: url("../../assets/image/sycl_bg.png");
    background-color: rgb(0, 82, 130);
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
    background-image: url("../../assets/image/sycl_title_bg.png");
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
}
.content-foot h4{
  margin: 10px;
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
