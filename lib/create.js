const loadRemotePreset = require('./utils/loadRemotePreset')
const fs = require('fs-extra')
const path = require('path')

const gitUrl = 'slfeng-xxt/vue-table'
// const gitUrl2 = 'bitbucket:git@192.168.20.76:fengshaolong/ryb-mini-program.git' // gitlab私有库的地址有问题
module.exports = async function create(name, options) {
    const remotePreset = await loadRemotePreset(gitUrl, false)

    const cwd = process.cwd()
    const targetDir = path.resolve(cwd, name)

    // 将临时文件中的模板拷贝到目标文件夹
    fs.copy(remotePreset, targetDir, { overwrite: true }, (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('copy success')
    })
}