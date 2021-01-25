export default class storeSave {
  // 返回具体键值
  static getStore (key, key1, defaultValue) {
    try {
      return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key))[key1] : defaultValue
    } catch (e) {
      console.log(e)
    }
  }

  // 返回对象
  static getStore2 (key, defaultValue) {
    try {
      return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue
    } catch (e) {
      console.log(e)
    }
  }
}
