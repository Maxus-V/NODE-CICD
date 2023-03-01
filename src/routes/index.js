//route层，用户发送的操作请求会流经这里
import { initConfigRoute } from './jobConfig'

export const initGlobalRoute =  (router) => {
  initConfigRoute(router)
}