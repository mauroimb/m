const m = require('../main')


main()


async function main() {

    //m.tag('stamp').set.console()
    //m.tag('stamp').set.file()
    m.tag('stamp').log('stamp')

    m.crono.start()
    m.tag('uno').crono.start()
    m.log('zero', m.crono.stop())
    await m.delay(1000)
    m.log('uno', m.tag('uno').crono.stop())
    m.tag('due').crono.start()
    await m.delay(2000)
    m.log('due', m.tag('due').crono.stop())
    m.log('uno', m.tag('uno').crono.stop())
    await m.delay(2000)
    m.log('due', m.tag('due').crono.stop())
    m.log('uno', m.tag('uno').crono.stop())


} 