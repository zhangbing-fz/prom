// tag标签导航vuex存储
const tag = {
  state: {
    pageOpenedList: [
      {
        title: '首页',
        path: '/'
      }
    ]
  },
  getters: {},
  mutations: {
    setTag(state, tags) {
      state.pageOpenedList = tags
    },
    pushTag(state, tag) {
      let noPush = ['/login']
      if (noPush.indexOf(tag.path) > -1) {
        return
      }
      state.pageOpenedList.push(tag)
    },
    removeTag(state, path) {
      for (var i = 0; i < state.pageOpenedList.length; i++) {
        if (state.pageOpenedList[i].path == path) {
          state.pageOpenedList.splice(i, 1)
          return
        }
      }
    },
    clearAllTags(state) {
      state.pageOpenedList = [
        {
          title: '首页',
          path: '/'
        }
      ]
    },
    clearOtherTags(state, tag) {
      var newTags = [
        {
          title: '首页',
          path: '/'
        }
      ]
      if (tag.path != '/') {
        newTags.push(tag)
      }
      state.pageOpenedList = newTags
    },
    changeTagTitle(state, { path, title }) {
      for (var i = 0; i < state.pageOpenedList.length; i++) {
        if (state.pageOpenedList[i].path == path) {
          state.pageOpenedList[i].title = title
          return
        }
      }
    }
  },
  actions: {}
}
export default tag
