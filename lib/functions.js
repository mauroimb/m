function func_bind(dis) {
    dis.functions = {
        f: {},
        tags: []
    }
    dis.setFunc = setFunc.bind(dis)
    dis.func = func.bind(dis)
}


function setFunc(name, f) {
    if (typeof name != 'string') throw new Error('wrong function name')
    if (typeof f != 'function') throw new Error('wrong function type')
    return this.functions.f[name] = f
}

function func(fname, ...args) {
    if (typeof fname == 'function') return fname(...args)
    else if (typeof fname == 'string') return this.functions.f[fname](...args)
    else throw new Error('m func input error')
}


module.exports = func_bind



