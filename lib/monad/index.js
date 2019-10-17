'use strict';

const R = require('ramda');

// plus function
const add = R.curry((a, b) => a + b);

const Container = function(x) {
  this.__value = x;
};

Container.of = function(x) {
  // console.log('Container.of: ', x);
  return new Container(x);
}

// isNothing :: a -> Bool
Container.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

// map :: (a -> b) -> Container(a) -> Container(b)
Container.prototype.map = function(f) {
  return this.isNothing() ? Container.of(null) : Container.of(f(this.__value));
}

// join :: Container(Container a) -> Either (Container a) null
Container.prototype.join = function() {
  return this.isNothing() ? Container.of(null) : this.__value;
}

// chain :: Container(Container a) -> (a -> b) -> Container b
Container.prototype.chain = function(f) {
  return this.map(f).join();
}

// ap :: Container b -> Container a -> b
Container.prototype.ap = function(other_container) {
  return other_container.map(this.__value);
};

console.log(Container.of(2).map(add).ap(Container.of(3)));
