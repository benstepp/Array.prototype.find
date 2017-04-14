'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite({ name: 'Current vs NPM' });
var npm = require('array.prototype.find');
var current = require('..');
var implementation = current.implementation;

var only = [15];
var onlyPredicate = function onlyPredicateFn(item) {
	return item === 15;
};

var positive = Array(100);
positive[50] = 15;
var positivePredicate = function positivePredicateFn(item) {
	return item === 15;
};

var negative = Array(100);
var negativePredicate = function negativePredicateFn(item) {
	return item === 15;
};

var veryBig = Array(1000000);
veryBig[1000000] = 15;
var veryBigPredicate = function veryBigPredicateFn(item) {
	return item === 15;
};

var forImpl = function forLoopFn(a, p) {
	var length = a.length;
	for (var i = 0; i < length; i++) {
		var value = a[i];
		if (p.apply(a, [value, i, a])) {
			return value;
		}
	}
	return undefined;
};

suite.add('[npm] only', function () { npm(only, onlyPredicate); });
suite.add('[current] only', function () { current(only, onlyPredicate); });
suite.add('[implementation] only', function () { implementation.apply(only, [onlyPredicate]); });
suite.add('[native] only', function () { only.find(onlyPredicate); });
suite.add('[for] only', function () { forImpl(only, onlyPredicate); });

suite.add('[npm] positive', function () { npm(positive, positivePredicate); });
suite.add('[current] positive', function () { current(positive, positivePredicate); });
suite.add('[implementation] positive', function () { implementation.apply(positive, [positivePredicate]); });
suite.add('[native] positive', function () { positive.find(positivePredicate); });
suite.add('[for] positive', function () { forImpl(positive, positivePredicate); });

suite.add('[npm] negative', function () { npm(negative, negativePredicate); });
suite.add('[current] negative', function () { current(negative, negativePredicate); });
suite.add('[implementation] negative', function () { implementation.apply(negative, [negativePredicate]); });
suite.add('[native] negative', function () { negative.find(negativePredicate); });
suite.add('[for] negative', function () { forImpl(negative, negativePredicate); });

suite.add('[npm] veryBig', function () { npm(veryBig, veryBigPredicate); });
suite.add('[current] veryBig', function () { current(veryBig, veryBigPredicate); });
suite.add('[implementation] veryBig', function () { implementation.apply(veryBig, [veryBigPredicate]); });
suite.add('[native] veryBig', function () { veryBig.find(veryBigPredicate); });
suite.add('[for] veryBig', function () { forImpl(veryBig, veryBigPredicate); });

suite.on('complete', function () {
	var length = this.length;
	for (var i = 0; i < length; i ++) {
		console.log(this[i].toString());
	};

	console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.run({ async: false, maxTime: 1 });
