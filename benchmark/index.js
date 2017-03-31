var Benchmark = require('benchmark');
var suite = new Benchmark.Suite({ name: 'Current vs NPM' });
var npm = require('array.prototype.find');
var current = require('..');
var implementation = current.implementation;

var array = [1, 2, 3, 4, 15, 28, 42, 89];

function predicate(item) {
  return item === 15;
}

suite.add('npm', function() {
  npm(array, predicate);
});

suite.add('current', function() {
  current(array, predicate);
});

suite.add('implementation', function() {
  implementation.apply(array, [predicate]);
});

suite.add('native', function() {
  Array.prototype.find.apply(array, [predicate]);
});

suite.on('complete', function() {
  var length = this.length;
  for (var i = 0; i < length; i ++) {
    console.log(this[i].toString());
  };

  console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.run({ async: false, maxTime: 1 });
