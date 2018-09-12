const NOOP = x => x;
const OPTIONS = "@@opts";
const PIPE_INPUT = "@@pipeIn";
const PIPE_OUTPUT = "@@pipeOut";
const QUEUE = "@@queue";
const TRANSFORM = "@@transform";

function acceptData(pipeInst, chunks) {
    pipeInst[QUEUE].push(...chunks.map(pipeInst[TRANSFORM]));
    flush(pipeInst);
}

function flush(pipeInst) {
    if (pipeInst[OPTIONS].flushing || pipeInst[PIPE_OUTPUT] === null) {
        return;
    }
    pipeInst[OPTIONS].flushing = true;
    setTimeout(() => {
        const payload = pipeInst.splice(0, pipeInst[OPTIONS].burst);
        if (payload.length > 0) {
            pipeInst[PIPE_OUTPUT](...payload);
        }
    }, pipeInst[OPTIONS].delay);
}

function pipe({ burst = 10, delay = 0, transform = NOOP } = {}) {
    const pipeInst = data => write(pipeInst, data);
    const options = {};
    setPipeProperty(options, "burst", burst);
    setPipeProperty(options, "delay", delay);
    setPipeProperty(options, "flushing", false, true);
    setPipeProperty(pipeInst, OPTIONS, options);
    setPipeProperty(pipeInst, PIPE_INPUT, chunks => acceptData(pipeInst, chunks));
    setPipeProperty(pipeInst, PIPE_OUTPUT, null, true);
    setPipeProperty(pipeInst, QUEUE, []);
    setPipeProperty(pipeInst, TRANSFORM, transform, true);
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
