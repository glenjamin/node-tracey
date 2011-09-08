# Tracy

Get a nice parsed stack trace from the calling location

## Install

npm install tracy

## Usage

Capturing the current call stack

    var tracy = require('tracy');

    var stack = tracy();
    console.log(stack);

Or you can pass an exception to parse its stack frames

    try {
        // .. something bad
    } catch (ex) {
        var error_stack = tracy(ex);
    }

Tracy returns an array of frame objects with the following properties:

 * path   - the full file path of the executing code
 * line   - the line number of the executing code
 * column - the column number of the executing code
 * func   - the name of the function call
