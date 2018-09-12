const transform = require("../../source/transform.js");
const pipe = require("../../source/pipe.js");

describe("transform", function() {
    it("can be instantiated", function() {
        expect(() => {
            transform(x => x);
        }).to.not.throw();
    });

    it("accepts data without error", function() {
        expect(() => {
            const transformer = transform(x => x);
            transformer([1, 2, 3]);
        }).to.not.throw();
    });
});
