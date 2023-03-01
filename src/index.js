import Koa from 'koa'
import Router from 'koa-router'

import { initGlobalRoute } from './routes'
import { handleResponse } from './middleware'

import * as db from './mongoose'
import koaBody from 'koa-body'

const app = new Koa();
const router = new Router()

db.connect()

app.use(koaBody({multipart: true}))

app.use(handleResponse())

initGlobalRoute(router)

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000);





