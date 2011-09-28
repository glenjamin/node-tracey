module.exports = function tracey(exception) {
    var chop = 1;
    // Generate caller trace
    if (!exception) {
        exception = {};
        Error.captureStackTrace(exception);
        chop += 1;
    }

    var lines = exception.stack.split("\n").splice(chop);

    return lines.map(function(line) { return new Frame(line); });
}

function Frame(line) {
    this.raw = line.trim();

    // at func (path:line:col)
    var match = /^at (.+) \((.+):(\d+):(\d+)\)$/.exec(this.raw);
    if (match) {
        this.func   = match[1];
        this.path   = match[2];
        this.line   = match[3];
        this.column = match[4];
        return;
    }

    // at path:line:col
    var match = /^at (.+):(\d+):(\d+)$/.exec(this.raw);
    if (match) {
        this.path   = match[1];
        this.line   = match[2];
        this.column = match[3];
        return;
    }

    // when using Function.prototype.bind
    if (this.raw == 'at native') {
        this.func = 'bound function';
        return;
    }
}
