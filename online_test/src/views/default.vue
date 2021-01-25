<template>
    <!-- 模式一 -->
    <div class="layout">
        <Layout>
            <Affix :offset-top="0">
                <!-- 顶部导航 -->
                <global-base-header/>
            </Affix>

            <Layout
                    :style="{
                        height: '100%',
                        width: '85%',
                        margin: 'auto',
                        zIndex: 1
                    }"
            >
                <!-- 左侧侧边栏 -->
                <!--<Sider
                        :style="{background: '#fff'}"
                        @mousewheel.stop
                        hide-trigger
                        ref="side">
                    <Affix
                            :offset-top="64"
                            :style="{overflow: 'scroll'}"
                            ref="siderMenu">
                        <Menu
                                :open-names="['2']"
                                active-name="2-2"
                                theme="light"
                                width="auto"
                                >
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-bookmarks"/>
                                    在线组卷
                                </template>
                                <MenuItem name="1-1">手动选题</MenuItem>
                                <MenuItem name="1-2">智能选题</MenuItem>
                                <MenuItem name="1-3">细目表组卷</MenuItem>
                                <MenuItem name="1-4">协同组卷</MenuItem>
                                <MenuItem name="1-5">我的组卷</MenuItem>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-cube"/>
                                    试卷管理
                                </template>
                                <MenuItem @click.native="add1" name="2-1">添加试题</MenuItem>
                                <MenuItem
                                        :to="{path: '/teaching_question'}"
                                        name="2-2"
                                >教材选题
                                </MenuItem>
                                <MenuItem
                                        :to="{path: '/question_knowledge'}"
                                        name="2-3"
                                >知识点选题
                                </MenuItem>
                                <MenuItem @click.native="add3" name="2-4">我的试卷</MenuItem>
                                <MenuItem @click.native="add4" name="2-5">校本试题</MenuItem>
                                <MenuItem name="2-6">校本审核</MenuItem>
                                <MenuItem name="2-7">校本报表</MenuItem>
                                <MenuItem
                                        :to="{path: '/Select-questions'}"
                                        name="2-8"
                                >试卷选题
                                </MenuItem>
                            </Submenu>
                            &lt;!&ndash;                            <Submenu name="3">
                                                            <template slot="title">
                                                                <Icon type="logo-buffer"/>
                                                                资源管理
                                                            </template>
                                                            <MenuItem name="3-1">添加资源</MenuItem>
                                                            <MenuItem name="3-2">我的资源</MenuItem>
                                                            <MenuItem name="3-3">我的收藏</MenuItem>
                                                            <MenuItem name="3-4">校本资源</MenuItem>
                                                            <MenuItem name="3-5">校本管理</MenuItem>
                                                        </Submenu>
                                                        <Submenu name="4">
                                                            <template slot="title">
                                                                <Icon type="md-paper"/>
                                                                考试管理
                                                            </template>
                                                            <MenuItem name="4-1">发布考试</MenuItem>
                                                            <MenuItem name="4-2">考试列表</MenuItem>
                                                            <MenuItem name="4-3">在线阅卷</MenuItem>
                                                            <MenuItem name="4-4">学情分析</MenuItem>
                                                        </Submenu>
                                                        <Submenu name="5">
                                                            <template slot="title">
                                                                <Icon type="md-people"/>
                                                                导学备课
                                                            </template>
                                                            <MenuItem name="5-1">设计教案</MenuItem>
                                                            <MenuItem name="5-2">设计（导）学案</MenuItem>
                                                            <MenuItem name="5-3">我的备课</MenuItem>
                                                            <MenuItem name="5-4">我布置的（导）学案</MenuItem>
                                                        </Submenu>&ndash;&gt;
                        </Menu>
                    </Affix>
                </Sider>-->
                <!-- 内容 -->
                <Layout>
                    <Content
                            :style="{
                                padding: '24px',
                                minHeight: '280px'
                            }"
                    >
                        <template>
                            <router-view/>
                        </template>
                    </Content>
                    <!-- footer  -->
                    <Footer class="layout-footer-center">版权所有 Copyright &copy; 2020 灌顶云教学云平台</Footer>
                </Layout>
            </Layout>
        </Layout>
        <back-top/>
    </div>
