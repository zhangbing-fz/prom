import Vue from 'vue'
import globalTable from '@/components/base/global-table/table.vue' // 全局表格组件
import globalSearch from '@/components/base/global-search.vue' // 全局筛选/查询组件
import globalMinPage from '@/components/base/global-table/min-page.vue' // 全局筛选/查询组件
import globalPage from '@/components/base/global-table/page.vue' // 分页
import globalRichText from '@/components/base/rich-text/global-rich-text.vue'
import globalRichTextNew from '@/components/base/rich-text/global-rich-text-question.vue'
import globalRichTextExamin from '@/components/base/rich-text/global-rich-text-examination.vue'
import backTop from '@/components/base/backTop.vue'
import globalEditor from '@/components/base/global-editor.vue'
import globalNav from '@/components/base/global-nav.vue' // 全局菜单组件
import globalLoding from '@/components/base/global-loading.vue'
import globalQuestionSearch from '@/components/base/search-questions.vue'

const AutitMark = {
  install (vue) {
    Vue.component('global-search', globalSearch)
    Vue.component('global-rich-text', globalRichText)
    Vue.component('global-rich-text-question', globalRichTextNew)
    Vue.component('global-rich-text-examination', globalRichTextExamin)
    Vue.component('back-top', backTop)
    Vue.component('global-table', globalTable)
    Vue.component('global-min-page', globalMinPage)
    Vue.component('global-page', globalPage)
    Vue.component('global-editor', globalEditor)
    Vue.component('global-nav', globalNav)
    Vue.component('global-loading', globalLoding)
    Vue.component('global-question-search', globalQuestionSearch)
  }
}
export default AutitMark
