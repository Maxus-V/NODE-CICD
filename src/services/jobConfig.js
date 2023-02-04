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