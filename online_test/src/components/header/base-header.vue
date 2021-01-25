<comment>
    # 头部组件
</comment>
<template>
    <div>
        <Header>
            <!-- 头部 begin -->
            <Menu
                    :style="{
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        paddingLeft: '50px',
                        height: '98px'
                    }"
                    active-name="1"
                    mode="horizontal"
                    theme="dark"
            >
                <div
                        :style="{
                            mixBlendMode: 'multiply'
                        }"
                        class="layout-logo"
                >
                    <img :src="imgSrc" alt="">
                    <!-- 搜索框 -->
                    <div
                            :style="{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            position: 'relative',
                            left: '20px'
                        }"
                            class="search-text"
                    >
                        <Select
                                class="ivu-select-dot"
                                size="large"
                                style="width: 80px;"
                                v-model="select_type"
                                @on-select="SET_SELECT_TYPE($event.value)"
                        >
                            <Option
                                    :key="item.value"
                                    :value="item.value"
                                    v-for="item in cityList"
                            >{{ item.label }}
                            </Option>
                        </Select>
                        <Input
                                @on-enter="questionSearch"
                                class="ivu-input-wrapper-dot"
                                placeholder="请输入搜索内容"
                                size="large"
                                style="width: 400px"
                                type="text"
                                v-model="keyword"
                        >
                        </Input>
                        <a
                                :style="{
                                    position: 'absolute',
                                    right: '20px',
                                    top: '5px',
                                    zIndex: '120',
                                    display: 'flex'
                                }"
                                @click="questionSearch"
                                ghost
                                type="text"
                        >
                            <Icon
                                    size="30"
                                    style="color: #3a4050"
                                    type="ios-search-outline"
                            />
                        </a>
                    </div>

                </div>

                <!-- 图标热点 -->
                <div
                        class="layout-admin"
                >
                    <div class="layout-nav">
                        <MenuItem
                                @click.native="setShoppingMarkStyle"
                                name="4"
                                title="试题篮"
                        >
                            <Badge
                                    :count="shoppingList.length"
                                    show-zero
                            >
                                <Icon
                                        :style="{color: '#666'}"
                                        size="22"
                                        type="md-cart"
                                />
                            </Badge>
                        </MenuItem>
                        <MenuItem
                                name="5"
                                title="基础管理"
                        >
                            <Icon
                                    :style="{color: '#666'}"
                                    size="22"
                                    type="md-settings"
                            />
                        </MenuItem>
                        <MenuItem
                                :to="{path: '/message'}"
                                name="6"
                                title="消息管理"
                        >
                            <Badge :count="3" dot>
                                <Icon
                                        :style="{color: '#666'}"
                                        size="22"
                                        type="md-notifications"
                                />
                            </Badge>
                        </MenuItem>
                    </div>
                    <div
                            @mouseenter="show = true"
                            @mouseleave="show = false"
                            class="layout-admin-title"
                    >
                        <div :style="{color: '#333'}">
                            欢迎您 <i>LX</i> 老师
                            <span>

                            </span>
                        </div>
                        <transition
                                mode="out-in"
                                name="fade">
                            <ul
                                    class="layout-admin-list"
                                    ref="layoutInfo"
                                    v-if="show"
                            >
                                <li>
                                    <Icon
                                            :size="icon_info.size"
                                            type="ios-school-outline"/>
                                    学校管理
                                </li>
                                <li>
                                    <Icon
                                            :size="icon_info.size"
                                            type="ios-list-box-outline"/>
                                    实名认证
                                </li>
                                <li>
                                    <Icon
                                            :size="icon_info.size"
                                            type="ios-create-outline"/>
                                    修改信息
                                </li>
                                <li>
                                    <Icon
                                            :size="icon_info.size"
                                            type="ios-lock-outline"/>
                                    修改密码
                                </li>
                                <li>
                                    <Icon
                                            :size="icon_info.size"
                                            :style="{color: 'red'}"
                                            type="ios-power"/>
                                    注销
                                </li>
                            </ul>
                        </transition>
                    </div>
                </div>
            </Menu>
        </Header>
        <div
                :style="{
                        backgroundColor: '#515a6e',
                        width: '100%',
                        zIndex: 0,
                    }"
        >
            <Menu
                    :active-name="name"
                    :style="{
                        width: '85%',
                        margin: 'auto',
                        height: '64px',
                        lineHeight: '64px',
                        zIndex: '1'
                    }"
                    @on-select="setBackground"
                    class="menu"
                    mode="horizontal"
                    ref="side_menu"
                    theme="dark"
            >

                <MenuItem
                        :to="{path: '/home'}"
                        name='1'
                >
                    <Icon type="ios-navigate"/>
                    首页
                </MenuItem>
                <MenuItem
                        :to="{path: '/question_teaching'}"
                        name='2'
                >
                    <Icon type="ios-keypad"/>
                    教材选题
                </MenuItem>
                <MenuItem
                        :to="{path: '/question_knowledge'}"
                        name='3'
                >
                    <Icon type="ios-analytics"/>
                    知识点选题
                </MenuItem>
                <MenuItem
                        :to="{path: '/select_questions'}"
                        name='4'
                >
                    <Icon type="ios-paper"/>
                    试卷选题
                </MenuItem>
                <MenuItem
                        :to="{path: '/school_based_questions'}"
                        name='5'
                >
                    <Icon type="ios-paper"/>
                    校本试题
                </MenuItem>
                <MenuItem
                        :to="{path: '/My_examination_paper'}"
                        name='6'
                >
                    <Icon type="ios-bookmarks"/>
                    我的试卷
                </MenuItem>
                <MenuItem
                        :to="{path: '/questions'}"
                        name='7'
                >
                    <Icon type="logo-buffer"/>
                    添加试题
                </MenuItem>
                <MenuItem
                        :to="{path: '/question_learning'}"
                        name='8'
                >
                    <Icon type="ios-paper-plane"/>
                    学情追踪
                </MenuItem>

                <MenuItem
                        :to="{
                            path: '/errorbook'
                        }"
                        name='9'
                >
                    <Icon type="ios-paper-plane"/>
                    错题集
                </MenuItem>
            </Menu>
        </div>

        <!--@mouseleave="$store.commit('SET_SHOPPING_CART_MARK', false)"--><!--鼠标移出购物框隐藏-->
        <div
                :class="mark?'active':''"
                class="shopping-cart"
                ref="shoppingCart"
        >
            <div
                    style="padding: 12px 0"
                    v-if="shoppingInfo.type.length === 0"
            >未添加任何试题！
            </div>
            <ul v-else>
                <li
                        :key="index"
                        v-for="(item,index) in shoppingInfo.type"
                >
                    <span><!--<Checkbox :label="index"/>-->{{item.qtpye}}</span>
                    <span>
                        <Icon type="md-close"/>
                        <strong>{{(shoppingList.filter(ele => ele.qtpye === item.qtpye)).length}}</strong>
                    </span>
                    <span @click="removeQuestions(item.qtpye)">
                        <Icon type="ios-trash-outline"/>
                        删除
                    </span>
                </li>
            </ul>
            <div
                    :style="{
                        padding: '10px 0',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }"
            >
                <a @click="removeQuestions">清空试题篮</a>
                <Button
                        to="/question_basket"
                        type="success"
                >进入组卷中心
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import myMixin from '@/mixin.js'
export default {
  name: 'index',
  components: {},
  data () {
    return {
      /* tableInfo: {
                  width: 500,
                  height: 300
                }, */
      keyword: '', // 搜索框关键字
      cityList: [
        {
          value: '试题',
          label: '试题'
        },
        {
          value: '试卷',
          label: '试卷'
        }
      ], // 搜索框select
      model1: '试卷', // 搜索框option
      icon_info: {
        size: 18
      },
      /* shoppingColumns: [
                  {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                  },
                  {
                    title: '学段',
                    key: 'name'
                  },
                  {
                    title: '学科',
                    key: 'discipline'
                  },
                  {
                    title: '试卷名称',
                    key: 'typeName'
                  },
                  {
                    title: '上传时间',
                    key: 'times'
                  },
                  {
                    title: '操作',
                    key: 'action',
                    align: 'center'
                  }
                ],
                shoppingData: [], */
      show: false,
      imgSrc: require('../../../public/img/logo_.png'), // logo
      shoppingInfo: {
        type: []
      }
    }
  },
  mixins: [myMixin],
  props: {},
  watch: {
    shoppingList: {
      handler () {
        this.setShoppingType()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapMutations(['SET_SELECT_TYPE']),
    // 设置当前menu状态
    setBackground (val) {
      this.$store.commit('SET_MENU_INFO', { name: val })
      localStorage.setItem('menuInfo', JSON.stringify({ name: val }))
    },
    // 搜索框
    questionSearch () {
      if (this.keyword) {
        if (this.select_type === '试题') {
          const { href } = this.$router.resolve({
            path: '/question_search',
            query: {
              keyword: this.keyword
            }
          })
          // 新窗口打开搜索试题
          window.open(href, '_blank')
        } else if (this.select_type === '试卷') {
          const { href } = this.$router.resolve({
            path: '/examination_search',
            query: {
              keyword: this.keyword
            }
          })
          // 新窗口打开搜索试题
          window.open(href, '_blank')
        }
      }
    },
    // 试题篮弹窗
    setShoppingMarkStyle () {
      const ele = this.$refs.shoppingCart
      ele.classList.toggle('active')
      if (ele.classList.contains('active')) {
        this.$store.commit('SET_SHOPPING_CART_MARK', true)
      } else {
        this.$store.commit('SET_SHOPPING_CART_MARK', false)
      }
    },
    // 试题篮试题类型去重
    setShoppingType () {
      this.$nextTick(() => {
        this.shoppingInfo.type = this.shoppingList.reduce((all, next) => {
          return all.some(item => item.qtpye === next.qtpye) ? all : [...all, next]
        }, [])
        // console.log('试题类别', this.shoppingInfo.type)
      })
    }
  },
  computed: {
    ...mapState({
      mark: state => state.shopping_cart.mark,
      shoppingList: state => state.shopping_cart.list, // 试题篮
      name: state => state.menu_info.name,
      select_type: state => state.select_type // 搜索框选择类型
    })
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.side_menu.updateOpened()
      this.$refs.side_menu.updateActiveName()
    })
  },
  destroyed () {
  }
}
</script>

