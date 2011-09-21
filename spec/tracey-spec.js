var nodespec = require('nodespec');

var tracey = require("../lib/tracey.js");

nodespec.describe("tracey()", function() {
    this.subject("trace", function() { return tracey() });
    this.example("should return a stack trace", function() {
        this.assert.ok(this.trace instanceof Array);
        var frame = this.trace[0];
        this.assert.ok(frame.path);
        this.assert.ok(frame.line);
        this.assert.ok(frame.column);
        this.assert.ok(frame.func);
    });

    this.context("when passed an exception", function() {
        this.subject("trace", function() { return tracey(this.ex); });
        this.subject("ex", function() { return new Error(); });
        this.example("should return a stack trace", function() {
            this.assert.ok(this.trace instanceof Array);
            var frame = this.trace[0];
            this.assert.ok(frame.path);
            this.assert.equal(frame.line, 18);
            this.assert.equal(frame.column, 48);
            this.assert.ok(frame.func);
        });
    });

    this.context("when using bind", function() {
        this.subject("trace", function() {
            function foo(){ return tracey() };
            var bar = foo.bind(this);
            return bar();
        });
        this.example("should return a stack trace", function() {
            this.assert.ok(this.trace instanceof Array);
            var frame = this.trace[1];
            this.assert.equal(frame.path, null);
            this.assert.equal(frame.line, null);
            this.assert.equal(frame.column, null);
            this.assert.equal(frame.func, 'bound function');
        })
    });
});
nodespec.exec();
