const sleep = require("sleep-promise");
const pipe = require("../../source/pipe.js");

describe("pipe", function() {
    it("writes data out", function() {
        const target = sinon.spy();
        const p = pipe(target);
        p([1, 2, 3]);
        return sleep(50).then(() => {
            expect(target.calledWithExactly([1, 2, 3])).to.be.true;
        });
    });

    it("writes data out through multiple pipes", function() {
        const target = sinon.spy();
        const p3 = pipe(target);
        const p2 = pipe(p3);
        const p1 = pipe(p2);
        p1([0, false, null]);
        return sleep(50).then(() => {
            expect(target.calledWithExactly([0, false, null])).to.be.true;
        });
    });
});
