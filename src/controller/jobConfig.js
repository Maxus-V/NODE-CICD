// controller层，用来处理业务逻辑，比如获取、操作数据
import * as services from '../services/jobConfig'
import { RESPONSE_CODE } from '../constant'

export const save =  async(ctx, next) => {
  const requestBody = ctx.request.body

  try {
    await services.save(requestBody)

    ctx.state.apiResponse = {
      code: RESPONSE_CODE.SUC,
      data: null
    }
  } catch (e) {
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.ERR,
      msg: '配置数据保存失败'
    }
  }
  next()
}

export async function update (ctx, next) {
  const requestBody = ctx.request.body
  const { id } = requestBody
  try {
    await services.update(id, requestBody)
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.SUC,
      data: null
    }
  } catch (e) {
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.ERR,
      msg: '配置数据更新失败'
    }
  }
  next()
}

export async function del (ctx, next) {
  const { id }  = ctx.request.body

  try {
    await services.deleteById(id)
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.SUC,
      data: null
    }
  } catch (e) {
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.ERR,
      msg: '配置删除失败'
    }
  }
}