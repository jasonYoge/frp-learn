'use strict';

const moment = require('moment');
const _ = require('ramda');

const Left = function(x) {
  this.__value = x;
}

Left.of = function(x) {
  return new Left(x);
}

Left.prototype.map = function(f) {
  return this;
}

const Right = function(x) {
  this.__value = x;
}

Right.of = function(x) {
  return new Right(x);
}

Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
}

console.log(Right.of('rain').map(str => str + ""));

// getAge :: Date -> User -> Either(String, Number)
const getAge = _.curry((now, user) => {
  const birthdate = moment(user.birthdate, 'YYYY-MM-DD');
  if (!birthdate.isValid()) {
    return Left.of('error');
  }
  return Right.of(now.diff(birthdate, 'years'));
});

console.log(getAge(moment(), { birthdate: '2005-12-28' }));

// fortune :: Number -> String
const fortune = _.compose(_.concat('If you survive, you will be '), _.add(1));

// zoltar :: User -> Either(String, _)
const zoltar = _.compose(_.map(console.log), _.map(fortune), getAge(moment()));
