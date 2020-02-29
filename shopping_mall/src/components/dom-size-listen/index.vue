<template>
    <div ref="domCon">
        <slot></slot>    
    </div>
</template>

<script>
var elementResizeDetectorMaker = require("element-resize-detector");
var erd = elementResizeDetectorMaker({
    strategy: "scroll"
})
export default {
    name: 'dom-size-listen',
    props : {
        value:{
            type:Object,
            default(){
                return {
                    width:0,
                    height:0
                }
            }
        }
    },
    data () {
        return {}
    },
    mounted(){
        erd.listenTo(this.$refs.domCon, (element) => {
            var width = element.offsetWidth;
            var height = element.offsetHeight;
            this.$emit('input',{
                width,
                height
            })
        });
    },
    beforeDestroy(){
        erd.uninstall(this.$refs.domCon)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">    

</style>
