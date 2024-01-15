const Event = require('events')

const log_bind = require('./lib/log.js')
const time_bind = require('./lib/time.js')
const tools_bind = require('./lib/tools.js')
const tag_bind = require('./lib/tag.js')
const func_bind = require('./lib/functions.js')
const command_bind = require('./lib/commands.js')

class M extends Event {
    constructor() {
        super()
        this.name = 'm, just a set of useful tools'

        time_bind(this)
        log_bind(this)
        tools_bind(this)
        tag_bind(this)
        func_bind(this)
        command_bind(this)

    }
}


const m = new M()


module.exports = m
