const fs = require('fs')
const util = require('util')



function log_bind(dis) {

    dis.addTimestamp = true

    dis.console = {
        prefix: '',
        tags: [],
        default: true
    }
    dis.file = {
        prefix: '',
        tags: [],
        logFile: undefined,
        default: false
    }

    dis.setConsolePrefix = setConsolePrefix.bind(dis)
    dis.getConsolePrefix = getConsolePrefix.bind(dis)
    dis.lthen = lthen.bind(dis)
    dis.lcatch = lcatch.bind(dis)
    dis._console_log = _console_log.bind(dis)
    dis.startLog = startLog.bind(dis)
    dis.stopLog = stopLog.bind(dis)


    dis.setFilePrefix = setFilePrefix.bind(dis)
    dis.getFilePrefix = getFilePrefix.bind(dis)
    dis.setLogFile = setLogFile.bind(dis)
    dis.getLogFile = getLogFile.bind(dis)
    dis.setLogFile(false, true, true)
    dis._file_log = _file_log.bind(dis)
    dis.startFileLog = startFileLog.bind(dis)
    dis.stopFileLog = stopFileLog.bind(dis)


    dis.log = log.bind(dis)

}



//------------------------------------------------------------------------------------------- console

function setConsolePrefix(prefix) { this.console.prefix = prefix; return this.console.prefix }
function getConsolePrefix() { return this.console.prefix }

function lthen(...args) { console.log('then', ...args) }
function lcatch(...args) { console.log('catch', ...args) }

function _console_log(...args) {
    let output = this.console.prefix
    if (this.addTimestamp) output += this.time() + '\t'
    return console.log(output, ...args)
}

function startLog() {
    this.console.default = true
}
function stopLog() {
    this.console.default = false
}


//------------------------------------------------------------------------------------------- file

function setFilePrefix(prefix) { this.file.prefix = prefix; return this.file.prefix }
function getFilePrefix() { return this.file.prefix }

function setLogFile(fileName, withDate, absolutePath = false) {
    if (typeof fileName != 'string' && typeof fileName != 'boolean') throw new Error('wrong type filename')
    if (typeof withDate != 'boolean') throw new Error('wrong type withDate')
    if (absolutePath && typeof absolutePath != 'boolean') throw new Error('wrong type currentDirectory')

    let date = this.date() + '_' + this.time()

    if (fileName) {
        this.file.logFile = ''
        if (!absolutePath) this.file.logFile = './'
        this.file.logFile += fileName
        if (withDate) this.file.logFile += ('_' + date)
        console.log('ma che cazzo', this.file.logFile)
    }
    else {
        this.file.logFile = 'mlog_' + date
    }
    return this._logFile
}
function getLogFile() { return this.file.logFile }

function _file_log(...args) {
    let output = this.file.prefix
    if (this.addTimestamp) output += this.date() + '_' + this.time() + '\t'
    for (let el of args) {
        output += ' ' + util.inspect(el, true, 10)
    }
    output += '\n'
    fs.appendFileSync(this.file.logFile, output)
}

function startFileLog() {
    this.file.default = true
}
function stopFileLog() {
    this.file.default = false
}


//------------------------------------------------------------------------------------------- both 

function log(...args) {
    if (this.console.default) { this._console_log(...args) }
    if (this.file.default) { this._file_log(...args) }
    return true
}


module.exports = log_bind
