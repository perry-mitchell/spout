const OPTIONS = "@@opts";
const PIPE_INPUT = "@@pipeIn";
const PIPE_OUTPUT = "@@pipeOut";
const QUEUE = "@@queue";

function acceptData(pipeInst, chunks) {
    pipeInst[QUEUE].push(...chunks);
    flush(pipeInst);
}

function flush(pipeInst) {
    if (pipeInst[OPTIONS].flushing || pipeInst[PIPE_OUTPUT] === null) {
        return;
    }
    pipeInst[OPTIONS].flushing = true;
    setTimeout(() => {

    }, pipeInst[OPTIONS].delay);
}

function pipe({ burst = 10, delay = 0 } = {}) {
    const pipeInst = {};
    const options = {};
    setPipeProperty(options, "burst", burst);
    setPipeProperty(options, "delay", delay);
    setPipeProperty(options, "flushing", false, true);
    setPipeProperty(pipeInst, OPTIONS, options);
    setPipeProperty(pipeInst, PIPE_INPUT, (...chunks) => acceptData(pipeInst, chunks));
    setPipeProperty(pipeInst, PIPE_OUTPUT, null, true);
    setPipeProperty(pipeInst, QUEUE, []);
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

function write(pipeInst, data) {
    pipeInst[PIPE_INPUT](Array.isArray(data) ? ...data : data);
}

module.exports = pipe;
