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
    //检查是否已经存在Job
    const isExist = await jenkins.job.exists(jobName)
    //获得XML文件，通过替换不同的变量，预设用户进行相应的配置操作
    const jksConfig = getXML(config.buildCommand)
    //不存在Job，那就创建一个
    if (!isExist) {
        return jenkins.job.create(jobName, jksConfig)
    }
    //模拟用户在可视化界面上进行配置操作的行为
    return jenkins.job.config(jobName, jksConfig)
}

export async function build (jobName) {
    //开始构建Job
    const buildId = await jenkins.job.build(jobName)
    const buildNumber = await waitForBuildNumber(buildId)
    const logStream = jenkins.build.logStream(jobName, buildNumber, "text", 2000)
    logStream.on('data', function(text) {
        //打印日志获取情况
        console.log(text)
    })
    logStream.on('error', function(err) {
        console.log('error', err)
    })
    logStream.on('end', function() {
        console.log('end')
    })
    return {
        buildNumber,
        logStream,
    }
}

function waitForBuildNumber(buildId) {
    //https://github.com/silas/node-jenkins/issues/30
    //触发Job构建时，jenkins 会创建一个队列项，要获取buildNumber，需要轮询队列直至其被获取
    return new Promise(function (resolve, reject) {
        //开启定时器，用来做轮询
        const timer = setInterval(async function () {
            try {
                //监控队列项
                const item = await jenkins.queue.item(buildId)
                if (item.executable) {
                    //发现存在buildNumber，将结果resolve出去，然后清理定时器
                    resolve(item.executable.number)
                    clearInterval(timer)
                } else if (item.cancelled) {
                    //构建取消，清理定时器
                    clearInterval(timer)
                    reject()
                }
            } catch (e) {
                reject(e)
            }
        }, 500)
    })
  }