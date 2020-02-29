<template>
    <i-form
        :model="value"
        v-bind="$attrs"
        @submit.native.prevent 
    >
        <form-item 
            v-for="(item,index) in formItems" :key="index"
            :label="item.label"
            :prop="item.key"
        >
            <simple-form-item 
                :key="index"
                :type="item.type"
                :options="item.options"
                :other-config="item.otherConfig"
                v-model="value[item.key]"
            >
            </simple-form-item>   
        </form-item>
    </i-form>
</template>

<script>
import simpleFormItem from '@/components/simple-form/simple-form-item'
export default {
    name: 'simple-form',
    props : {
        formItems:{
            type:Array,
            required:true
        },
        value:{
            type:Object,
            required:true
        }
    },
    components:{
        simpleFormItem
    },
    data () {
        return {
            
        }
    },
    computed:{
        
    },
    methods : {
        
    },
    watch : {
    },
    created(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
