

module.exports = async function loadRemotePreset(repository, options) {
    // https://github.com/hua1995116/git-down-repo/issues/5  拉取私有库代码失败
    const download = require('download-git-repo')
    const os = require('os')
    const path = require('path')
    const fs = require('fs-extra')

    // 获取仓库名称
    const presetName = repository
    .replace(/((?:.git)?#.*)/, '')
    .split('/')
    .slice(-1)[0]
    .replace(/[:#]/g, '')

    // 配置临时目录
    const tmpdir = path.join(os.tmpdir(), 'fsl-cli', presetName)

    // bug: Error: 'git clone' failed with status 128 ; 
    // 如果tmpdir目录下有缓存则清除, 目的是防止缓存过时
    if (fs.existsSync(tmpdir)) {
        fs.removeSync(tmpdir)
    }

    // 下载远程仓库, 下载到临时目录
    await new Promise((resolve, reject) =>{
        download(repository, tmpdir, options, (err) => {
            if (err) {
                return
            }
            resolve()
        })
    })

    return tmpdir
}