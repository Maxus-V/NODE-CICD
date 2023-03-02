import { RESPONSE_CODE } from '../constant'

import * as jobConfig from '../services/jobConfig'
import * as jenkins from '../jenkins'

export async function build (ctx, next) {
  const requestBody = ctx.request.body
  const { id } = requestBody
  
  try {
    const jobName = 'test-config-job'
    //通过前端传过来的id，在数据库中查询相应的多个配置
    const config = await jobConfig.findJobById(id)
    //配置Job
    await jenkins.configJob(jobName, config)
    //构建Job
    await jenkins.build(jobName)

    ctx.state.apiResponse = {
      code: RESPONSE_CODE.SUC,
      data: null
    }
  } catch (e) {
    ctx.state.apiResponse = {
      code: RESPONSE_CODE.ERR,
      msg: '构建失败'
    }
  }

  next()
}