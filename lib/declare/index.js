'use strict';

const _ = require('ramda');

// Hindley-Milney
// getUrl :: String -> String -> String
const getUrl = _.curry((protocol, url) => protocol + url);

// match :: Regex -> (String -> [String])
const match = _.curry((reg, s) => s.match(reg));
// onHoliday :: String -> [String]
const onHoliday = match(/holiday/g);

// replace :: Regex -> (String -> (String -> String))
const replace = _.curry((reg, sub, s) => s.replace(reg, sub));

// map :: (a -> b) -> [a] -> [b]
const map = _.curry((f, xs) => xs.map(f));

// reduce :: (b -> a -> b) -> b -> [a] -> b
const reduce = _.curry((f, x, xs) => xs.reduce(f, x));

// sort :: Ord a => [a] -> [a]
// assertEqual :: (Eq a, Show b) => a -> a -> Assertion
