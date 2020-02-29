<template>
    <div class="content car">
        <!-- 中盈风采 -->
        <div class="log">
            <img src="../assets/image/logo.png" width="70%" />
            <span></span>
        </div>
        <div class="content-center">
            <h4 class="title-h4">中盈风采</h4>
            <ul>
                <li>
                    <router-link to="/zhongying_people">
                        <img src="../assets/image/zy_zyr.png" alt />
                    </router-link>
                </li>
                <li>
                    <router-link to="/zhongying_car">
                        <img src="../assets/image/zy_sycl.png" alt />
                    </router-link>
                </li>
                <li>
                    <router-link to="/zhongying_aged">
                        <img src="../assets/image/zy_aqy.png" alt />
                    </router-link>
                </li>
                <li>
                    <router-link to="/zhongying_goods">
                        <img src="../assets/image/zy_symp.png" alt />
                    </router-link>
                </li>
                <li>
                    <router-link to="/zhongying_home">
                        <img src="../assets/image/zy_hxjy.png" alt />
                    </router-link>
                </li>
                <li>
                    <router-link to="/zhongying_environment">
                        <img src="../assets/image/zy_hjty.png" alt />
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="content-center-list">
            <h4 class="title-h4">最新资讯</h4>
            <ul>
                <li v-for="(info,index) of infos" v-bind:key="index" v-on:click="getContent($event,index)">
                    <h4>{{info.title}}</h4>
                    <p>{{info.detailHtmlText.substring(0,50)}}...</p>
                    <span>{{info.dateString}}</span>
                </li>
            </ul>
        </div>
        <div class="content-foot">
            <a class="btn" v-on:click="getList">更多</a>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
// import { Details} from '@/views/content/Details.vue';

export default {
    data() {
        return {
            infos: [
                {
                    title: "",
                    detail: "",
                    dateString: "",
                    detailHtmlText:""
                }
            ],
            start: 0,
            length: 10
        };
    },
    created() {
        let _this = this;
        this.$axios
            .post("WxPublic/WxPublic/GetNews/", {
                start: _this.start,
                length: _this.length
            })
            .then(function(response) {
                // console.log(response)
                let arr = [];
                // console.log(response.data);
                for (const value of Object.values(response.data)) {
                    console.log(value)
                    arr.push({
                        title: value.title,
                        detail: value.detail,
                        detailHtmlText: value.detailHtmlText,
                        dateString:
                            value.dateString || value.createTimeString
                    });
                }
                _this.infos = arr;
            })
            .catch(function(err) {
                console.log("获取失败");
                throw err;
            });
    },
    methods: {
        getList() {
            let _this = this;
            this.$axios
                .post(
                    "http://222.185.244.186:820/api/WxPublic/WxPublic/GetNews/",
                    {
                        start: _this.start + _this.length,
                        length: _this.length
                    }
                )
                .then(function(response) {
                    if (!response.data.length) {
                        Toast("没有最新了");
                        return;
                    }
                    let arr = [];
                    for (const value of Object.values(response.data)) {
                        arr.push({
                            title: value.title,
                            detail: value.detailHtmlText,
                            dateString:
                                value.dateString ||
                                new Date().toLocaleTimeString()
                        });
                    }
                    _this.infos.push(...arr);
                })
                .catch(function(err) {
                    console.log("获取失败");
                    throw err;
                });
        },

        getContent(ev,i){
          console.log(this)
          localStorage.setItem(
                        "infos",
                        JSON.stringify(this.infos[i])
                    );
          this.$router.push({
              path: "/details",
              query: {
                  infos: this.infos[i],
              }
          })
        }
    },
    components: {}
};
</script>

<style scoped>
.content .log {
    margin: 20px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-flow: wrap;
    background-size: contain;
}
.content-center .title-h4,
.content-center-list .title-h4 {
    margin: 20px 0;
    text-align: left;
    font-weight: bold;
    position: relative;
    color: rgb(48, 53, 122);
    padding-left: 10px;
}
.content-center .title-h4::before,
.content-center-list .title-h4::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-10px);
    width: 3px;
    height: 21px;
    background-image: linear-gradient(rgb(102, 124, 231), rgb(118, 75, 162));
}
.content-center,
.content-center-list {
    width: 100%;
    position: relative;
    margin: 0 20px;
}
.content-center ul li a img {
    width: 100%;
}
.content-center ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
}
.content-center ul li:nth-child(-n + 2) {
    margin-top: 0px;
}
.content-center ul li {
    padding: 10px 0;
    margin-top: 20px;
    width: 46%;
}
.content-foot {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 0 20px;
}
.content-foot h4 {
    margin: 10px 0;
}
.content-foot .btn {
    margin: 0 auto;
    width: 180px;
    line-height: 45px;
    display: block;
    color: rgb(24, 59, 126);
    border-radius: 15px;
    background: url("../assets/image/gd.png") 70% 50% no-repeat;
    background-size: 10%;
}
.content-center-list p,
.content-center-list span {
    font-weight: normal;
    margin: 5px 0;
}
.content-center-list p {
    font-size: 18px;
    text-indent: 36px;
    line-height: 1.5;
}
.content-center-list span {
    font-size: 0.7rem;
    color: #999;
}
.content-center-list ul li {
    padding: 10px 0;
    border-bottom: 1px solid #eeeeee;
    text-align: left;
}
.content-center-list ul li h4 {
    margin: 10px 0;
}
</style>
