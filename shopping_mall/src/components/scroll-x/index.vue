<template>
    <div class="scroll-box" style="">
        <div class="scroll-x scroll-bar-x" :style="{height:height+'px'}">
            <div class="scroll-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'scroll-x',
    components:{
        
    },
    data () {
        return {
            
        };
    },
    props: {
        height : {
            type : [String,Number],
            default : 40
        }
    },
    computed: {
    },
    methods: {
        
    },
    mounted () {
       
    },
    watch: {
    }
};
</script>
<style lang="less">
.scroll-box{
    padding: 0 16px;
    border-bottom: 1px solid #e3e3e3;
    .scroll-x{
        width: 100%;
        display: flex;
        align-items : center;
        position: relative;
        overflow-x: auto;
        &::-webkit-scrollbar {
            height: 0;
        } 
        &:hover{
            &::-webkit-scrollbar {
                height: 6px;
            } 
        }
        .scroll-body{
            position : absolute;
            white-space: nowrap;
            height : 100%;
            display:flex;
            align-items:center;
        }
    }
}
</style>
