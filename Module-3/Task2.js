import EventEmitter from './Task1.js';

const asyncFn = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts/1');
};

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit('begin');
    asyncFunc(...args)
      .then(response => {
        this.emit('end');
        return response.json();
      })
      .then(data => {
        this.emit('data', data);
      });
  }
}

const withTime = new WithTime();

withTime.on('begin', () => {
  console.log('About to execute');
  console.time('Execute time');
});
withTime.on('end', () => {
  console.log('Done with execute');
  console.timeEnd('Execute time');
});

withTime.on('data', (data) => console.log(data));

withTime.execute(asyncFn);

console.log(withTime.rawListeners("end"));
