export function export2Excel (columns, list) {
  require.ensure([], () => {
    const { exportJsonToExcel } = require('../../excel/Export2Excel')
    const tHeader = []
    const filterVal = []
    console.log(columns)
    if (!columns) {
      return
    }
    columns.forEach(item => {
      tHeader.push(item.title)
      filterVal.push(item.key)
    })
    const data = list.map(v => filterVal.map(j => v[j]))
    exportJsonToExcel(tHeader, data, '数据列表')
  })
}
