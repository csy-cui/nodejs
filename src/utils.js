import fs from "node:fs"
// 用于下载git仓库的东西
import download from "download-git-repo";
// 终端区域的交互动画
import ora from "ora"
const spinner = ora("下载中...")

// 检查当前路径是否存在该文件
export const checkPath = (path) => {
    if (fs.existsSync(path)) {
        return true
    } else {
        return false
    }
}


export const downloadFile = (branch, name) => {
    spinner.start()
    return new Promise((resolve, reject) => {
        download(`direct:https://gitee.com/chinafaker/vue-template.git#${branch}`, name, { clone: true }, (err) => {
            if (err) {
                reject(err)
                return
            }
            resolve()
            spinner.succeed("下载成功！")
        })

    })
}