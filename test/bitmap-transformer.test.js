const assert = require('assert');
const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
    
    let buffer = null;
    beforeEach(() => {
        // TODO: read './test/test-bitmap.bmp' into buffer variable
        // Okay to use `sync` file methods for now
        buffer = fs.readFileSync('./test/test-bitmap.bmp');
        // TODO: If the functionality in this before test is same as 
        // other test, can you remove (extract) the duplication?
        // ANSWER: yes - you could create a beforeEach.test.js in another file that you would 'require' in this file and call it as a function.
    });

    // "pinning" test, or "snapshot" test
    it ('test whole transform', () => {
        // use the BitmapTransformer class, 
        // passing in the buffer from the file read
        const bitmap = new BitmapTransformer(buffer);

        // call .transform(), which will modify the buffer.
        // in this api, you pass in a transformation function
        bitmap.transform(invert);

        // after above step, the buffer has been modified
        // and is accessible via bitmap.buffer

        // read the output file we saved earlier as
        // the "standard" expected output file
        const expected = fs.readFileSync('./test/inverted-expected.bmp');
        assert.deepEqual(bitmap.buffer, expected);

        // if you don't have a standard file yet, you could write it 
        // out by commenting above code, using code below and visually inspect
        // the file for correctness.
        // return fs.writeFileSync('./test/output.bmp', bitmap.buffer);
    });
});
