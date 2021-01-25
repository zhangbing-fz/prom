<comment>
    # 教材属性
</comment>
<template>
    <div class="add-material">
        <Button
                @click="getMaterial"
                size="small"
                type="info"
        >
            <Icon type="md-add"/>
            添加教材
        </Button>
        <Button
                :style="{
                    marginLeft: '10px'
                }"
                @click="arr = []"
                size="small"
                type="error"
        >
            <Icon type="md-trash"/>
            删除全部
        </Button>
        <div v-if="arr.length">
            <span
                    :key="index"
                    class="btn-children"
                    v-for="(item,index) in arr"
            >{{item.title}}
                <Icon
                        :style="{cursor: 'pointer'}"
                        @click="arr.splice(index, 1)"
                        type="ios-trash-outline"
                />
            </span>
        </div>
        <Modal
                @on-cancel="cancel"
                @on-ok="ok"
                title="添加教材属性"
                v-model="modal"
                width="500"
        >
            <div
                    :style="{
                        height: '300px',
                        marginTop: '10px',
                        overflow: 'scroll'
                    }"
            >
                <!-- 选择搜索框 -->
                <h3>搜索选择:</h3>
                <Row>
                    <Col
                            span="12"
                            style="padding-right:10px"
                    >
                        <Select
                                filterable
                                v-model="model"
                        >
                            <Option
                                    :key="index"
                                    :value="item.value"
                                    v-for="(item,index) in cityList"
                            >{{ item.label }}
                            </Option>
                        </Select>
                    </Col>
                </Row>

                <!-- 树结构 -->
                <h3
                        :style="{
                    marginTop: '20px'
                }"
                >点击选择:</h3>
                <Tree
                        :data="materialTree"
                        :style="{textAlign: 'left'}"
                        @on-check-change="getSelect"
                        @on-select-change="getSelect"
                        multiple ref="tree"
                        show-checkbox/>
            </div>
        </Modal>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions } from 'vuex'

export default {
  name: 'add-material.vue',
  components: {},
  data () {
    return {
      URL: '/question_bank_api',
      arr: [],
      modal: false,
      model: '',
      materialTree: [{ // 教材树
        title: '教材',
        expand: true,
        children: []
      }], // 无限级菜单
      cityList: [] // 选择搜索框
    }
  },
  props: {
    tree_material: {
      type: Array,
      required: true
    },
    select_material: {
      type: Array,
      required: true
    },
    chapters: {
      type: Array,
      required: true
    }
  },
  watch: {
    chapters: {
      handler () {
        if (this.chapters.length > 0) {
          const oldArr = JSON.parse(localStorage.getItem('select_material'))
          const a = new Set(oldArr)
          const b = new Set(this.chapters)

          const intersect = new Set([...a].filter(item => b.has(item.id)))
          intersect.forEach(item => {
            this.arr.push({
              id: item.id,
              title: item.name
            })
          })
          this.arr = this.arrHeavy(this.arr)
        }
      },
      deep: true,
      immediate: true
    },
    tree_material: {
      handler (val) {
        console.log(val)
        if (!this.materialTree[0].children.length) {
          this.materialTree[0].children = this.tree_material
          this.newCityList(this.select_material) // 弹框树搜索
          // console.log('watch监听')
          this.setSelectTree() // 执行默认选中树方法
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions(['SAVE_TREE_MATERIAL']),
    /**
             * @作者: 张兵
             * @功能: 设置选中树
             * @date: 2020/7/14 15:18
             * @description: setSelectTree
             * @return:
             */
    setSelectTree () { // 设置选中树
      console.log(this.arr)
      const data = {
        entry: 'question_bank_api',
        service_name: 'query_chapter',
        stage: '高中',
        subject: '语文'
      }
      this.$axios.post(this.URL, data).then(({ data }) => {
        const tree = data.result_info
        for (let i = 0, len = tree.length; i < len; i++) {
          for (let j = 0, len = this.arr.length; j < len; j++) {
            if (tree[i].id === this.arr[j].id) {
              tree[i].checked = true
            }
          }
        }
        this.materialTree[0].children = this.handlerTree(tree)
      })
    },
    newCityList (data) {
      data.forEach(item => {
        this.cityList.push({
          value: item.name,
          label: item.name
        })
      })
    },
    getSelect (val, childs, ids) {
      console.log(val, childs, ids)
      const result = Array.of()
      result.push({
        title: childs.title,
        id: childs.id
      })
      childs.children.forEach(item => {
        if (item.children) {
          this.getElement(item, result)
        }
      })
      this.arr = [...new Set(this.arr.concat(result))] // push新增，并且去重
      this.arr = this.arrHeavy(this.arr)
      this.$Message.success('添加成功')
      console.log(result)
      return result
    },
    getElement (node, arr) {
      if (node.checked) {
        arr.push({
          title: node.title,
          id: node.id
        })
        node.children.forEach(item => {
          this.getElement(item, arr)
          arr.push({
            title: node.title,
            id: node.id
          })
        })
      } else {
        arr.pop({
          title: node.title,
          id: node.id
        })
        node.children.forEach(item => {
          this.getElement(item, arr)
          arr.pop({
            title: node.title,
            id: node.id
          })
        })
      }
    },
    getMaterial () { // 获取教材树
      this.modal = true
    },
    handlerTree (tree) {
      const result = []
      tree.forEach(item => {
        if (item.parent_id === 0) {
          this.getChildren(item, tree)
          result.push({ // push需要遍历的数据格式
            expand: !!item.checked, // 是否展开
            title: item.name,
            checked: item.checked,
            id: item.id,
            children: item.children
          })
        }
      })
      return result
    },
    getChildren (parent, allArr) {
      if (!parent.children) {
        parent.children = []
      }
      allArr.forEach(item => {
        if (parent.id === item.parent_id) {
          this.getChildren(item, allArr)
          parent.children.push({
            expand: !!item.checked, // 是否展开
            title: item.name,
            checked: item.checked,
            children: item.children,
            id: item.id
          })
        }
      })
    },
    /**
             * @作者: 张兵
             * @功能: 发送知识点属性数组
             * @date: 2020/7/2 17:08
             * @description: ok
             * @param {add-knowledge.vue}
             * @return:
             */
    ok () {
      // console.log(this.arr)
      const newArr = []
      this.arr.forEach(item => {
        newArr.push(item.id)
      })
      this.$emit('ok', newArr)
    },
    cancel () {

    }

  },
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
    .btn-children {
        padding: 2px 10px;
        margin-right: 5px;
        white-space: nowrap;
        color: #666;
        border-radius: 3px;
        border: 1px solid #e8eaec;
        transition: .3s all ease-in-out;
    }

    .btn-children:hover {
        color: white;
        border: 1px solid transparent;
        transition: .3s all ease-in-out;
        background-color: #2db7f5;

    }
</style>