</template>

<script>
import globalHeader from '../components/header/base-header'

export default {
  name: 'default.vue',
  components: {
    'global-base-header': globalHeader
  },
  data () {
    return {
      isCollapsed: false // 布局调整
    }
  },
  props: {},
  watch: {},
  methods: {
    collapsedSider () { // 布局调整新增/模式二
      this.$refs.side1.toggleCollapse()
    },

    // 设置侧边栏定位
    setMenuHeight () {
      // const ele = this.$refs.siderMenu.$el
      // ele.style.height = `${window.innerHeight - 64}px`
    }

  },
  computed: {
    rotateIcon () { // 布局调整新增
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () { // 布局调整新增
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  created () {
    // 临时验证登录
    /*    const data = {
                                        entry: 'auth_api',
                                        service_name: 'login_check',
                                        username: 'MTg5NjExNjk4MTk=',
                                        passwd: 'bkU3akElNW1uRTdqQSU1bQ==',
                                        domain: 'admin.com'
                                      }
                                      this.$axios.post('/auth_api', data).then(res => {
                                        const { data } = res
                                        // console.log(data)
                                        this.$store.commit('SET_LEVEL_KEY', data.result_info.level_key)
                                        data.result_info.menu_role.forEach(item => {
                                          if (item.page === 'question_bank') {
                                            console.log(item)
                                          }
                                        })
                                      }) */
  },
  mounted () {
    this.setMenuHeight()
    window.addEventListener('resize', this.setMenuHeight)
  },
  destroyed () {
  }
}
</script>

<style lang="less">
    button {
        outline: none !important;
    }

    .ivu-input-wrapper-dot .ivu-input {
        border-radius: 0 18px 18px 0;
    }

    .ivu-select-dot .ivu-select-selection {
        border-right-width: 0;
        border-radius: 18px 0 0 18px;
    }

    ul, li {
        list-style: none;
    }

    .ivu-layout-header {
        padding: 0;
        height: 98px;
        > div {
            background-color: white;
        }
    }

    .ivu-menu-vertical.ivu-menu-light:after {
        width: 0;
    }

    .layout-admin {
        display: flex;
        justify-content: center;

        .layout-admin-title {
            color: white;
            height: auto;
            font-size: 12px;
            cursor: pointer;
            transition: .3s all ease-in-out;
            font-size: 14px;

            i:first-child {
                color: #3fb7f5;
            }

            i:last-child {
                color: #999;
            }

            span {
                background-image: url("../assets/dot-tx.jpg");
                background-size: cover;
                display: inline-block;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                position: relative;
                top: 12px;
            }
        }

        .layout-admin-title > div {
            padding: 0 10px;
        }

        .layout-admin-title > div:hover {
            background-color: #c5ccdf;
        }

        .layout-admin-list {
            background-color: white;
            box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
            transition: .3s ease-in-out;
            border-radius: 5px;

            li {
                text-align: left;
                cursor: pointer;
                padding-left: 20px;
                line-height: 40px;
                color: #515a6e;

                > i {
                    margin-right: 5px;
                }
            }

            li:nth-child(7) {
                border-top: 1px solid #e8eaec;
                color: red;
            }

            li:hover {
                background-color: #f8f8f9;
                /*color: #1daef8;*/
            }
        }
    }

    .ivu-menu-horizontal {
        height: 98px;
        line-height: 98px;
    }

    .fade-enter-active {
        transition: all .3s ease-in-out;
    }

    .fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    }

    .fade-leave, .fade-enter-to {
        opacity: 1;
        transform: translateY(10px);
    }

    .fade-enter, .fade-leave-to {
        transform: translateY(-5px);
        opacity: 0;
    }

    .ivu-badge-count {
        box-shadow: none;
    }

</style>
