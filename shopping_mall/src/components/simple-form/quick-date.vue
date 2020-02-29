<template>
    <DatePicker v-bind="$attrs" type="date" format="yyyy-MM-dd"  transfer :options="options"  @on-change="valueChange" :value="value"></DatePicker>
</template>

<script>
import {today,tomorrow,toSaturday,toSunday} from '@/util/date'
export default {
    name: 'quick-date',
    props : {
        // 为空则默认全部
        quickItems:{
            type:Array,
            required:true
        },
        value:{
            type:String
        }
    },
    components:{
        
    },
    data () {
        return {
            allOptions: [
                    {
                        type:'today',
                        text: '今日',
                        value () {
                            return today;
                        }
                    },
                    {
                        type:'tomorrow',
                        text: '明日',
                        value () {
                            return tomorrow;
                        }
                    },
                    {
                        type:'toSaturday',
                        text: '本周六',
                        value () {
                            return toSaturday;
                        }
                    },
                    {
                        type:'toSunday',
                        text: '本周日',
                        value () {
                            return toSunday;
                        }
                    }
            ]
        }
    },
    computed:{
        shortcuts(){
            if(this.quickItems.length == 0){
                return this.allOptions
            }
            return this.allOptions.filter((item)=>{
                return this.quickItems.indexOf(item.type) > -1
            })
        },
        options(){
            return {
                shortcuts:this.shortcuts
            }
        }
    },
    methods : {
        valueChange(val){
            this.$emit('input',val)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
