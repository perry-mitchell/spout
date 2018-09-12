const pipe = require("./pipe.js");

const TYPE = "@@type";

function transform(fn, targetOrOptions, options = {}) {
    if (typeof fn !== "function") {
        throw new Error(`Expected first argument to be of type function, but received: ${typeof fn}`);
    }
    const target = typeof targetOrOptions === "function" ? targetOrOptions : undefined;
    const opts = typeof targetOrOptions === "object" && targetOrOptions
        ? targetOrOptions
        : options;
    opts.transform = fn;
    const p = pipe(target, opts);
    p[TYPE] = "transform";
    return p;
}

module.exports = transform;
