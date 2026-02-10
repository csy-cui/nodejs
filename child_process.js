// 子进程是 Nodejs 核心API，可以用来执行 shell 命令，编写前端工程化工具，处理 cpu 密集型应用 Nodejs 创建子进程共有7个API，Sync是同步API，
// 不加Sync是异步API
const { exec, execFile, fork, spawn, execSync } = require('child_process');
const { resolve } = require('dns');
const path = require('path');

// exec 异步方法，回掉函数返回buffer，可以执行shell命令，或者跟软件交互
// execSync 同步方法
// 只执行较小的shell命令，想要立即拿到结果的shell，字节上线200kb，超过报错

exec("node -v", (error, stdout, stderr) => {
    /**
     * 回调参数说明：
     * @param {Error|null} error    - 如果命令执行失败或进程退出码非 0，则为 Error 对象；成功时为 null。
     * @param {Buffer|string} stdout - 子进程的标准输出（stdout），通常是 Buffer 或字符串（取决于编码）。
     * @param {Buffer|string} stderr - 子进程的标准错误输出（stderr），通常是 Buffer 或字符串。
     *
     * 额外说明：
     * - `error` 仅在出现执行错误（如找不到命令、退出码非 0、或超出缓冲区）时为非 null。
     * - 即便 `error` 非 null，`stdout` 和 `stderr` 仍可能包含有用的输出内容。
     * - `exec` 有默认缓冲区限制（大输出会报错）；需要处理大量输出时可使用 `spawn` 或调整 `maxBuffer`。
     */
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    // 打印标准输出
    console.log("stdout", stdout);

});

// execSync 是同步 API，它不会接受回调函数，而是直接返回子进程的 stdout。
// 错误会以异常抛出，因此应使用 try/catch 捕获。下面示例将输出作为字符串读取。
try {
    const output = execSync("node -v", { encoding: 'utf8' });
    console.log("execSync stdout", output);
} catch (err) {
    console.error(`execSync error: ${err}`);
}


// exec返回字节最多200kb，并且是命令执行完了才会输出信息，而spawn是流式输出，可以实时获取输出信息，适合处理大量输出的命令。
// 如果输出超过这个限制会报错，
// spawn没有这个限制，可以处理大量输出，spawn返回一个子进程对象，可以通过监听事件来获取输出
// const { stdout, stderr } = spawn("netstat",["-a"],{}); // 第二个参数是命令行参数数组，第三个参数是配置项对象

// stdout.on("data", (data) => {
//     console.log("spawn stdout", data.toString()); // 将 Buffer 转换为字符串并输出
// });

// 输出完成时关闭的回调
// stdout.on("closed", () => {
//     console.log("spawn stdout closed");
// });


console.log();

execFile(path.resolve(process.cwd(), "./test.cmd"), (error, stdout, stderr) => {
    if (error) {
        console.error(`execFile error: ${error}`);
        return;
    }
    console.log("execFile stdout", stdout);
}

);