<template>
    <div class="content car">
        <!-- 尚盈名品 -->
        <div class="content-head">
            <p>尚盈名品是一家集购物、娱乐、社交于一体的微店平台，严选优质商品，创造社群商机，满足大众娱乐、购物、社交等多种需求。
加入我们，你就是我们的创业合伙人！</p>
        </div>
        <div class="content-enter">
            <ul>
                <li>
                    <a>
                        <img src="../../assets/image/symp_pp.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/symp_yj.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/symp_bgsb.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/symp_jj.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/symp_jk.png" alt />
                    </a>
                </li>
                <li>
                    <a>
                        <img src="../../assets/image/symp_zn.png" alt />
                    </a>
                </li>
            </ul>
        </div>
        <div class="content-foot">
            <img src="../../assets/image/symp_ewm.png" width="50%" alt />
            <h4>进入尚盈名品</h4>
            <a class="btn" href="http://symp88.ychel.net/mob/">超值正品 优化生活>></a>
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
    background-image: url("../../assets/image/symp_bg.png");
    background-color: rgb(221, 73, 108);
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
    background-image: url("../../assets/image/symp_title_bg.png");
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
