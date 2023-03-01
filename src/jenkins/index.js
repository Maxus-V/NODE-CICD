import createJenkins from "jenkins"
import getXML from './jobConfig'

const config = {
    user: '',
    token: '',
    instance: '',
    assignedNode: ''
}

const jenkins = createJenkins({
  baseUrl: `http://${config.user}:${config.token}@${config.instance}`,
  promisify: true,
})

export async function configJob (jobName, config) {
    const isExist = await jenkins.job.exists(jobName)
    const jksConfig = getXML(config.buildCommand)
    if (!isExist) {
        return jenkins.job.create(jobName, jksConfig)
    }
    return jenkins.job.config(jobName, jksConfig)
}

export async function build (jobName) {
    const buildId = await jenkins.job.build(jobName)
    console.log('buildId', buildId)
  }