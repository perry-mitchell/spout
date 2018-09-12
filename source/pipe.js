const NOOP = x => x;
const OPTIONS = "@@opts";
const PIPE_INPUT = "@@pipeIn";
const PIPE_OUTPUT = "@@pipeOut";
const QUEUE = "@@queue";
const TRANSFORM = "@@transform";
const TYPE = "@@type";

function acceptData(pipeInst, chunks) {
    pipeInst[QUEUE].push(...chunks.map(pipeInst[TRANSFORM]));
    flush(pipeInst);
}

function connect(pipeInst, target) {
    pipeInst[PIPE_OUTPUT] = target;
    return target;
}

function flush(pipeInst) {
    if (pipeInst[OPTIONS].flushing || pipeInst[PIPE_OUTPUT] === null) {
        return;
    }
    pipeInst[OPTIONS].flushing = true;
    setTimeout(() => {
        const payload = pipeInst[QUEUE].splice(0, pipeInst[OPTIONS].burst);
        if (payload.length > 0) {
            pipeInst[PIPE_OUTPUT](payload);
        }
    }, pipeInst[OPTIONS].delay);
}

function pipe(targetOrOptions, options = {}) {
    const { burst = 10, delay = 0, transform = NOOP } = typeof targetOrOptions === "object" && targetOrOptions
        ? targetOrOptions
        : options;
    const target = typeof targetOrOptions === "function" ? targetOrOptions : null;
    const pipeInst = data => write(pipeInst, data);
    const pipeOpts = {};
    setPipeProperty(pipeOpts, "burst", burst);
    setPipeProperty(pipeOpts, "delay", delay);
    setPipeProperty(pipeOpts, "flushing", false, true);
    setPipeProperty(pipeInst, OPTIONS, pipeOpts);
    setPipeProperty(pipeInst, PIPE_INPUT, chunks => acceptData(pipeInst, chunks));
    setPipeProperty(pipeInst, PIPE_OUTPUT, target, true);
    setPipeProperty(pipeInst, QUEUE, []);
    setPipeProperty(pipeInst, TRANSFORM, transform, true);
    setPipeProperty(pipeInst, TYPE, "pipe", true);
    setPipeProperty(pipeInst, "connect", target => connect(pipeInst, target));
    return pipeInst;
}

function setPipeProperty(pipeInst, prop, value, writable = false) {
    Object.defineProperty(pipeInst, prop, {
        enumerable: false,
        configurable: false,
        writable,
        value
    });
}

function write(pipeInst, chunks) {
    pipeInst[PIPE_INPUT](Array.isArray(chunks) ? chunks : [chunks]);
}

module.exports = pipe;
