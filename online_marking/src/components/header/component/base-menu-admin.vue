<comment>
# 题组长/科组长导航条
</comment>
<template>
    <div class="base-menu-admin">
        <ButtonGroup class="menu" style="font-size: 22px">
            <Button
                    v-if="!menu_mark"
                    :to="{ path: '/score'}"
                    class="menu-btn"
                    title="阅卷"
                    type="text"
            >
                <Icon v-show="equipment" style="transform: rotateY(180deg)" type="logo-buffer"/>
                阅卷
            </Button>
            <Button
                    v-if="leaderMark && !menu_mark"
                    :to="{ path: '/arbitration-paper-history', query: { ID: question_ID} }"
                    class="menu-btn"
                    title="仲裁"
                    type="text"
            >
                <Icon v-show="equipment" style="transform: rotateY(180deg)" type="logo-buffer"/>
                仲裁
            </Button>
            <!--<Button
                    :to="{path:'/paper-quality-content'}"
                    class="menu-btn"
                    title="质量"
                    type="text">
                <Icon style="transform: rotateY(180deg)" type="ios-stats"/>
                质量
            </Button>-->
            <Button

                    :to="{path: menu_mark ? '/paper-progress-content': '/quality-content'}"
                    class="menu-btn"
                    icon=""
                    title="进度"
                    type="text"
            >
                <Icon v-show="equipment" style="transform: rotateY(180deg)" type="ios-trending-up"/>
                进度
            </Button>
            <Button
                    v-if="menu_mark"
                    class="menu-btn"
                    target="_blank"
                    title="审核"
                    type="text"
            >
                <!--                <Icon style="transform: rotateY(180deg)" type=""/>-->
                <Icon v-show="equipment" style="transform: rotateY(180deg)"
                      type="ios-list-box-outline"/>
                审核
            </Button>
            <Button
                    v-if="!menu_mark"
                    :to="{path: '/examination-paper-history', query: {ID: question_ID}}"
                    class="menu-btn"
                    title="回评"
                    type="text"
            >
                <!--                <Icon style="transform: rotateY(180deg)" type=""/>-->
                <Icon v-show="equipment" style="transform: rotateY(180deg)" type="ios-redo-outline"/>
                回评
            </Button>
            <!--<Button
                    :to="{path: '/paper-sample-list'}"
                    class="menu-btn"
                    title="样卷" type="text"
                    v-if="!menu_mark">
                <Icon type="ios-paper-outline"/>
                样卷
            </Button>-->
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
            <Button
                    v-if="menu_mark"
                    class="menu-btn"
                    title="学生"
                    to="/student-list"
                    type="text"
            >
                <Icon v-show="equipment" style="transform: rotateY(180deg)" type="md-person"/>
                学生
            </Button>
            <Button
                    v-if="menu_mark"
                    :to="{path:'/results'}"
                    class="menu-btn"
                    title="成绩"
                    type="text"
            >
                <Icon v-show="equipment" style="transform: rotateY(180deg)" type="ios-medal"/>
                成绩
            </Button>
            <Button
                    v-if="menu_mark"
                    :to="{path: '/report'}"
                    class="menu-btn"
                    title="报表"
                    type="text"
            >
                <Icon v-show="equipment" style="transform: rotateY(180deg)" type="ios-stats"/>
                报表
            </Button>
        </ButtonGroup>
    </div>
</template>

<script>
export default {
  name: 'base-menu-admin',
  components: {},
  data () {
    return {}
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
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
