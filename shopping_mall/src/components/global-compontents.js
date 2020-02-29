import Vue from 'vue'
import loading from '@/components/loading/index'
import pagenationTable from '@/components/table/pagenation-table'
import domSizeListen from '@/components/dom-size-listen/index'
import siderSearch from '@/components/simple-form/sider-search'
import simpleFormV2 from '@/components/simple-form/simple-form-v2'
import simpleFormItemV2 from '@/components/simple-form/simple-form-item-v2'

Vue.component('loading', loading)
Vue.component('pagenation-table', pagenationTable)
Vue.component('sider-search', siderSearch)
Vue.component('dom-size-listen', domSizeListen)
Vue.component('simple-form-v2', simpleFormV2)
Vue.component('simple-form-item-v2', simpleFormItemV2)
