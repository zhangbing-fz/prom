<comment>
# 学段选择框
</comment>
<template>
    <div class="global-nav">
        <CellGroup>
            <Cell
                    :style="{
                        textAlign: 'left'
                    }"
                    selected title="是否多选"
            >
                <i-switch
                        slot="extra"
                        v-model="showCheckbox"
                        :style="{
                             display: 'flex',
                             justifyContent: 'space-around'
                        }"
                        size="large"
                >
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
            </Cell>
        </CellGroup>
        <Menu
                :open-names="['1']"
                :style="{
                    border: 'none',
                    zIndex: '1',
                    fontSize: '12px',
                    padding: '10px'
                }"
                active-name="1-2"
                theme="light"
                width="auto">

            <Tree
                    v-if="this.$route.path === '/question_knowledge'"
                    :data="knowledgeTree"
                    :show-checkbox="showCheckbox"
                    :style="{textAlign: 'left'}"
                    @on-select-change="$emit('getSelect', $event)"
            />

            <Tree
                    v-if="this.$route.path === '/question_teaching'"
                    :data="materialTree"
                    :show-checkbox="showCheckbox"
                    :style="{textAlign: 'left'}"
                    @on-select-change="$emit('getSelect', $event)"
            />

        </Menu>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'global-nav.vue',
  components: {},
  props: {},
  data () {
    return {
      showCheckbox: false, // 是否多选
      materialTree: [{ // 教材树
        title: '教材',
        expand: true,
        children: []
      }], // 无限级菜单
      knowledgeTree: [{ // 知识点树
        title: '知识点',
        expand: true,
        children: []
      }], // 无限级菜单
      searchInfo: null,
      contentInfo: [],
      map: {
        title: 'name', // 接口返回的名称
        children: 'HasChild', // 接口返回的子节点
        id: 'id',
        parentId: 'parent_id'
      }
    }
  },
  watch: {
    material: {
      handler () {
        localStorage.setItem('select_material', JSON.stringify(this.material))
        this.materialTree = this.handlerTree(this.material, this.map)
        // localStorage.setItem('tree_material', JSON.stringify(this.materialTree))
        this.getDefaultChapter()
      },
      deep: true
    },
    knowledge: {
      handler (val) {
        localStorage.setItem('select_knowledge', JSON.stringify(this.knowledge))
        this.knowledgeTree = this.handlerTree(this.knowledge, this.map)
        // localStorage.setItem('tree_knowledge', JSON.stringify(this.knowledgeTree))
        this.getDefaultChapter()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['SAVE_TREE_MATERIAL', 'SAVE_TREE_KNOWLEDGE']),
    // 递归树
    handlerTree (tree) {
      // console.log(tree)
      const result = []
      if (tree) {
        tree.forEach((item, index) => {
          // eslint-disable-next-line no-unused-vars
          let mark
          // eslint-disable-next-line prefer-const
          index === 0 ? mark = true : mark = false
          this.getChildren(item, item.child)
          result.push({ // push需要遍历的数据格式
            expand: mark,
            title: item.name,
            oldId: item.oldId,
            children: item.children,
            id: item.id
          })
        })
      }
      return result
    },
    // 递归树回调
    getChildren (parent, allArr) {
      if (!parent.children) {
        parent.children = []
      }
      allArr.forEach((item, index) => {
        if (parent.id === item.pid) {
          // eslint-disable-next-line no-unused-vars
          let mark
          // eslint-disable-next-line prefer-const
          index === 0 ? mark = true : mark = false
          this.getChildren(item, item.child)
          parent.children.push({
            expand: mark,
            title: item.name,
            oldId: item.oldId,
            children: item.children,
            id: item.id
          })
        }
      })
    },

    // 设置默认选中章节
    getDefaultChapter () {
      if (this.$route.path === '/question_knowledge') {
        this.$emit('getSelect', this.knowledgeTree)
      } else if (this.$route.path === '/question_teaching') {
        this.$emit('getSelect', this.materialTree)
      }
    }
  },
  computed: {
    ...mapState({
      material: state => state.tree_nav.tree_material, // 章节/教材树
      knowledge: state => state.tree_nav.tree_knowledge // 知识点树
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

<style>
/* 覆盖默认树的样式 */
.ivu-tree .ivu-icon { /*// 禁止旋转*/
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
}

.ivu-tree ul span {
    white-space: normal;
}

.ivu-tree .ivu-icon-ios-arrow-forward:before { /*// 改变tree默认的三角箭头*/
    /*// content: "\F359"; // 采用ui库中自带的icon图标*/
    content: "\F100";
    /*background: url('../images/plus.png') no-repeat 0 2px; // 自定义背景图*/
    background-size: cover;
    width: 20px;
    height: 20px;
    display: block;
}

.ivu-tree .ivu-tree-arrow-open .ivu-icon-ios-arrow-forward:before { /*// 改变tree默认的三角箭头*/
    content: "\F290"; /*// 采用ui库中自带的icon图标*/
    /*content: '';*/
    display: block;
    /*background: url('../images/reduce.png') no-repeat 0 2px; */
    background-size: cover;
    width: 20px;
    height: 20px;
}

.ivu-cell-selected {
    background-color: transparent;
}
</style>
