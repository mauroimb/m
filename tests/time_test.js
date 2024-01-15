const m = require('../main')


main()


async function main() {

    //m.tag('stamp').set.console()
    //m.tag('stamp').set.file()
    m.tag('stamp').log('stamp')

    m.crono.start()
    await m.delay(1000)
    m.log(m.crono.stop())

    m.log(m.time())
    m.log(m.date())

} 