var should = require('chai').should(),
    expect = require('chai').expect;

var object = require('json-templater/object'),
    Helpers = require('../helpers');

describe('Apply helpers to compiled template', function () {
  var data = {
    foo: 1,
    bar: 2,
    increment: function (param) {
      return parseInt(param) + 1;
    },
    sum: function (a, b) {
      return parseInt(a) + parseInt(b);
    }
  };

  it('should execute helper after compiling', function (done) {
    var template = {
      a: {
        b: '[[#increment]]{{foo}}[[/increment]]'
      }
    };

    var compiled = object(template, data);

    expect(Helpers.compile(JSON.stringify(compiled), data)).to.eql({
      a: {
        b: '2'
      }
    });

    done();
  });

  it('should execute helper with arguments', function (done) {
    var template = {
      a: {
        b: '[[#sum]] {{foo}}, {{bar}} [[/sum]]'
      }
    };

    var compiled = object(template, data);

    expect(Helpers.compile(JSON.stringify(compiled), data)).to.eql({
      a: {
        b: '3'
      }
    });

    done();
  });
});