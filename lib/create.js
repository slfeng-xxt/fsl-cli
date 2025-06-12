const loadRemotePreset = require('./utils/loadRemotePreset')
const fs = require('fs-extra')
const path = require('path')

// 下载方式一：Using http download from Github repository at master.
const gitUrl = 'slfeng-xxt/vue-table'
// 下载方式二：Using git clone from GitLab repository at main branch with custom origin and token.
const gitLabDirectUrl = 'direct:http://192.168.20.76/fengshaolong/kb-web-default.git#main'
module.exports = async function create(name, options) {
    const downloadOptions = {
        clone: true,
        header: {
            'PRIVATE-TOKEN': 'bXMrumLL5AsjVfBNLZB9'
        }
    }
    // 获取远程模板，即临时存放模板的文件夹
    const remotePreset = await loadRemotePreset(gitLabDirectUrl, downloadOptions)

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