<template>
    <div id="app">
        <Mheader></Mheader>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>

<script>
    import Mheader from './components/m-header/m-header'
    import tab from './components/tab/tab'
    import player from './components/player/player'

    export default {
        name: 'app',
        components: {
            Mheader,
            tab,
            player
        }
    }
</script>

<style lang="stylus" scoped>
    @import "./common/stylus/variable.styl"

    #app
        color: $color-theme
</style>
