const readline = require('readline');
const Event = require('events')



function command_bind(dis) {
    dis.commands = new Event.EventEmitter

    dis.commands.current = 'default'
    dis.commands.phases = {
        default: []
    }

    dis.start = start.bind(dis)
    dis.stop = stop.bind(dis)
    dis.lineHandler = lineHandler.bind(dis)
    dis.command = command.bind(dis)
    dis.remove = remove.bind(dis)
    dis.swap = swap.bind(dis)
    dis.unknown = unknown.bind(dis)

    Object.defineProperty(dis, 'phase', {
        get: function () {
            return this.commands.current; //causes stack overflow
        },
        set: function (x) {
            throw new Error('cannot set a new phase this way')
        }
    });
}

function start() {
    this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    this.rl.on('line', this.lineHandler)
}
function stop() {
    this.rl.close()
}

function lineHandler(data) {
    data = data.split(' ')
    if (this.commands.eventNames().includes(data[0])) this.commands.emit(data.shift(), data)
    else this.commands.emit(Symbol.for('unknown'), data)
}

function command(input, callback) {
    if (typeof input != 'string') throw new Error('wrong type input')
    if (typeof callback != 'function') throw new Error('wrong type callback')
    this.commands.phases[this.commands.current].push({ command: input, callback: callback })
    this.commands.on(input, callback)
}

function remove(input) {
    if (typeof input != 'string') throw new Error('wrong type input')
    let arr = this.commands.phases[this.commands.current]
    let i = 0;
    while (i < arr.length) {
        if (arr[i].command === input) arr.splice(i, 1)
        else i++
    }
}

function swap(newPhase, unknownCallback) {
    if (typeof newPhase != 'string') throw new Error('wrong type phase')
    if (!this.commands.phases.hasOwnProperty(newPhase)) this.commands.phases[newPhase] = []
    this.commands.removeAllListeners()
    this.commands.current = newPhase
    if (unknownCallback) this.unknown(unknownCallback)
    this.commands.phases[newPhase].map(x => { this.commands.on(x.command, x.callback) })
}

function unknown(unknownCallback) {
    if (typeof unknownCallback != 'function') throw new Error('wrong type unknownCallback')
    this.commands.phases[this.commands.current].push({ command: Symbol.for('unknown'), callback: unknownCallback })
}


module.exports = command_bind