import { RESPONSE_CODE } from '../constant'

const getResult = (code, data, msg) => {
  const result = {
    code,
    data,
    msg,
  }
  if (code === RESPONSE_CODE.SUC) {
    result.data = data
  }
  if (code === RESPONSE_CODE.ERR) {
    result.msg = msg
  }
  return result
}

export const handleResponse = () => {
  return async (ctx, next) => {
    await next()
    if (!ctx.state.apiResponse) {
      ctx.body = null
      return
    }
    // controller 层的结果处理结果放置 ctx.state.apiResponse 中
    const { code, data, msg } = ctx.state.apiResponse
    ctx.body = getResult(code, data, msg)
  }
}
