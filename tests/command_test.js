const m = require('../main.js')



m.start()

m.command('cip', function () { console.log('ciop') })
m.command('ping', function () { console.log('pong') })
m.remove('ping')
m.command('stop', function () { console.log('stop'); m.stop() })
m.command('swap', function () { m.swap('newPhase') })
m.command('show', function () { console.log(this.current) })

m.unknown(function () {
    console.log('unknown callback for default phase')
})

console.log('defined commands for phase:', m.phase)


m.swap('newPhase', function () { console.log('unknown callback for newPhase') })

m.command('ncip', function () { console.log('nCIOP') })
m.command('nping', function () { console.log('nPONG') })
m.command('nstop', function () { console.log('nstop'); m.stop() })
m.command('swap', function () { m.swap('default') })
m.command('show', function () { console.log(this.current) })
console.log('defined commands for phase:', m.phase)

m.swap('default')
console.log('swapped to phase:', m.phase)


main()

async function main() {



}
