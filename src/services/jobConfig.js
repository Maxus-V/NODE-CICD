//service层，用来操作数据库
import JobModel from '../model/jobConfig'

export const save = (params) => {
  return new JobModel(params).save()
}

export const update = (id, params) => {
  return JobModel.findByIdAndUpdate(id, params) 
}

export const deleteById =  (id) => {
  return JobModel.findByIdAndDelete(id)
}

export function findJobById (id) {
  return JobModel.findById(id)
}

export async function findJobPage (page, pageSize, params) {
  //过滤搜索条件
  Object.keys(params).forEach(key => {
    //Reflect.deleteProperty()：允许删除一个对象上的属性，并返回一个 Boolean 值表示该属性是否被成功删除
    if (!params[key]) Reflect.deleteProperty(params, key)
  })
  const DocumentUserList = await JobModel.find(params)
    //跳过指定的文档条数
    .skip((page - 1) * pageSize)
    //最大条数
    .limit(pageSize)
  //toObject()：将查询出来的 Document 对象转换成 js 对象
  return DocumentUserList.map(_ => _.toObject())
}

export function countJob (params) {
  Object.keys(params).forEach(key => {
    if (!params[key]) Reflect.deleteProperty(params, key)
  })
  return JobModel.count(params)
}

export function findJobDetail (id) {
  return JobModel.findById(id)
}