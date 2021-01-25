const myMixin = {
  data () {
    return {}
  },
  methods: {
    /**
       * @作者: 张兵
       * @功能: 多级树的闭包
       * @date: 2020/7/2 09:42
       * @description: handlerTree
       * @return:
      */
    /*    handlerTree (tree) {
      // console.log(tree)
      const result = []
      tree.forEach(item => {
        if (item.title === '下册') { console.log(item.id) }

        if (item.parent_id === 0) {
          if (item.title === '下册') { console.log(item.id) }

          this.getChildren(item, tree)
          console.log(item.id)
          result.push({ // push需要遍历的数据格式
            expand: false,
            title: item.name,
            id: item.id,
            children: item.children,
            render (h, { root, node, data }) {
              return h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)]
              )
            }
          })
        }
      })
      console.log(result)
      return result
    },
    getChildren (parent, allArr) {
      if (!parent.children) {
        parent.children = []
      }
      allArr.forEach(item => {
        if (item.title === '下册') { console.log(item.id) }

        if (parent.id === item.parent_id) {
          this.getChildren(item, allArr)
          if (item.title === '下册') { console.log(item.id) }
          parent.children.push({
            expand: false,
            id: item.id,
            title: item.name,
            children: item.children,
            render (h, { root, node, data }) {
              return h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-paper-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)]
              )
            }
          })
        }
      })
    }, */
    // 试题篮试题删除
    removeQuestions (name) {
      if ((typeof name) === 'string' && name) { // 删除指定类型的题目
        const ele = JSON.parse(localStorage.getItem('shopping_cart_list'))
        const newList = ele.filter((item) => {
          return item.qtpye !== name
        })
        // console.log(newList)
        this.$store.commit('SET_SHOPPING_CART_LIST_REMOVE', newList)
      } else { // 清空试题篮
        // console.log(console.log(222))
        // console.log(this.$store.state.shopping_cart.list)
        this.$store.commit('SET_SHOPPING_CART_LIST_REMOVE')
        localStorage.removeItem('shopping_cart_list')
      }
    },
    // 递归树结构
    handlerTree (tree) {
      // console.log(tree)
      const result = []
      if (tree) {
        tree.forEach(item => {
          if (item.parent_id === 0) { // 0 为二级目录为起始， -1为顶级目录起始
            this.getChildren(item, tree)
            result.push({ // push需要遍历的数据格式
              expand: false,
              title: item.name,
              children: item.children,
              id: item.id,
              render (h, { root, node, data }) {
                return h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h('span', data.title)]
                )
              }
            })
          }
        })
      }
      return result
    },
    // 递归树回调
    getChildren (parent, allArr) {
      // console.log(parent, allArr)
      if (!parent.children) {
        parent.children = []
      }
      allArr.forEach(item => {
        if (parent.id === item.parent_id) {
          this.getChildren(item, allArr)
          parent.children.push({
            expand: false,
            title: item.name,
            children: item.children,
            id: item.id,
            render (h, { root, node, data }) {
              return h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-paper-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)]
              )
            }
          })
        }
      })
    },
    /**
     * @作者: 张兵
     * @功能: 添加到试题框
     * @date: 2020/6/29 13:26
     * @description: addShoppingCart
     * @return:
     */
    addShoppingCart (e, ele, i) {
      /*
        * 1、添加当前试题信息 itme 到vuex/state
        * 2、开启购物车弹框
        * 3、触发添加购物车动画
        * */
      this.$set(ele, 'editorMark', true)
      this.content.splice(i, 1, ele)
      this.$store.commit('SET_SHOPPING_CART_MARK', true)
      this.$store.commit('SET_SHOPPING_CART_LIST', ele) // 1
    },
    /**
     * @作者: 张兵
     * @功能: 移除试题
     * @date: 2020/6/29 13:31
     * @description: removeShoppingCart
     * @param {global-rich-text.vue}
     * @return:
     */
    removeShoppingCart (e, ele, i, id) {
      this.$set(ele, 'editorMark', false)
      this.content.splice(i, 1, ele)
      this.$store.commit('SET_SHOPPING_CART_MARK', true)
      this.$store.commit('SET_SHOPPING_CART_LIST_REMOVE', { ele, id })
      // 试题篮为空时隐藏
      setTimeout(() => {
        this.$store.commit('SET_SHOPPING_CART_MARK', false)
      }, 1000)
    },
    // 初始化试题状态列表,渲染试题开关的状态
    questionInit (id) {
      for (let i = 0, len = this.content.length; i < len; i++) {
        // 所有开关的状态为为选中
        this.content[i].editorMark = false
        for (let j = 0, len = this.shoppingList.length; j < len; j++) {
          // 获取并集
          console.log('测试')
          if (this.shoppingList[j][id] === this.content[i][id]) {
            console.log(i)
            // 满足的改为 true
            this.content[i].editorMark = true
          }
        }
      }
      console.log('重新渲染试图', this.content)
    }
  }
}
export default myMixin
