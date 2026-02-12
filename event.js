const EventEmitter = require('events');

// 创建一个事件发射器实例
const emitter = new EventEmitter();

// 监听事件
emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// 触发事件
emitter.emit('greet', 'Alice');

// 监听事件并传递多个参数   
emitter.on('sum', (a, b) => {
    console.log(`The sum of ${a} and ${b} is ${a + b}`);
});
emitter.emit('sum', 5, 10);