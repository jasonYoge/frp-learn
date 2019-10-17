'use strict';

const fs = require('fs');
const _ = require('ramda');

// 包裹函数的返回值，而不是包裹函数本身
const IO = function (f) {
  this.__value = f;
  // 直接创建Promise运行函数
  this.__promise = new Promise(f);
}

IO.of = function(x) {
  return new IO(() => {
    return x;
  });
}

// 异步方法运行
// map :: (a -> b) -> IO b
IO.prototype.map = function (f) {
  return new IO((resolver) => {
    this.__promise
      .then(res => {
        resolver(f(res));
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          console.log('No such file exists');
        }
      });
  });
}

const readfile = (filename) => {
  return new IO((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

// log :: String -> String -> String
const concat = _.curry((desc, content) => desc + content);

readfile('./empty.txt').map(console.log);
readfile('./file.txt').map(concat('The content is: ')).map(console.log);

module.exports = IO;
