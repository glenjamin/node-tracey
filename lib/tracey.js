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
    var match = /at (?:|(\S+) \()?(.+):(\d+):(\d+)/.exec(line);
    this.path   = match[2];
    this.line   = match[3];
    this.column = match[4];
    this.func   = match[1];
}
