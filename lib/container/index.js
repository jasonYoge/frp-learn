'use strict';

const _ = require('ramda');

// match :: Regex -> String -> [String]
const match = _.curry((reg, s) => s.match(reg));

// map :: Functor f => (a -> b) -> f a -> f b
const map = _.curry((f, any_functor_at_all) => any_functor_at_all.map(f));

// Maybe 最常用在那些可能会无法成功返回结果的函数中
// 让会发生错误的代码运行在Container当中，进行同一管理
const Maybe = function(x) {
  this.__value = x;
};

Maybe.of = function(x) {
  return new Maybe(x);
}

// isNothing :: a -> Bool
Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

// map :: (a -> b) -> Maybe(a) -> Maybe(b)
Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

console.log(Maybe.of("Malkovich Malkovich").map(match(/a/ig)));

console.log(Maybe.of(null).map(match(/a/ig)));


// eg: get streetName from an object
const safeHead = xs => Maybe.of(xs[0]);
const streetName = _.compose(_.map(_.prop('street')), safeHead, _.prop('addresses'));

console.log(streetName({ addresses: [] }));
console.log(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }));

//  maybe :: b -> (a -> b) -> Maybe a -> b
var maybe = _.curry((x, f, m) => m.isNothing() ? x : f(m.__value));
