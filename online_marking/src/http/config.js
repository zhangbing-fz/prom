// http配置
let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = '/gdy' // 这里是本地的请求url
    break
  case 'production': // 注意这里的名字要和步骤二中设置的环境名字对应起来
    if (process.env.VUE_APP_TITLE === 'alpha') {
      baseUrl = '/gdy' // 这里是测试环境中的url
    } else {
      baseUrl = '/gdy' // 生产环境url
    }
    break
}

export const baseURL = baseUrl