<style lang="less" scoped>
    .menu .ivu-menu-item-active.ivu-menu-item-selected {
        background-color: #2db7f5;
    }

    .layout-nav .ivu-menu-item-active.ivu-menu-item-selected {
        background-color: #2db7f5;

        i {
            color: white !important;
        }
    }

    .ivu-input:focus {
        box-shadow: none;
    }

    .shopping-cart {
        width: 300px;
        position: absolute;
        right: 0;
        top: 98px;
        transition: all 0.3s ease-in-out;
        padding: 0;
        z-index: 0;
        border: 1px solid #eee;
        background-color: white;
        border-radius: 0 0 6px 6px;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
        opacity: 0;
        //display: none;
        transform: translateX(100px);
    }

    .shopping-cart ul {
        overflow: hidden;
    }

    .shopping-cart ul li {
        line-height: 45px;
        display: flex;
        justify-content: space-around;
        cursor: pointer;
    }

    .active {
        transition: all 0.3s ease-in-out;
        transform: translateX(0px);
        opacity: 1;
        z-index: 99;
        //display: block;
    }

    .shopping-cart ul li span:nth-child(1) {
        font-weight: bold;
    }

    .shopping-cart ul li span:nth-child(2) {
        color: #999;
    }

    .shopping-cart ul li span:nth-child(3) {
        color: #666;
    }

    .shopping-cart ul li span:nth-child(3):hover {
        color: red;
    }

    .shopping-cart ul li:nth-child(even) {
        background-color: #f8f8f9;
    }

    .shopping-cart ul li:hover {
        background-color: #ecf7ff;
    }

    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;

        .layout-logo {
            /*background: url('/img/logo_.png') no-repeat;*/
            border-radius: 3px;
            float: left;
            position: relative;
            left: 20px;
            z-index: 99;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        .layout-nav {

            .ivu-menu-item > i {
                margin-right: 0
            }

            .ivu-menu-item {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                /*margin: 0 10px;*/
                /*border: 1px solid #7f8aa5;*/
                padding: 0;
            }

        }

        .layout-nav {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            line-height: initial;
        }

        .layout-footer-center {
            text-align: center;
        }

        .demo-split {
            min-height: 100px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px;
            border-radius: 4px;

            .demo-split-pane {
                padding: 10px;
            }

        }
    }

    .menu {
        li, a {
            padding: 0 24px;
        }
    }

    .ivu-menu {
        color: rgb(131, 135, 141);
        font-weight: bold;
    }
</style>
