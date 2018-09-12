const sleep = require("sleep-promise");
const pipe = require("../../source/pipe.js");
const transform = require("../../source/transform.js");

describe("transform", function() {
    it("writes data out", function() {
        const target = sinon.spy();
        const p = transform(x => x * 2, target);
        p([1, 2, 3]);
        return sleep(50).then(() => {
            expect(target.calledWithExactly([2, 4, 6])).to.be.true;
        });
    });

    it("writes data out through pipes and a transform", function() {
        const target = sinon.spy();
        const p3 = pipe(target);
        const t2 = transform(x => !!x, p3);
        const p1 = pipe(t2);
        p1([1, false, null]);
        return sleep(50).then(() => {
            expect(target.calledWithExactly([true, false, false])).to.be.true;
        });
    });
});
