<template>
    <div class="apply">
        <div class="apply-input" v-if="boolean">
            <div class="bg"></div>
            <div class="apply-content">
                <div class="title">
                    <h2>荣誉资质</h2>
                    <h4>索取高清图片</h4>
                </div>
                <van-cell-group>
                    <van-field
                        v-model="info.name"
                        required
                        clearable
                        label="姓名："
                        placeholder="请输入您的姓名"
                    />

                    <van-field
                        v-model="info.phone"
                        type="number"
                        required
                        clearable
                        label="电话："
                        placeholder="请输入您的电话"
                        @click-right-icon="$toast('question')"
                    />
                    <van-field
                        v-model="info.company"
                        required
                        clearable
                        label="公司："
                        placeholder="请输入公司名称"
                        @click-right-icon="$toast('question')"
                    />

                    <van-cell is-link @click="showPopup">
                        <van-field
                            style="margin:0; padding: 0"
                            required
                            clearable
                            label="所需图片："
                            placeholder="请选择相关图片"
                            v-model="info.image"
                            disabled
                            v-focus
                        />
                    </van-cell>
                    <van-action-sheet
                        v-model="show"
                        title="标题"
                        v-bind:style="{ height: '40%' }"
                        v-bind:round="false"
                    >
                        <van-cell
                            v-for="(select,index) in selects"
                            v-bind:key="index"
                            v-on:click="showSelect(index)"
                        >{{select.name}}</van-cell>
                    </van-action-sheet>
                </van-cell-group>
                <van-button type="danger" v-on:click="submit" class="btn-submit">提交</van-button>
            </div>
        </div>
        <div class="apply-output" v-else>
            <img class="dot-title" src="../../assets/image/tjcg.png" alt width="50%" />
            <h2>提交成功</h2>
            <button class="btn-call-back" v-on:click="goBack">返回</button>
        </div>
    </div>
</template>

<script>
import { Toast, Field, Uploader, Image } from "vant";
// import axios from 'axios';
export default {
    data() {
        return {
            boolean: true,
            info: {
                name: "",
                phone: "",
                company: "",
                image: "",
                itemId: ""
            },
            message: "",
            show: false, //下拉选择
            selects: []
        };
    },
    watch: {
        // "info.image": {
        //     handler(val) {
        //         console.log(val);
        //     },
        //     deep: true
        // },
        // "info.itemId": {
        //     handler(val) {
        //         console.log(val);
        //     },
        //     deep: true
        // }
    },
    created() {
        let sel = this.selects;
        this.$axios
            .post("WxPublic/WxPublic/GetItems", {
                itemFlag: 2
            })
            .then(function(response) {
                for (const val of Object.values(response.data)) {
                    sel.push({
                        name: val.name,
                        itemId: val.itemId
                    });
                }
                console.log(response); //请求成功返回的数据
            })
            .catch(function(error) {
                console.log(error); //请求失败返回的数据
            });
    },
    methods: {
        // 表单提交

        submit(info) {
            let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/; //手机号正则
            let { name, phone, company, image, itemId } = this.info;
            console.log(name, phone, company, image, itemId);
            if (!name) {
                this.$toast("姓名不能为空");
                return false;
            }
            if (!phone) {
                this.$toast("手机号码不能为空");
                return false;
            }
            if (!TEL_REGEXP.test(phone)) {
                this.$toast("手机号码格式不正确");
                return false;
            }
            if (!company) {
                this.$toast("公司名称不能为空");
                return false;
            }
            if (!image) {
                this.$toast("图片选择不能为空");
                return false;
            } else {
                let _this = this;
                this.$axios
                    .post(
                        "WxPublic/WxPublic/CreateOrUpdateServiceEntity",
                        {
                            Name: name,
                            Phone: phone,
                            Company: company,
                            ProductionId: null,
                            Question: null,
                            image: itemId,
                            ProjectId: null,
                            ProcessingPeople: null,
                            ProcessingTime: null,
                            CreaterId: null,
                            CreateTime: null,
                            UpdaterId: null,
                            UpdateTime: null,
                            State: 0,
                            ProcessingDetails: "",
                            Enable: true,
                            RowVersion: null,
                            ServiceType: 0
                        }
                    )
                    .then(function(response) {
                        console.log(response);
                        if (response.status === 200) {
                            _this.boolean = false;
                        }
                    })
                    .catch(function(error) {
                        console.log("请求失败" + error);
                    });
            }
        },
        // 下拉选择
        showPopup() {
            this.show = true;
        },
        showSelect(index) {
            let value = this.selects[index];
            // console.log(value);
            this.info.image = value.name;
            this.info.itemId = value.itemId;
            this.show = false;
        },
        goBack(){
          this.boolean = true;
        }
    },
    computed: {
        //计算选择
        getSelect() {
            return this.$data.info.every(ele => {
                return ele != false;
            });
        }
    },
    mounted() {},
    components: {}
};
</script>

<style scoped>
.apply {
    width: 100vw;
    height: 100vh;
    background-color: rgb(245, 245, 245);
}
.apply .apply-content .title {
    padding-top: 20px;
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 85vw;
}
.apply .apply-content .title h2 {
    font-weight: 700;
    -webkit-text-stroke: 1px rgb(107, 62, 180);
}
.apply .apply-content ul {
    font-size: 14px;
    padding: 24px;
    min-height: 80%;
    text-align: left;
    list-style: none;
    line-height: 50px;
    box-sizing: border-box;
}
.apply .apply-content ul li {
    font-size: 14px;
    border-bottom: 1px solid rgb(233, 233, 233);
}
.apply .apply-content ul li input {
    outline-style: none;
    border: none;
    padding-left: 20px;
}
.apply .apply-content {
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-direction: inherit;
    align-items: baseline;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
}
.apply .bg {
    width: 100vw;
    height: 30vh;
    background-image: linear-gradient(
        to right,
        rgb(102, 126, 234),
        rgb(118, 75, 162)
    );
    position: absolute;
    z-index: 1;
}
.apply .btn-submit,
.apply .btn-call-back {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-90px);
    width: 180px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    font-weight: bold;
    border: none;
    outline-style: none;
}
.apply .btn-submit {
    box-shadow: 0 0 10px rgb(102, 126, 234);
    background-image: linear-gradient(
        to right,
        rgb(102, 126, 234),
        rgb(118, 75, 162)
    );
}

.dot-title {
    margin: 100px auto 50px;
}
.van-cell-group {
    background-color: white;
    border-radius: 10px;
    width: 85vw;
    height: 85vh;
    overflow: hidden;
}
.van-cell {
    text-align: left;
}
.van-cell--required::before {
    display: none;
}
.apply .btn-call-back {
    color: #ccc;
    background-color: white;
    border: 1px solid #ccc;
}
</style>
