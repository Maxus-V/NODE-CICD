import mongoose from 'mongoose'

const configSchema = mongoose.Schema({
  projectName: String,
  gitUrl: String,
  gitBranch: String,
  buildCommand: String,
  uploadPath: String,
})

export default mongoose.model('JobConfig', configSchema)