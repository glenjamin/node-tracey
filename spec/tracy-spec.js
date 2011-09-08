var nodespec = require('nodespec');

var tracy = require("../lib/tracy.js");

nodespec.describe("tracy()", function() {
    this.subject("trace", function() { return tracy() });
    this.example("should return a stack trace", function() {
        this.assert.ok(this.trace instanceof Array);
        var trace1 = this.trace[0];
        this.assert.ok(trace1.path);
        this.assert.ok(trace1.line);
        this.assert.ok(trace1.column);
        this.assert.ok(trace1.func);
    });

    this.context("when passed an exception", function() {
        this.subject("trace", function() { return tracy(this.ex); });
        this.subject("ex", function() { return new Error(); });
        this.example("should return a stack trace", function() {
            this.assert.ok(this.trace instanceof Array);
            var trace1 = this.trace[0];
            this.assert.ok(trace1.path);
            this.assert.equal(trace1.line, 18);
            this.assert.equal(trace1.column, 48);
            this.assert.ok(trace1.func);
        });
    });
});
nodespec.exec();
