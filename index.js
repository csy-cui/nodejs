// 引入 jsdom 用于在 Node.js 中模拟 DOM 环境
const { JSDOM } = require('jsdom');
// 引入 fs 用于文件操作
const fs = require('fs');

(async () => {
  // 动态引入 node-fetch（ESM 方式），用于发起 HTTP 请求
  const fetch = (await import('node-fetch')).default;
  // 创建一个带有 id="app" 的虚拟 DOM
  const { window } = new JSDOM(`<!DOCTYPE html><div id='app'></div>`);
  const { document } = window;

  try {
    // 请求猫咪图片 API，获取 10 张图片
    const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=10&page=1");
    // 解析返回的 JSON 数据
    const data = await res.json();
    // 获取虚拟 DOM 中的 app 容器
    const app = document.getElementById('app');
    // 遍历每一只猫，创建 img 元素并设置样式
    data.forEach(cat => {
      const img = document.createElement('img');
      img.src = cat.url; // 设置图片地址
      img.style.width = '200px'; // 设置宽度
      img.style.height = '200px'; // 设置高度
      img.style.margin = '10px'; // 设置间距
      app.appendChild(img); // 添加到 app 容器中
    });
    // 将生成的 HTML 写入 cats.html 文件
    fs.writeFileSync('cats.html', `<!DOCTYPE html><html><head><title>Cats</title></head><body>${app.innerHTML}</body></html>`);
    console.log('cats.html 文件已生成');
  } catch (err) {
    // 捕获并输出请求或写文件过程中的错误
    console.error('Error fetching cat images:', err);
  }
})();