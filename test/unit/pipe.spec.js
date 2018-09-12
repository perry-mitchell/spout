const pipe = require("../../source/pipe.js");

describe("pipe", function() {
    it("can be instantiated", function() {
        expect(() => {
            pipe();
        }).to.not.throw();
    });

    it("accepts data without error", function() {
        expect(() => {
            const myPipe = pipe();
            myPipe([1, 2, 3]);
        }).to.not.throw();
    });
});
