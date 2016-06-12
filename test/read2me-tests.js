'use strict';

var read2me = require('../index.js');
var time2read = require('time2read');
var loremIpsum = require('lorem-ipsum');
var sinon = require('sinon');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var clock, log;

function getTime(arr) {
  return arr.reduce(function(p, c){
    return p + time2read(c);
  }, 1);
}

module.exports = {
  setUp: function(done) {
    // setup here
    clock = sinon.useFakeTimers();
    log = sinon.spy();
    done();
  },
  'reading words': function(test) {
    var arrrrr = ['food', 'bar', 'bagel'];
    test.expect(arrrrr.length);
    read2me(arrrrr, log, function() {
      arrrrr.forEach(function(para) {
        test.ok(log.calledWith(para));
      });
      test.done();
    });
    var time2wait = getTime(arrrrr);
    clock.tick(time2wait);
  },
  'reading sentences': function(test) {
    var arrrrr = ['Salty sandwiches in my mouth all the time.', 'Who needs pizza when you have farts.', 'Never say never unless you want to.'];
    test.expect(arrrrr.length);
    read2me(arrrrr, log, function() {
      arrrrr.forEach(function(para) {
        test.ok(log.calledWith(para));
      });
      test.done();
    });
    var time2wait = getTime(arrrrr);
    clock.tick(time2wait);
  }
  ,
  'reading paragraphs': function(test) {
    var arrrrr = [loremIpsum(), loremIpsum(), loremIpsum(), loremIpsum(), loremIpsum(), loremIpsum()];
    test.expect(arrrrr.length);
    read2me(arrrrr, log, function() {
      arrrrr.forEach(function(para) {
        test.ok(log.calledWith(para));
      });
      test.done();
    });
    var time2wait = getTime(arrrrr);
    clock.tick(time2wait);
  }
};
