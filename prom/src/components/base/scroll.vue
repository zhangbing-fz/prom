<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll' ;

    export default {
        //以下都是一些基本的组件配置信息
        props: {
            /**
             * 1、滚动的时候会派发scroll事件，会截流
             * 2、滚动的时候实时派发 scroll事件， 不会截流
             * 3、除了实时派发scroll事件，在 swipe的情况下仍然能实时派发 scroll事件；
             */
            probeType: {
                type: Number,
                default: 1
            },
            /**
             * 点击列表是否派发 click事件
             */
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            }, data: {
                type: Array,
                default: null
            },
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        mounted() {
            setTimeout(() => { //隔一段时间启动渲染
                this._initScroll()
            }, 20); //延迟渲染  最小 17ms
        },
        methods: {
            _initScroll() { //初始化
                if (!this.$refs.wrapper) { //没有值就直接return return
                }
                this.scroll = new BScroll(this.$refs.wrapper, { //新来一个实例
                    probeType: this.probeType,
                    click: this.click
                })
                if (this.listenScroll) {
                    let me = this
                    this.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos)
                    })
                }
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('scrollToEnd')
                        }
                    })
                }
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll')
                    })
                }
            },
            disable() {
                this.scroll && this.scroll.disable()
            }, enable() {
                this.scroll && this.scroll.enable()
            },
            refresh() { //重新计算高度
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll,
                    arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll,
                    arguments)
            }
        },
        watch: {// 监听数据的变化
            data() { // 数据变化之后, 重新设置scroll高度, 延迟设置
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>
<style scoped lang="stylus">
</style>