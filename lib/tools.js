const Event = require('events')



function tools_bind(dis) {
    dis.removeElement = removeElement
    dis.roughSizeOfObject = roughSizeOfObject
    dis.clear__visited__ = clear__visited__
    dis.eventify = eventify
}





function removeElement(element, array) {
    let test = array.indexOf(element)
    while (test != -1) {

        array.splice(test, 1)
        test = array.indexOf(element)
    }
    return array
}

function roughSizeOfObject(value, level) {
    if (level == undefined) level = 0;
    var bytes = 0;

    if (typeof value === 'boolean') {
        bytes = 4;
    } else if (typeof value === 'string') {
        bytes = value.length * 2;
    } else if (typeof value === 'number') {
        bytes = 8;
    } else if (typeof value === 'object') {
        if (value['__visited__']) return 0;
        value['__visited__'] = 1;
        for (let i in value) {
            bytes += i.length * 2;
            bytes += 8; // an assumed existence overhead
            bytes += roughSizeOfObject(value[i], 1)
        }
    }

    if (level == 0) {
        clear__visited__(value);
    }
    return bytes;
}


function clear__visited__(value) {
    if (typeof value == 'object') {
        delete value['__visited__'];
        for (var i in value) {
            clear__visited__(value[i]);
        }
    }
}


function eventify(ogg) {
    ogg.emitter = new Event()

    for (let prop in ogg.emitter) {
        if (typeof ogg.emitter[prop] == 'function') ogg[prop] = (...args) => ogg.emitter[prop](...args)
        else {
            Object.defineProperty(ogg, prop, { get: () => ogg.emitter[prop] })
        }
    }
}


module.exports = tools_bind