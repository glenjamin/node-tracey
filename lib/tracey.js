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
    var match = /at (?:(?:|(\S+) \()?(.+):(\d+):(\d+)|(native))/.exec(line);
    if (!match) {
        return;
    }
    // at native (Function.prototype.bind)
    if (match[5]) {
        this.func = 'bound function';
        return;
    }
    // at func (path:line:col)
    this.path   = match[2];
    this.line   = match[3];
    this.column = match[4];
    this.func   = match[1];
}
