<template>
    <div class="question">
        <div class="question-input" v-if="boolean">
            <div class="bg"></div>
            <div class="question-content">
                <div class="title">
                    <h2>中盈高科</h2>
                    <h4>无忧售后</h4>
                </div>
                <van-cell-group>
                    <van-field
                        v-model="info.name"
                        required
                        clearable
                        label="姓名："
                        right-icon
                        placeholder="请输入您的姓名"
                    />

                    <van-field
                        v-model="info.phone"
                        type="number"
                        required
                        clearable
                        label="电话："
                        right-icon
                        error-message
                        placeholder="请输入您的电话"
                        @click-right-icon="$toast('question')"
                    />
                    <van-cell is-link @click="showPopup">
                        <van-field
                            style="margin:0; padding: 0"
                            required
                            clearable
                            label="选择产品："
                            placeholder="请选择相关产品"
                            v-model="info.project"
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
                    <van-field
                        v-model="info.message"
                        rows="2"
                        autosize
                        clearable
                        label="简单描述您的问题："
                        type="textarea"
                        maxlength="50"
                        placeholder="请输入留言"
                        show-word-limit
                    />
                </van-cell-group>

                <van-button type="danger" v-on:click="submit" class="btn-submit">提交</van-button>
            </div>
        </div>
        <div class="question-output" v-else>
            <img class="dot-title" src="../../assets/image/tjcg.png" alt width="50%" />
            <h2>提交成功</h2>
            <button class="btn-call-back" v-on:click="goBack">返回</button>
        </div>
    </div>
</template>

<script>
import { Toast, Field } from "vant";

export default {
    data() {
        return {
            boolean: true,
            info: {
                name: "",
                phone: "",
                project: "",
                message: "",
                itemId: ""
            },
            show: false, //下拉选择
            selects: [],
            actions: [
                { name: "选项" },
                { name: "选项" },
                { name: "选项", subname: "描述信息" }
            ]
        };
    },
    watch: {
        $route() {
            console.log("路有变化");
        },
        deep: true
    },
    created() {
        let sel = this.selects;
        this.$axios
            .post("WxPublic/WxPublic/GetItems", {
                itemFlag: 0
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
            let { name, phone, project, message, itemId } = this.info;
            console.log(name, phone, project, message, itemId);
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
            if (!project) {
                this.$toast("产品名称不能为空");
                return false;
            } else {
                let _this = this;
                this.$axios
                    .post(
                        "WxPublic/WxPublic/CreateOrUpdateServiceEntity",
                        {
                            Name: name,
                            Phone: phone,
                            ProductionId: itemId,
                            Question: message,
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
                            ServiceType: 1
                        }
                    )
                    .then(function(response) {
                        if (response.status === 200) {
                            _this.boolean = false;
                        }
                        console.log(response);
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
            this.info.project = value.name;
            this.info.itemId = value.itemId;
            this.show = false;
        },

        onSelect(item) {
            // 默认情况下，点击选项时不会自动关闭菜单
            // 可以通过 close-on-click-action 属性开启自动关闭
            this.show = false;
            Toast(item.name);
        },

        goBack() {
            this.boolean = true;
        }
    },
    computed: {
        //计算选择
        getSelect() {}
    },
    components: {}
};
</script>

<style scoped>
.question {
    width: 100vw;
    height: 100vh;
    background-color: rgb(245, 245, 245);
}
.question .question-content .title {
    padding-top: 20px;
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 85vw;
}
.question .question-content .title h2 {
    font-weight: 700;
    -webkit-text-stroke: 1px rgb(107, 62, 180);
}
.question .question-content ul {
    font-size: 14px;
    padding: 24px;
    min-height: 80%;
    text-align: left;
    list-style: none;
    line-height: 50px;
    box-sizing: border-box;
}
.question .question-content ul li {
    font-size: 14px;
    border-bottom: 1px solid rgb(233, 233, 233);
}
.question .question-content ul li input {
    outline-style: none;
    border: none;
    padding-left: 20px;
}
.question .question-content {
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
.question .bg {
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
.question .btn-submit,
.question .btn-call-back {
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
.question .btn-submit {
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
.question .btn-call-back {
    color: #ccc;
    background-color: white;
    border: 1px solid #ccc;
}
</style>
