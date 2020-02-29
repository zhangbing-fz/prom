<template>
    <Spin fix>
        <Icon type="ios-loading" :size="36" class="icon-load"></Icon>
        <div>加载中</div>
    </Spin>
</template>

<script>
export default {
    name: 'loading',
    components:{
        
    },
    props : {
        text:{
            type:String,
            default:''
        }
    },
    data () {
        return {
            
        }
    },
    computed : {
        
    },
    methods : {
        
    },
    watch : {
        
    },
    created(){

    },
    mounted(){
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">    
    // 旋转loading
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
