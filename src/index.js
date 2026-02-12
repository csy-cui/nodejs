#!/usr/bin/env node
// 告诉系统使用 node 来执行这个脚本

// program的作用为可以解析参数
import { program } from "commander";
// 用于终端交互的
import inquirer from "inquirer";

import fs from "node:fs"
import { checkPath, downloadFile } from "./utils.js";

let json = fs.readFileSync("./package.json")
json = JSON.parse(json)

program.version(json.version)

program.command("create <projectName>").alias("c").description("创建项目").action((projectName) => {
    inquirer.prompt([{
        type: "input",
        name: "projectName",
        message: "请输入创建项目",
        default: projectName
    },
    {
        type: "confirm",
        name: "isTs",
        message: "是否选用ts模板"
    }
    ]).then((res) => {
        console.log(res);
        if (checkPath(res.projectName)) {
            console.log("当前文件已存在！")
            return false
        }
        if (res.isTs) {
            downloadFile("ts", res.projectName)
        } else {
            downloadFile("js", res.projectName)
        }
    })
})






// process.argv为获取执行进程后面的参数，返回的是一个数组
program.parse(process.argv)