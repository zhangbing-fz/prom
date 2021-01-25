<comment>
# 阅卷员导航
</comment>
<template>
    <div class="base-menu">
        <ButtonGroup class="menu" style="font-size: 22px">
            <Button
                    v-if="menu_mark"
                    class="menu-btn"
                    title="人员"
                    to="/paper-personnel-content"
                    type="text"
            >
                <Icon v-show="equipment" style="transform: rotateY(180deg)" type="ios-people"/>
                人员
            </Button>
            <!--v-if="menu_mark_arbitration"-->
            <Button
                    v-if="leaderMark && !menu_mark"
                    :to="{ path: '/arbitration-paper-history', query: { ID: question_ID} }"
                    class="menu-btn"
                    title="仲裁"
                    type="text"
            >
                <Icon
                        v-show="equipment"
                        style="transform: rotateY(180deg)"
                        type="logo-buffer"/>
                仲裁
            </Button>
            <!--<Button

                    class="menu-btn"
                    title="质量"
                    :to="{path:'/paper-quality-content'}"
                    type="text">
                <Icon style="transform: rotateY(180deg)" type="ios-stats"/>
                质量
            </Button>-->
            <Button
                    v-if="menu_mark"
                    class="menu-btn"
                    target="_blank"
                    title="审核"
                    type="text"
            >
                <Icon
                        v-show="equipment"
                        style="transform: rotateY(180deg)"
                        type="ios-list-box-outline"/>
                审核
            </Button>
            <Button
                    :to="{path: '/score', query: {ID: question_ID}}"
                    class="menu-btn"
                    title="阅卷"
                    type="text"
            >
                <Icon
                        v-show="equipment"
                        style="transform: rotateY(180deg)"
                        type="logo-buffer"/>
                阅卷
            </Button>
            <Button
                    :to="{path: '/examination-paper-history', query: {ID: question_ID}}"
                    class="menu-btn"
                    title="回评"
                    type="text"
            >
                <Icon
                        v-show="equipment"
                        style="transform: rotateY(180deg)"
                        type="ios-redo-outline"/>
                回评
            </Button>
            <!--<Button

                    :to="{path: '/paper-sample-list'}"
                    class="menu-btn"
                    title="样卷" type="text">
                <Icon type="ios-paper-outline"/>
                样卷
            </Button>-->
            <Button
                    :to="{ path: menu_mark ? '/paper-progress-content': '/quality-content'}"
                    class="menu-btn"
                    title="进度"
                    type="text"
            >
                <Icon
                        v-show="equipment"
                        type="ios-trending-up"/>
                进度
            </Button>
            <Button
                    :title="modal?'隐藏工具':'显示工具'"
                    class="menu-btn"
                    type="text"
                    @click="$emit('change',modal)"
            >
                <Icon
                        v-show="equipment"
                        :type="modal?'ios-eye-off-outline':'ios-eye-outline'"/>
                工具
            </Button>
            <Button
                    class="menu-btn"
                    title="全屏模式"
                    type="text"
                    @click="$emit('handleFullScreen', fullscreen)"
            >
                <Icon v-show="equipment" type="ios-expand"/>
                {{ fullscreen ? '取消' : '全屏' }}
            </Button>
        </ButtonGroup>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'base-menu',
  components: {},
  data () {
    return {}
  },
  props: {},
  watch: {},
  methods: {},
  computed: {
    ...mapState({
      equipment: state => state.equipment // 用户端
    })
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style scoped>
</style>
