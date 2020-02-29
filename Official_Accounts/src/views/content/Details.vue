<!--
  功能：内容页
  时间：2019年12月21日 10:16:46
-->
<template>
    <div class="details">
        <h3>{{infos.title}}</h3>
        <span>{{infos.dateString}}</span>
        <p v-html="infos.detail">{{infos.detail}}</p>
    </div>
</template>

<script>
export default {
    // 组件名称
    name: "demo",
    // 组件参数 接收来自父组件的数据
    // props: ["infos"],
    // 局部注册的组件
    components: {},
    // 组件状态值
    data() {
        return {
            hash: "",
            infos: {
                title: "",
                detail: "",
                dateString: ""
            }
        };
    },
    // 计算属性
    computed: {},
    // 侦听器
    watch: {
        infos: {
            handler() {

                if (location.hash.slice(0,location.hash.indexOf("?")) !== "#/details")
                    // console.log("数据变化了");
                    localStorage.setItem(
                        "infos",
                        JSON.stringify(this.$route.query.infos)
                    );
            },
            deep: true
        }
    },
    // 组件方法
    methods: {},

    beforeCreate() {},
    /**
     * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
     */
    created() {
        let infos = JSON.parse(localStorage.getItem("infos")) || {};
        console.log(infos)
        window.addEventListener("hashchange", () => {
            this.hash = location.hash;
        });
        this.infos = {
            title: infos.title,
            detail: infos.detail,
            dateString: infos.dateString
        };
    },

    /**
     * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
     * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
     */
    mounted() {        
        let  img = document.querySelectorAll("img");
        img.forEach(item=>{
            item.style.cssText = "width: 100%; height: 100%;";
        })
    },
    /**
     * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
     * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
     */
    beforeUpdate() {},
    /**
     * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
     * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
     */
    updated() {},
    /**
     * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
     */
    activated() {},
    /**
     * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
     */
    deactivated() {},
    /**
     * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
     * 所有的事件监听器会被移除，所有的子实例也会被销毁。
     */
    destroyed() {}
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
.details {
    padding: 20px;
    text-align: left;
}
.details span{
    font-size: 14px;
    color: #999;
}
.details p img{
    width: 100%;
}
</style>
