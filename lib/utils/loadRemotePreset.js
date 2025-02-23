

module.exports = async function loadRemotePreset(repository, clone) {
    // https://github.com/hua1995116/git-down-repo/issues/5  拉取私有库代码失败
    const download = require('download-git-repo')
    const os = require('os')
    const path = require('path')

    const presetName = repository
    .replace(/((?:.git)?#.*)/, '')
    .split('/')
    .slice(-1)[0]
    .replace(/[:#]/g, '')
    const tmpdir = path.join(os.tmpdir(), 'fsl-cli', presetName)
    
    await new Promise((resolve, reject) =>{
        download(repository, tmpdir, {clone}, (err) => {
            if (err) {
                console.log(err)
                return
            }
            resolve()
        })
    })

    return tmpdir
}