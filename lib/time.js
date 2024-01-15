function time_bind(dis) {
    dis.time = time.bind(dis)
    dis.date = date.bind(dis)
    dis.delay = delay.bind(dis)

    dis.crono = {
        tags: {},
        start: start.bind(dis),
        stop: stop.bind(dis)
    }

}

module.exports = time_bind


function date() {
    let now = new Date()
    let date = now.getFullYear() + ('00' + (now.getMonth() + 1)).slice(-2) + ('00' + now.getDate()).slice(-2)
    return date
}

function time() {
    let now = new Date()
    let time = ('00' + now.getHours()).slice(-2) + ':' + ('00' + now.getMinutes()).slice(-2) + ':' + ('00' + now.getSeconds()).slice(-2) + ':' + ('000' + now.getMilliseconds()).slice(-3)
    return time
}

async function delay(interval) {
    return new Promise(function (rs, rj) {
        setTimeout(function () {
            return rs()
        }, interval)
    })
}


function start(TAG) {
    if (TAG) this.crono.tags[TAG] = process.hrtime()
    else this.crono.tags._default = process.hrtime()
}

function stop(TAG) {
    if (TAG) return process.hrtime(this.crono.tags[TAG])
    else return process.hrtime(this.crono.tags._default)
}
