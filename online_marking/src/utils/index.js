export function getState2 (key, defaultValue) { // 返回对象
  try {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue
  } catch (e) {
    console.log(e)
  }
}

export function getState (key, key1, defaultValue) { // 返回具体键值
  try {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key))[key1] : defaultValue
  } catch (e) {
    console.log(e)
  }
}
