import Vue from 'vue'
import globalScoreDialog from '@/components/base/global-score-dialog'
import globalTable from '@/components/base/global-table.vue'
import globalEchart from '@/components/base/global-echart.vue'
import globalScoreBox from '@/components/base/global-score-box.vue'
import statusBar from '@/components/base/global-status-bar'
import globalMenuAdmin from '@/components/header/base-header-admin'
import globalMenu from '@/components/header/base-header.vue'
import globalSearch from '@/components/search/global-search'

const AutitMark = {
  install () {
    Vue.component('global-score-dialog', globalScoreDialog)
    Vue.component('global-table', globalTable)
    Vue.component('global-echart', globalEchart)
    Vue.component('global-score-box', globalScoreBox)
    Vue.component('global-status-bar', statusBar)
    Vue.component('global-header-admin', globalMenuAdmin)
    Vue.component('global-header', globalMenu)
    Vue.component('global-search', globalSearch)
  }
}
export default AutitMark
