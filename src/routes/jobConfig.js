import * as controller from '../controller/jobConfig'

export const initConfigRoute = (router) => {
  router.post('/job/save', controller.save)
  router.post('/job/update', controller.update)
  router.post('/job/delete', controller.del)
  router.get('/job', controller.getConfigList)
  router.get('/jobDetail', controller.getConfigDetail)
}
